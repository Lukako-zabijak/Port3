import { useEffect, useRef } from 'react';
import { getTheme, type ThemeKey } from '../lib/themes';

const VERT = `
attribute vec2 aPos;
void main() { gl_Position = vec4(aPos, 0.0, 1.0); }
`;

/* Domain-warped fbm flow — the "living" backdrop. */
const FRAG = `
precision highp float;
uniform vec2 uRes;
uniform float uTime;
uniform vec2 uMouse;
uniform vec3 uA;
uniform vec3 uB;
uniform vec3 uBase;

float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123); }

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(
    mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x),
    mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x),
    u.y
  );
}

float fbm(vec2 p) {
  float v = 0.0;
  float a = 0.5;
  mat2 rot = mat2(0.8, 0.6, -0.6, 0.8);
  for (int i = 0; i < 5; i++) {
    v += a * noise(p);
    p = rot * p * 2.0;
    a *= 0.5;
  }
  return v;
}

void main() {
  vec2 p = (gl_FragCoord.xy - 0.5 * uRes) / uRes.y;
  float t = uTime * 0.055;

  vec2 q = vec2(
    fbm(p + t * vec2(0.30, 0.12)),
    fbm(p + vec2(5.2, 1.3) - t * vec2(0.18, 0.26))
  );
  vec2 r = vec2(
    fbm(p + 2.2 * q + vec2(1.7, 9.2) + t * 0.16),
    fbm(p + 2.2 * q + vec2(8.3, 2.8) - t * 0.13)
  );
  float f = fbm(p + 2.6 * r);

  float md = length(p - uMouse);
  float glow = exp(-md * 2.4);

  vec3 col = uBase;
  col = mix(col, uA, smoothstep(0.15, 0.95, f) * 0.34);
  col = mix(col, uB, smoothstep(0.25, 1.0, length(q) * 0.85) * 0.26);
  col += uA * glow * 0.14;
  col += uA * smoothstep(0.5, -0.7, p.y) * 0.045;

  vec2 uv = gl_FragCoord.xy / uRes;
  col *= 1.0 - 0.52 * pow(length(uv - 0.5) * 1.32, 1.55);

  gl_FragColor = vec4(col, 1.0);
}
`;

function hexToVec3(hex: string): [number, number, number] {
  const h = hex.replace('#', '');
  return [
    parseInt(h.slice(0, 2), 16) / 255,
    parseInt(h.slice(2, 4), 16) / 255,
    parseInt(h.slice(4, 6), 16) / 255,
  ];
}

export default function SilkBg({ theme }: { theme: ThemeKey }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const themeRef = useRef(theme);
  themeRef.current = theme;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const gl = canvas.getContext('webgl', {
      antialias: false,
      alpha: false,
      depth: false,
      stencil: false,
      powerPreference: 'low-power',
    });

    if (!gl) {
      // no WebGL — fall back to a static themed gradient
      const def = getTheme(themeRef.current);
      canvas.style.background = `radial-gradient(ellipse 80% 60% at 50% 0%, ${def.accent}22, transparent 60%), ${def.bg}`;
      return;
    }

    const compile = (type: number, src: string) => {
      const sh = gl.createShader(type)!;
      gl.shaderSource(sh, src);
      gl.compileShader(sh);
      return sh;
    };
    const prog = gl.createProgram()!;
    gl.attachShader(prog, compile(gl.VERTEX_SHADER, VERT));
    gl.attachShader(prog, compile(gl.FRAGMENT_SHADER, FRAG));
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return;
    gl.useProgram(prog);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(prog, 'aPos');
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

    const uRes = gl.getUniformLocation(prog, 'uRes');
    const uTime = gl.getUniformLocation(prog, 'uTime');
    const uMouse = gl.getUniformLocation(prog, 'uMouse');
    const uA = gl.getUniformLocation(prog, 'uA');
    const uB = gl.getUniformLocation(prog, 'uB');
    const uBase = gl.getUniformLocation(prog, 'uBase');

    // current colors — lerped toward the active theme every frame
    const init = getTheme(themeRef.current);
    const cur = { a: hexToVec3(init.accent), b: hexToVec3(init.accent2), base: hexToVec3(init.bg) };
    const mouse = { x: 0, y: 0.1, tx: 0, ty: 0.1 };

    let raf = 0;
    let running = true;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const resize = () => {
      const scale = Math.min(window.devicePixelRatio || 1, 1.5) * 0.72;
      canvas.width = Math.max(2, Math.floor(window.innerWidth * scale));
      canvas.height = Math.max(2, Math.floor(window.innerHeight * scale));
      gl.viewport(0, 0, canvas.width, canvas.height);
    };

    const onMove = (e: PointerEvent) => {
      mouse.tx = (e.clientX - window.innerWidth / 2) / window.innerHeight;
      mouse.ty = (window.innerHeight / 2 - e.clientY) / window.innerHeight;
    };

    const lerp = (from: number, to: number, k: number) => from + (to - from) * k;

    const frame = (now: number) => {
      if (!running) return;
      const def = getTheme(themeRef.current);
      const ta = hexToVec3(def.accent);
      const tb = hexToVec3(def.accent2);
      const tbase = hexToVec3(def.bg);
      for (let i = 0; i < 3; i++) {
        cur.a[i] = lerp(cur.a[i], ta[i], 0.05);
        cur.b[i] = lerp(cur.b[i], tb[i], 0.05);
        cur.base[i] = lerp(cur.base[i], tbase[i], 0.05);
      }
      mouse.x = lerp(mouse.x, mouse.tx, 0.06);
      mouse.y = lerp(mouse.y, mouse.ty, 0.06);

      gl.uniform2f(uRes, canvas.width, canvas.height);
      gl.uniform1f(uTime, now / 1000);
      gl.uniform2f(uMouse, mouse.x, mouse.y);
      gl.uniform3fv(uA, cur.a);
      gl.uniform3fv(uB, cur.b);
      gl.uniform3fv(uBase, cur.base);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
      raf = requestAnimationFrame(frame);
    };

    const onVisibility = () => {
      if (document.hidden) {
        running = false;
        cancelAnimationFrame(raf);
      } else if (!reduced) {
        running = true;
        raf = requestAnimationFrame(frame);
      }
    };

    resize();
    window.addEventListener('resize', resize);
    window.addEventListener('pointermove', onMove, { passive: true });
    document.addEventListener('visibilitychange', onVisibility);

    if (reduced) {
      // single static frame
      const once = (t: number) => {
        gl.uniform2f(uRes, canvas.width, canvas.height);
        gl.uniform1f(uTime, t);
        gl.uniform2f(uMouse, 0, 0);
        gl.uniform3fv(uA, cur.a);
        gl.uniform3fv(uB, cur.b);
        gl.uniform3fv(uBase, cur.base);
        gl.drawArrays(gl.TRIANGLES, 0, 3);
      };
      once(4);
    } else {
      raf = requestAnimationFrame(frame);
    }

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      window.removeEventListener('pointermove', onMove);
      document.removeEventListener('visibilitychange', onVisibility);
      gl.getExtension('WEBGL_lose_context')?.loseContext();
    };
  }, []);

  return (
    <div className="fixed inset-0 z-0 pointer-events-none" aria-hidden>
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
      <div className="absolute inset-0 bg-noise opacity-[0.05] mix-blend-overlay" />
    </div>
  );
}

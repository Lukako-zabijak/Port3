import { useEffect as use_effect, useRef as use_ref } from 'react';
import './hero-scene.css';

export default function hero_scene() {
  const host = use_ref<HTMLDivElement>(null);

  use_effect(() => {
    const element = host.current;
    if (!element) return;
    let stopped = false;
    let cleanup = () => {};
    void import('three').then((three) => {
      if (stopped) return;
      let renderer: InstanceType<typeof three.WebGLRenderer>;
      try {
        renderer = new three.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'low-power' });
      } catch { return; }
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
      renderer.setClearColor(0x000000, 0);
      element.appendChild(renderer.domElement);
      const scene = new three.Scene();
      const camera = new three.PerspectiveCamera(33, 1, 0.1, 30);
      camera.position.z = 7.2;
      const group = new three.Group();
      scene.add(group);
      const shape = new three.Shape();
      const size = 1.45;
      const radius = 0.48;
      shape.moveTo(-size + radius, -size);
      shape.lineTo(size - radius, -size);
      shape.quadraticCurveTo(size, -size, size, -size + radius);
      shape.lineTo(size, size - radius);
      shape.quadraticCurveTo(size, size, size - radius, size);
      shape.lineTo(-size + radius, size);
      shape.quadraticCurveTo(-size, size, -size, size - radius);
      shape.lineTo(-size, -size + radius);
      shape.quadraticCurveTo(-size, -size, -size + radius, -size);
      const body_geometry = new three.ExtrudeGeometry(shape, {
        depth: 0.42, bevelEnabled: true, bevelSegments: 5, steps: 1, bevelSize: 0.055, bevelThickness: 0.055, curveSegments: 24,
      });
      body_geometry.translate(0, 0, -0.42);
      const body_material = new three.MeshStandardMaterial({ color: 0x292929, metalness: 0.72, roughness: 0.27 });
      group.add(new three.Mesh(body_geometry, body_material));
      const front_geometry = new three.ShapeGeometry(shape, 32);
      const positions = front_geometry.getAttribute('position');
      const uv = front_geometry.getAttribute('uv');
      for (let i = 0; i < positions.count; i++) uv.setXY(i, (positions.getX(i) + size) / (size * 2), (positions.getY(i) + size) / (size * 2));
      let texture_ready = false;
      const texture = new three.TextureLoader().load('/lukode-logo-source.png', () => {
        if (stopped) return;
        texture_ready = true;
        draw();
      });
      texture.repeat.set(575 / 1254, 587 / 1254);
      texture.offset.set(342 / 1254, (1254 - 820) / 1254);
      texture.colorSpace = three.SRGBColorSpace;
      const front_material = new three.MeshStandardMaterial({ map: texture, roughness: 0.44, metalness: 0.12 });
      const face = new three.Mesh(front_geometry, front_material);
      face.position.z = 0.058;
      group.add(face);
      const ambient = new three.HemisphereLight(0xffffff, 0x181818, 1.7);
      scene.add(ambient);
      const key = new three.DirectionalLight(0xffffff, 2.4);
      key.position.set(-3, 5, 5);
      scene.add(key);
      const rim = new three.PointLight(0xffffff, 32, 15);
      rim.position.set(3, 1, 1);
      scene.add(rim);
      const lower = new three.PointLight(0xffffff, 14, 12);
      lower.position.set(-2, -3, 0);
      scene.add(lower);
      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
      let visible = true;
      let frame = 0;
      let previous = 0;
      let targetx = 0;
      let targety = 0;
      group.rotation.set(0.1, -0.42, 0.08);
      const draw = () => { renderer.render(scene, camera); if (texture_ready) element.dataset.ready = 'true'; };
      const sync_theme = () => {
        const styles = getComputedStyle(document.documentElement);
        const accent = styles.getPropertyValue('--ac').trim() || '#f472b6';
        const secondary = styles.getPropertyValue('--ac2').trim() || accent;
        rim.color.set(accent);
        lower.color.set(secondary);
        ambient.groundColor.set(accent).multiplyScalar(0.12);
        draw();
      };
      const theme_observer = new MutationObserver(sync_theme);
      theme_observer.observe(document.documentElement, { attributes: true, attributeFilter: ['style', 'data-theme'] });
      sync_theme();
      const tick = (time: number) => {
        frame = 0;
        if (stopped || !visible || document.hidden) return;
        const delta = Math.min((time - previous) / 1000, 0.05);
        previous = time;
        const blend = 1 - Math.exp(-delta * 4);
        group.rotation.x += (0.1 + targety * 0.12 - group.rotation.x) * blend;
        group.rotation.y += (-0.42 + targetx * 0.22 - group.rotation.y) * blend;
        group.position.y = reduced.matches ? 0 : Math.sin(time * 0.00065) * 0.06;
        draw();
        if (!reduced.matches) frame = requestAnimationFrame(tick);
      };
      const resume = () => { if (!frame && visible && !document.hidden) frame = requestAnimationFrame(tick); };
      const resize = new ResizeObserver(() => {
        const { width, height } = element.getBoundingClientRect();
        if (!width || !height) return;
        renderer.setSize(width, height);
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        draw();
      });
      resize.observe(element);
      const observer = new IntersectionObserver(([entry]) => {
        visible = entry.isIntersecting;
        if (!visible) { cancelAnimationFrame(frame); frame = 0; }
        else resume();
      });
      observer.observe(element);
      const pointer = (event: PointerEvent) => {
        if (reduced.matches || event.pointerType !== 'mouse') return;
        const bounds = element.getBoundingClientRect();
        targetx = Math.max(-1, Math.min(1, (event.clientX - bounds.left) / bounds.width * 2 - 1));
        targety = Math.max(-1, Math.min(1, (event.clientY - bounds.top) / bounds.height * 2 - 1));
      };
      const reset = () => { targetx = 0; targety = 0; };
      const lost = (event: Event) => { event.preventDefault(); delete element.dataset.ready; cancelAnimationFrame(frame); frame = 0; };
      const restored = () => { element.dataset.ready = 'true'; resume(); };
      element.addEventListener('pointermove', pointer);
      element.addEventListener('pointerleave', reset);
      renderer.domElement.addEventListener('webglcontextlost', lost);
      renderer.domElement.addEventListener('webglcontextrestored', restored);
      document.addEventListener('visibilitychange', resume);
      reduced.addEventListener('change', resume);
      resume();
      cleanup = () => {
        cancelAnimationFrame(frame);
        resize.disconnect(); observer.disconnect(); theme_observer.disconnect();
        element.removeEventListener('pointermove', pointer);
        element.removeEventListener('pointerleave', reset);
        document.removeEventListener('visibilitychange', resume);
        reduced.removeEventListener('change', resume);
        renderer.domElement.removeEventListener('webglcontextlost', lost);
        renderer.domElement.removeEventListener('webglcontextrestored', restored);
        body_geometry.dispose(); front_geometry.dispose(); texture.dispose();
        body_material.dispose(); front_material.dispose(); renderer.dispose();
        renderer.domElement.remove(); delete element.dataset.ready;
      };
    }).catch(() => { /* the original mark remains as a static fallback */ });
    return () => { stopped = true; cleanup(); };
  }, []);

  return <div className="hero-sculpture" ref={host} role="img" aria-label="Lukode Studios logo, a floating three-dimensional black and silver emblem">
    <div className="hero-sculpture-fallback" aria-hidden="true"><img src="/lukode-logo-source.png" alt="" /></div>
  </div>;
}

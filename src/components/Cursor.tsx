import { useEffect, useState } from 'react';
import { motion } from 'motion/react';

export default function Cursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [hovering, setHovering] = useState(false);
  const [visible, setVisible] = useState(false);
  const [touch, setTouch] = useState(false);

  useEffect(() => {
    if (
      window.matchMedia('(hover: none) and (pointer: coarse)').matches ||
      'ontouchstart' in window ||
      navigator.maxTouchPoints > 0
    ) {
      setTouch(true);
      return;
    }

    const move = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
      setVisible(true);
    };
    const over = (e: MouseEvent) => {
      const el = e.target as HTMLElement;
      setHovering(
        el.tagName === 'A' ||
          el.tagName === 'BUTTON' ||
          !!el.closest('a') ||
          !!el.closest('button') ||
          el.tagName === 'TEXTAREA'
      );
    };
    const leave = () => setVisible(false);

    window.addEventListener('mousemove', move);
    window.addEventListener('mouseover', over);
    document.addEventListener('mouseleave', leave);
    return () => {
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mouseover', over);
      document.removeEventListener('mouseleave', leave);
    };
  }, []);

  if (touch) return null;

  return (
    <div
      className="hidden md:block pointer-events-none fixed inset-0 z-[999]"
      style={{ opacity: visible ? 1 : 0, transition: 'opacity 0.3s' }}
    >
      <motion.div
        className="absolute w-2 h-2 rounded-full bg-ac"
        animate={{ x: pos.x - 4, y: pos.y - 4, scale: hovering ? 2.2 : 1 }}
        transition={{ type: 'spring', stiffness: 900, damping: 45, mass: 0.2 }}
      />
      <motion.div
        className="absolute w-9 h-9 rounded-full border border-ac-40"
        animate={{ x: pos.x - 18, y: pos.y - 18, scale: hovering ? 1.6 : 1 }}
        transition={{ type: 'spring', stiffness: 260, damping: 24, mass: 0.5 }}
      />
    </div>
  );
}

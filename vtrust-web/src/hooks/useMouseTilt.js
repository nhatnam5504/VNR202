import { useRef, useCallback } from 'react';

/**
 * Returns a ref to attach to any element for a smooth 3D tilt effect on mouse hover.
 */
export const useMouseTilt = (intensity = 15) => {
  const ref = useRef(null);

  const onMouseMove = useCallback((e) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) / (rect.width / 2);
    const dy = (e.clientY - cy) / (rect.height / 2);
    const rotX = -dy * intensity;
    const rotY = dx * intensity;
    el.style.transform = `perspective(800px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateZ(8px)`;
    el.style.transition = 'transform 0.05s linear';
  }, [intensity]);

  const onMouseLeave = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg) translateZ(0)';
    el.style.transition = 'transform 0.5s ease';
  }, []);

  return { ref, onMouseMove, onMouseLeave };
};

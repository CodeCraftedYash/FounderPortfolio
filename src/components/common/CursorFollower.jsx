import { useEffect, useRef } from 'react';
import { gsap } from '../../library/gsap';

const CursorFollower = () => {
  const mouseRef = useRef(null);

  useEffect(() => {
    const el = mouseRef.current;
    if (!el) return;

    // hide until first move (avoids jump from 0,0)
    gsap.set(el, { xPercent: -50, yPercent: -50, opacity: 0 });

    const xTo = gsap.quickTo(el, 'x', { duration: 0.8, ease: 'power3' });
    const yTo = gsap.quickTo(el, 'y', { duration: 0.8, ease: 'power3' });

    let shown = false;

    const handleMouseMove = (e) => {
      if (!shown) {
        gsap.to(el, { opacity: 1, duration: 0.2 });
        shown = true;
      }
      xTo(e.clientX);
      yTo(e.clientY);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div
      ref={mouseRef}
      className="pointer-events-none fixed top-0 left-0 z-50 flex aspect-square w-8 items-center justify-center rounded-full border border-(--gold-primary) will-change-transform"
    >
      <div className="aspect-square w-1/4 rounded-full bg-(--gold-primary)" />
    </div>
  );
};

export default CursorFollower;
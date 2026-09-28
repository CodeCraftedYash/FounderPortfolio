import { useEffect, useRef } from 'react';
import { gsap } from '../../library/gsap';

export default function BackgroundImage({source}) {
  const picRef = useRef(null);

  useEffect(() => {
    const pic = picRef.current;
    if (!pic) return;

    const halfWidth = window.innerWidth / 2;
    const halfHeight = window.innerHeight / 2;

    // Start centered, no offset
    gsap.set(pic, { xPercent: -50, yPercent: -50, x: 0, y: 0 });

    const xTo = gsap.utils.pipe(
      gsap.utils.clamp(-halfWidth, halfWidth),
      gsap.utils.snap(5),
      gsap.quickTo(pic, 'x', { duration: 0.8, ease: 'power3' })
    );

    const yTo = gsap.utils.pipe(
      gsap.utils.clamp(-halfHeight, halfHeight),
      gsap.utils.snap(5),
      gsap.quickTo(pic, 'y', { duration: 0.8, ease: 'power3' })
    );

    const handleMouseMove = (e) => {
      // Distance from the CENTER of the screen, not the top-left corner
      const relX = e.clientX - halfWidth;
      const relY = e.clientY - halfHeight;

      xTo(relX/20);
      yTo(relY/20);
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);
  return (
    <img
      ref={picRef}
      src={source}     
      alt="Background"
      className="scale-110"
      style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        width: '100%',
        pointerEvents: 'none',
      }}
    />
  );
}
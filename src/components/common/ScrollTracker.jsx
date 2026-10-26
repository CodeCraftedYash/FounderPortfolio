import { useEffect, useRef } from "react";
import { gsap } from "../../library/gsap";

export default function ScrollColorSVG() {
  const yellowPathRef = useRef(null);
  const blackPathRef = useRef(null);

  useEffect(() => {
    const lenis = window.lenis;

    if (!lenis) {
      console.warn("Lenis not found. Make sure Lenis is initialized.");
      return;
    }

    const updatePath = () => {
      const blackPath = blackPathRef.current;
      const yellowPath = yellowPathRef.current;

      if (!blackPath || !yellowPath) return;

      const totalLength = blackPath.getTotalLength();
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const progress = Math.min(
        Math.max((lenis.scroll / maxScroll) * 100, 0),
        100
      );

      // reveal from top to bottom
      const dashOffset = totalLength - (totalLength * progress) / 100;

      gsap.to(yellowPath, {
        strokeDashoffset: dashOffset,
        duration: 0.18,
        ease: "none",
        overwrite: "auto",
      });
    };

    // Must set dash settings once
    const setInitialDash = () => {
      const blackPath = blackPathRef.current;
      const yellowPath = yellowPathRef.current;

      if (!blackPath || !yellowPath) return;

      const totalLength = blackPath.getTotalLength();

      blackPath.style.strokeDasharray = totalLength;
      blackPath.style.strokeDashoffset = 0;

      yellowPath.style.strokeDasharray = totalLength;
      yellowPath.style.strokeDashoffset = totalLength;
    };

    setInitialDash();
    updatePath();

    lenis.on("scroll", updatePath);

    return () => {
      lenis.off("scroll", updatePath);
    };
  }, []);

  return (
    <div className="fixed right-12 top-1/2 -translate-y-1/2 z-40 hidden lg:flex items-center justify-center">
      <svg
        width="185"
        height="1768"
        viewBox="0 0 185 1768"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-16 h-auto"
      >
        <path
          ref={blackPathRef}
          d="M92.3884 0.327515C92.3884 0.327515 299.138 235.328 92.3884 442.078C-114.362 648.828 92.3884 883.828 92.3884 883.828C92.3884 883.828 281.639 1136.33 92.3884 1325.58C-96.8618 1514.83 92.3884 1767.33 92.3884 1767.33"
          stroke="black"
          strokeWidth="6"
          strokeLinecap="round"
        />

        <path
          ref={yellowPathRef}
          d="M92.3884 0.327515C92.3884 0.327515 299.138 235.328 92.3884 442.078C-114.362 648.828 92.3884 883.828 92.3884 883.828C92.3884 883.828 281.639 1136.33 92.3884 1325.58C-96.8618 1514.83 92.3884 1767.33 92.3884 1767.33"
          stroke="#facc15"
          strokeWidth="6"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
}
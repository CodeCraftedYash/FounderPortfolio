import { useRef } from "react";
import CursorFollower from "./components/common/CursorFollower"
import Hero from "./components/sections/Hero"
import {createScrollScene} from './animations/createScrollScene';
import { useGSAP } from "@gsap/react";
import First from "./components/sections/First";
import Second from "./components/sections/Second";
import Third from "./components/sections/Third";
import { createSmoothScroll } from "./animations/smoothScroll";

function App() {
const containerRef = useRef(null);
  useGSAP(
    () => {
      if (!containerRef.current) return;
      const destroySmoothScroll = createSmoothScroll();
      createScrollScene(containerRef.current);

      return () => {
        destroySmoothScroll();
      }
    },
    {
      scope: containerRef,
    },
  );
  return (
    <main ref={containerRef} className="relative w-full h-screen font-body ">
        <section className="absolute inset-0 scene">
          <Hero />
        </section>

        <section className="absolute inset-0 scene w-[90%] mx-auto">
          <First />
        </section>
        
        <section className="absolute inset-0 scene w-[90%] mx-auto">
          <Second />
        </section>
        
        <section className="absolute inset-0 scene w-[90%] mx-auto">
          <Third />
        </section>

      <CursorFollower />
    </main>
  )
}

export default App

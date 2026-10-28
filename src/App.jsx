import { useRef } from "react";
import CursorFollower from "./components/common/CursorFollower";
import Hero from "./components/sections/Hero";
import { createScrollScene } from "./animations/createScrollScene";
import { useGSAP } from "@gsap/react";
import First from "./components/sections/First";
import Second from "./components/sections/Second";
import Third from "./components/sections/Third";
import { createSmoothScroll } from "./animations/smoothScroll";
import Fourth from "./components/sections/Fourth";
import { createAnimationContext } from "./utils/animationContext";
import Fifth from "./components/sections/Fifth";
import { createMultiItemScroll } from "./animations/createMultiItemScroll";
import ScrollTracker from "./components/common/ScrollTracker";
import Sixth from "./components/sections/Sixth";
import Seventh from "./components/sections/Seventh";
import Eight from "./components/sections/Eight";
import LoadingScreen from "./components/common/LoadingScreen";
import ConsultWidget from "./components/common/ConsultWidget";

function App() {
  const containerRef = useRef(null);
  useGSAP(
    () => {
      if (!containerRef.current) return;
      return createAnimationContext(() => {
        const destroySmoothScroll = createSmoothScroll();
        createScrollScene(containerRef.current);
        createMultiItemScroll(containerRef.current);
        return () => {
          destroySmoothScroll();
        };
      });
    },
    {
      scope: containerRef,
    },
  );
  return (
    <>
      <LoadingScreen />
      <ConsultWidget apiBaseUrl="http://localhost:5000" />
      <main ref={containerRef} className="relative w-full h-screen font-body flex md:block flex-col gap-28">
       <div className="hidden md:block"><ScrollTracker /></div>
      <section className="md:absolute inset-0 scene w-full">
        <Hero />
      </section>

      <section className="md:absolute inset-0 scene w-[90%] mx-auto">
        <First />
      </section>

      <section className="md:absolute inset-0 scene w-[90%] mx-auto">
        <Second />
      </section>

      <section className="md:absolute inset-0 scene w-[90%] mx-auto">
        <Third />
      </section>

      <section className="md:absolute inset-0 scene w-[90%] mx-auto">
        <Fourth />
      </section>
      
      <section className="md:absolute inset-0 scene w-[90%] mx-auto">
        <Fifth />
      </section>
      
      <section className="md:absolute inset-0 scene w-[90%] mx-auto">
        <Sixth />
      </section>
      
      <section className="md:absolute inset-0 scene w-[90%] mx-auto">
        <Seventh />
      </section>
      
      <section className="md:absolute inset-0 scene w-[90%] mx-auto">
        <Eight />
      </section>

      <div className="hidden md:block"><CursorFollower /></div>
      </main>
    </>
  );
}

export default App;

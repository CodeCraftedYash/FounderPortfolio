import Lenis from "lenis";
import { ScrollTrigger,gsap } from "../library/gsap";

export function createSmoothScroll() {
    const lenis = new Lenis({
        smoothWheel: true,
    });

    const update = () => {
        ScrollTrigger.update();
    };

    const raf = (time) => {
        lenis.raf(time * 900);
    };

    lenis.on("scroll", update);

    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(50);

    return () => {
        lenis.off("scroll", update);
        gsap.ticker.remove(raf);
        lenis.destroy();
    };
}
import { gsap } from "../library/gsap";

export function createAnimationContext(callback) {
    const mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", callback);

    return () => mm.revert();
}
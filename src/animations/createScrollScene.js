// createScrollScene.ts

import { gsap, ScrollTrigger } from "../library/gsap";
import { animateItems } from "./motion/animateItems";
import { transitionSections } from "./sectionTransition";

gsap.registerPlugin(ScrollTrigger);

export function createScrollScene(
    container
) {
    const sections =
        gsap.utils.toArray(
            ".scene",
            container
        );

    const timeline = gsap.timeline({
        scrollTrigger: {
            trigger: container,
            start: "top top",
            end: `+=${sections.length * 250}%`,
            pin: true,
            scrub: true,
            markers: true,
        },
    });

    const firstSection = sections[0];
    gsap.set(sections,{
        opacity:0,
        pointerEvents:"none",
    })
    gsap.set(firstSection, {
        opacity: 1,
        pointerEvents:"auto"
    });
    animateItems(firstSection, timeline)

    for (let i = 1; i< sections.length; i++){
        const current = sections[i - 1];
        const next = sections[i];

        transitionSections(
            current,
            next,
            timeline
        )
        animateItems(
            next,
            timeline,
        )
    }
}
import { gsap, ScrollTrigger } from "../library/gsap";
import { motionPresets } from "./motion/presets";

gsap.registerPlugin(ScrollTrigger);

export function createMultiItemScroll(container) {
    // Find all sections marked with "multi-item-scene"
    const multiSections = gsap.utils.toArray(
        ".multi-item-scene",
        container
    );

    multiSections.forEach((section) => {
        // Get all items within this section that should animate
        const items = gsap.utils.toArray(
            "[data-item-index]",
            section
        );

        if (items.length === 0) return;

        // Create a timeline for this section
        const timeline = gsap.timeline({
            scrollTrigger: {
                trigger: section,
                start: "top center",           // Section starts at center of viewport
                end: `+=${items.length * 300}px`,  // Each item gets 300px of scroll space
                scrub: true,                   // Smooth scroll sync
                markers: false,
            },
        });

        // Animate each item in sequence
        items.forEach((item, index) => {
            const motion = item.dataset.motion || "float-up";
            const preset = motionPresets[motion];

            if (!preset) {
                console.warn(`Unknown motion: ${motion}`);
                return;
            }

            // Animate in
            timeline.fromTo(
                item,
                preset.from,
                {
                    ...preset.to,
                    duration: 0.8,
                },
                index === 0 ? 0 : `>-0.4`  // Slight overlap between animations
            );

            // Add a pause/hold duration
            timeline.to({}, { duration: 0.5 });

            // Animate out (opposite of in)
            timeline.to(
                item,
                {
                    ...preset.from,
                    duration: 0.8,
                    pointerEvents: "none",
                },
                `>-0.4`  // Start before previous ends
            );
        });
    });
}
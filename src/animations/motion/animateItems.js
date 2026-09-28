// motion/animateItems.ts
import { motionPresets } from "./presets";

export function animateItems(
    section,
    timeline
) {
    const items = section.querySelectorAll(
        "[data-motion]"
    );

    items.forEach((item) => {
        const motion = item.dataset.motion ;

        if (!motion) return;

        const preset = motionPresets[motion];

        if (!preset) {
            console.warn(`Unknown motion: ${motion}`);
            return;
        }

        timeline.fromTo(
            item,
            preset.from,
            preset.to,
            "<"
        );
    });
}
import { motionPresets } from "./presets";
import { gsap } from "../../library/gsap";

export function animateItems(section, timeline) {
    const items = section.querySelectorAll("[data-motion]");

    items.forEach((item) => {
        const motion = item.dataset.motion;
        const isInfinite = item.dataset.infinite === "true";  // Check for infinite flag

        if (!motion) return;

        const preset = motionPresets[motion];

        if (!preset) {
            console.warn(`Unknown motion: ${motion}`);
            return;
        }

        // If infinite, create separate animation (not in timeline)
        if (isInfinite) {
            gsap.fromTo(
                item,
                preset.from,
                {
                    ...preset.to,
                    repeat: -1,
                    yoyo: true,
                    duration: preset.to.duration || 1,
                }
            );
        } else {
            // Use timeline for scroll-synced animations
            timeline.fromTo(
                item,
                preset.from,
                preset.to,
                "<"
            );
        }
    });
}
// sectionTransition.ts

export function transitionSections(
    current,
    next,
    timeline
) {
    timeline.to(current, {
        opacity: 0,
        scale: 0.95,
        duration: 0.5,
        pointerEvents:"none",
    });

    timeline.to(
        next,
        {
            opacity: 1,
            duration: 0.5,
            pointerEvents:"auto",
        },
        "<"
    );

    timeline.to({},{
        duration: 1,
    })
}
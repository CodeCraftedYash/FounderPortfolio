// motion/presets.ts

export const motionPresets = {
    "fade": {
        from: {
            opacity: 0,
        },
        to: {
            opacity: 1,
        },
    },

    "float-up": {
        from: {
            opacity: 0,
            y: 80,
        },
        to: {
            opacity: 1,
            y: 0,
        },
    },

    "float-left": {
        from: {
            opacity: 0,
            x: -80,
        },
        to: {
            opacity: 1,
            x: 0,
        },
    },

    "float-right": {
        from: {
            opacity: 0,
            x: 80,
        },
        to: {
            opacity: 1,
            x: 0,
        },
    },
    "float-top-right": {
        from: {
            opacity: 0,
            x: 80,
            y: -80,
        },
        to: {
            opacity: 1,
            x: 0,
            y: 0,
        },
    },
    "float-down": {
        from: {
            opacity: 0,
            y: -80,
        },
        to: {
            opacity: 1,
            y: 0,
        },
    },
    "float-bottom-right": {
        from: {
            opacity: 0,
            x: 80,
            y: 80,
        },
        to: {
            opacity: 1,
            x: 0,
            y: 0,
        },  
    },
    "float-bottom-left": {
        from: {
            opacity: 0,
            x: -80,
            y: 80,
        },
        to: {
            opacity: 1,
            x: 0,
            y: 0,
        },
    },
};
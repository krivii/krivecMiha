export const pageAnimation = {
    hidden: {
        opacity: 0,
        y: 300
    },
    show: {
        opacity: 1,
        y: 0,
        transition: {
            duration: .3,
            when: "beforeChildren",
            staggerChildren : 0.25
        }
    },
    exit: {
        opacity: 0,
        transition: {
            duration: .5
        }
    }
}

export const titleAnim = {
    hidden: {
        y: 200
    },
    show : {
        y: 0,
        transition: {
            duration : .75,
            ease: "easeOut"
        }
    }
}

export const fadeAnim = {
    hidden: {
        opacity: 0
    },
    show : {
        opacity: 1,
        transition: {
            duration : .75,
            ease: "easeOut"
        }
    }
}

export const photoAnim = {
    hidden: {
        scale: 2,
        opacity: 0
    },
    show : {
        scale: 1,
        opacity: 1,
        transition: {
            duration : 1,
            ease: "easeOut"
        }
    }
}

export const lineAnim = {
    hidden: {
        width: '0%'
    },
    show : {
        width: "100%",
        transition: {
            duration : 1
        }
    }
}

export const sliderAnim = {
    hidden: {
        x: '-130%',
        skew: '45deg'
    },
    show : {
        x: '100%',
        skew: '0deg',
        transition: {
            ease: "easeOut",
            duration : 1
        }
    }
}

export const sliderContainerAnim = {
    hidden: {
        opacity: 1
    },
    show : {
        opacity: 1,
        transition: {
            ease: "easeOut",
            staggerChildren: .15
        }
    }
}

export const scrollRevealAnim = {
    hidden: {
        opacity: 0,
        scale: 1.2,
        transition: {
            duration: .5
        }
    },
    show : {
        opacity: 1,
        scale: 1,
        transition: {
            duration: .5
        }
    }

    
}

export const photoFromAboveAnim = {
    hidden: {
        y: -300, // Start above the screen
        opacity: 0
    },
    show: {
        y: 0, // Settle in the middle of the screen
        opacity: 1,
        transition: {
            duration: 1,
            ease: "easeOut"
        }
    }
};
import * as d3 from 'd3'

export const calcShindoColor = (shindo: number, level: number) => {
    if (shindo < -3) {
        return 'rgb(0, 0, 205)'
    } else if (shindo >= (-3.0) && shindo < (-2.0)) {
        const a = d3.rgb(0, 0, 205)
        const b = d3.rgb(0, 64, 245)
        const compute = d3.interpolate(a, b)
        return compute(level)
    } else if (shindo >= (-2.0) && shindo < (-1.0)) {
        const a = d3.rgb(0, 72, 250)
        const b = d3.rgb(0, 194, 150)
        const compute = d3.interpolate(a, b)
        return compute(level)
    } else if (shindo >= (-1.0) && shindo < (0.0)) {
        const a = d3.rgb(0, 208, 139)
        const b = d3.rgb(56, 245, 62)
        const compute = d3.interpolate(a, b)
        return compute(level)
    } else if (shindo >= (0.0) && shindo < (1.0)) {
        const a = d3.rgb(63, 250, 54)
        const b = d3.rgb(176, 254, 16)
        const compute = d3.interpolate(a, b)
        return compute(level)
    } else if (shindo >= (1.0) && shindo < (2.0)) {
        const a = d3.rgb(189, 255, 12)
        const b = d3.rgb(248, 255, 1)
        const compute = d3.interpolate(a, b)
        return compute(level)
    } else if (shindo >= (2.0) && shindo < (3.0)) {
        const a = d3.rgb(255, 255, 0)
        const b = d3.rgb(255, 224, 0)
        const compute = d3.interpolate(a, b)
        return compute(level)
    } else if (shindo >= (3.0) && shindo < (4.0)) {
        const a = d3.rgb(255, 221, 0)
        const b = d3.rgb(255, 151, 0)
        const compute = d3.interpolate(a, b)
        return compute(level)
    } else if (shindo >= (4.0) && shindo < (5.0)) {
        const a = d3.rgb(255, 144, 0)
        const b = d3.rgb(255, 75, 0)
        const compute = d3.interpolate(a, b)
        return compute(level)
    } else if (shindo >= (5.0) && shindo < (6.0)) {
        const a = d3.rgb(255, 68, 0)
        const b = d3.rgb(246, 6, 0)
        const compute = d3.interpolate(a, b)
        return compute(level)
    } else if (shindo >= (6.0) && shindo < (7.0)) {
        const a = d3.rgb(245, 0, 0)
        const b = d3.rgb(177, 0, 0)
        const compute = d3.interpolate(a, b)
        return compute(level)
    } else if (shindo >= (7.0)) {
        const a = d3.rgb(170, 0, 0)
        const b = d3.rgb(170, 0, 0)
        const compute = d3.interpolate(a, b)
        return compute(level)
    }
}

export const calcIntensityColor = (intensity: number, level: number) => {
    if (intensity >= (-3.0) && intensity < (-2.0)) {
        const a = d3.rgb(0, 0, 205)
        const b = d3.rgb(0, 64, 245)
        const compute = d3.interpolate(a, b)
        return compute(level)
    } else if (intensity >= (-2.0) && intensity < (-1.0)) {
        const a = d3.rgb(0, 72, 250)
        const b = d3.rgb(0, 194, 150)
        const compute = d3.interpolate(a, b)
        return compute(level)
    } else if (intensity >= (-1.0) && intensity < (0.0)) {
        const a = d3.rgb(0, 208, 139)
        const b = d3.rgb(56, 245, 62)
        const compute = d3.interpolate(a, b)
        return compute(level)
    } else if (intensity >= (0.0) && intensity < (1.0)) {
        const a = d3.rgb(63, 250, 54)
        const b = d3.rgb(176, 254, 16)
        const compute = d3.interpolate(a, b)
        return compute(level)
    } else if (intensity >= (1.0) && intensity < (2.0)) {
        const a = d3.rgb(189, 255, 12)
        const b = d3.rgb(248, 255, 1)
        const compute = d3.interpolate(a, b)
        return compute(level)
    } else if (intensity >= (2.0) && intensity < (3.0)) {
        const a = d3.rgb(255, 255, 0)
        const b = d3.rgb(255, 224, 0)
        const compute = d3.interpolate(a, b)
        return compute(level)
    } else if (intensity >= (3.0) && intensity < (4.0)) {
        const a = d3.rgb(255, 221, 0)
        const b = d3.rgb(255, 151, 0)
        const compute = d3.interpolate(a, b)
        return compute(level)
    } else if (intensity >= (4.0) && intensity < (5.0)) {
        const a = d3.rgb(255, 144, 0)
        const b = d3.rgb(255, 75, 0)
        const compute = d3.interpolate(a, b)
        return compute(level)
    } else if (intensity >= (5.0) && intensity < (6.0)) {
        const a = d3.rgb(255, 68, 0)
        const b = d3.rgb(246, 6, 0)
        const compute = d3.interpolate(a, b)
        return compute(level)
    } else if (intensity >= (6.0) && intensity < (7.0)) {
        const a = d3.rgb(245, 0, 0)
        const b = d3.rgb(177, 0, 0)
        const compute = d3.interpolate(a, b)
        return compute(level)
    } else if (intensity >= (7.0) && intensity < (12.0)) {
        const a = d3.rgb(170, 0, 0)
        const b = d3.rgb(170, 0, 0)
        const compute = d3.interpolate(a, b)
        return compute(level)
    } else if (intensity >= (12.0)) {
        // You may want to add another color range if needed
        const a = d3.rgb(170, 0, 0)
        const b = d3.rgb(170, 0, 0)
        const compute = d3.interpolate(a, b)
        return compute(level)
    }
}
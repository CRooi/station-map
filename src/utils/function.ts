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
    if (intensity < -3) {
        return 'rgb(0, 0, 205)'
    } else if (intensity >= (-3.0) && intensity < (-2.0)) {
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

export const calcPgaColor = (pga: number) => {
    if (pga <= (0.01)) {
        return 'rgb(0, 6, 209)'
    } else if (pga == (0.02)) {
        return 'rgb(0, 33, 186)'
    } else if (pga > (0.02) && pga <= (0.05)) {
        const level = (pga * 10 - 0.2) * 0.333333
        const a = d3.rgb(0, 45, 223)
        const b = d3.rgb(0, 108, 202)
        const compute = d3.interpolate(a, b)
        return compute(level)
    } else if (pga > (0.05) && pga <= (0.1)) {
        const level = (pga - 0.05) * 20
        const a = d3.rgb(0, 125, 204)
        const b = d3.rgb(0, 205, 148)
        const compute = d3.interpolate(a, b)
        return compute(level)
    } else if (pga > (0.1) && pga <= (0.2)) {
        const level = (pga - 0.1) * 10
        const a = d3.rgb(2, 214, 136)
        const b = d3.rgb(26, 228, 82)
        const compute = d3.interpolate(a, b)
        return compute(level)
    } else if (pga > (0.2) && pga <= (0.5)) {
        const level = (pga - 0.2) * 3.333
        const a = d3.rgb(39, 246, 75)
        const b = d3.rgb(92, 246, 28)
        const compute = d3.interpolate(a, b)
        return compute(level)
    } else if (pga > (0.5) && pga <= (1)) {
        const level = (pga - 0.5) * 2
        const a = d3.rgb(111, 251, 24)
        const b = d3.rgb(179, 250, 12)
        const compute = d3.interpolate(a, b)
        return compute(level)
    } else if (pga > (1) && pga <= (2)) {
        const level = (pga - 1)
        const a = d3.rgb(193, 248, 10)
        const b = d3.rgb(229, 232, 0)
        const compute = d3.interpolate(a, b)
        return compute(level)
    } else if (pga > (2) && pga <= (10)) {
        const level = (pga - 2) * 0.333
        const a = d3.rgb(255, 255, 0)
        const b = d3.rgb(255, 226, 0)
        const compute = d3.interpolate(a, b)
        return compute(level)
    } else if (pga > (10) && pga <= (20)) {
        const level = (pga - 10) * 0.1
        const a = d3.rgb(255, 217, 0)
        const b = d3.rgb(225, 180, 0)
        const compute = d3.interpolate(a, b)
        return compute(level)
    } else if (pga > (20) && pga <= (50)) {
        const level = (pga - 20) * 0.0333
        const a = d3.rgb(255, 167, 0)
        const b = d3.rgb(255, 121, 0)
        const compute = d3.interpolate(a, b)
        return compute(level)
    } else if (pga > (50) && pga <= (100)) {
        const level = (pga - 50) * 0.02
        const a = d3.rgb(255, 105, 0)
        const b = d3.rgb(255, 75, 0)
        const compute = d3.interpolate(a, b)
        return compute(level)
    } else if (pga > (100) && pga <= (200)) {
        const level = (pga - 100) * 0.01
        const a = d3.rgb(255, 61, 0)
        const b = d3.rgb(255, 25, 0)
        const compute = d3.interpolate(a, b)
        return compute(level)
    } else if (pga > (200) && pga <= (500)) {
        const level = (pga - 200) * 0.00333
        const a = d3.rgb(250, 20, 0)
        const b = d3.rgb(220, 0, 0)
        const compute = d3.interpolate(a, b)
        return compute(level)
    } else if (pga > (500) && pga <= (1000)) {
        const level = (pga - 500) * 0.002
        const a = d3.rgb(210, 0, 0)
        const b = d3.rgb(160, 0, 0)
        const compute = d3.interpolate(a, b)
        return compute(level)
    } else if (pga > (1000)) {
        return 'rgb(160, 0, 0)'
    }
}
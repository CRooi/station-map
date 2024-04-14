<template>
    <div class="flex items-end flex-col">
        <div class="text-xs mb-1" v-if="settings.map.type === 'intensity'">烈度 Int.</div>
        <div class="text-xs mb-1" v-if="settings.map.type === 'shindo'">震度 Int.</div>
        <div class="text-xs mb-1" v-if="settings.map.type === 'pga'">峰值加速度 PGA</div>

        <div v-if="settings.map.type === 'intensity'" class="mb-1 relative w-3 h-48 border border-[#485053] rounded-lg background mr-6">
            <div v-for="(item, index) in new Array(15).fill(null)" :style="{top: `${12/15 * index}rem`, display: `${index ? 'block' : 'none'}`}" class="absolute w-full h-[1px] bg-[gray]"></div>

            <div :style="{bottom: maxMaxCalcIntensityBottom, backgroundColor: `${calcIntensityColor(maxMaxCalcShindo, maxMaxCalcShindo - Math.floor(maxMaxCalcShindo))}`}" class="opacity-60 absolute -ml-[0.3125rem] w-5 h-2 rounded-md border border-[#485053]"></div>
            <div :style="{bottom: maxCalcIntensityBottom, backgroundColor: `${calcIntensityColor(maxCalcShindo, maxCalcShindo - Math.floor(maxCalcShindo))}`}" class="absolute -ml-[0.3125rem] w-5 h-2 rounded-md border border-[#485053]"></div>
        </div>

        <div v-if="settings.map.type === 'intensity'" style="line-height: 0;" v-for="(item, index) in ['-3&nbsp;','-2&nbsp;','-1&nbsp;','0&nbsp;&nbsp;&nbsp;','1&nbsp;&nbsp;&nbsp;','2&nbsp;&nbsp;&nbsp;','3&nbsp;&nbsp;&nbsp;','4&nbsp;&nbsp;&nbsp;','5&nbsp;&nbsp;&nbsp;','6&nbsp;&nbsp;&nbsp;','7&nbsp;&nbsp;&nbsp;','8&nbsp;&nbsp;&nbsp;','9&nbsp;&nbsp;&nbsp;','10&nbsp;','11&nbsp;','12&nbsp;']" :style="{bottom: `${12/15 * index}rem`}" class="absolute text-xs right-0">
            <div style="line-height: 1rem;">&nbsp;</div>
            <div class="mb-7">{{ item }}</div>
        </div>
        
        <div v-if="settings.map.type === 'shindo'" class="mb-1 relative w-3 h-48 border border-[#485053] rounded-lg background mr-4">
            <div v-for="(item, index) in new Array(10).fill(null)" :style="{top: `${12/10 * index}rem`, display: `${index ? 'block' : 'none'}`}" class="absolute w-full h-[1px] bg-[gray]"></div>

            <div :style="{bottom: maxMaxCalcShindoBottom, backgroundColor: `${calcShindoColor(maxMaxCalcShindo, maxMaxCalcShindo - Math.floor(maxMaxCalcShindo))}`}" class="opacity-60 absolute -ml-[0.3125rem] w-5 h-2 rounded-md border border-[#485053]"></div>
            <div :style="{bottom: maxCalcShindoBottom, backgroundColor: `${calcShindoColor(maxCalcShindo, maxCalcShindo - Math.floor(maxCalcShindo))}`}" class="absolute -ml-[0.3125rem] w-5 h-2 rounded-md border border-[#485053]"></div>
        </div>

        <div v-if="settings.map.type === 'shindo'" style="line-height: 0;" v-for="(item, index) in ['-3','-2','-1','0&nbsp;','1&nbsp;','2&nbsp;','3&nbsp;','4&nbsp;','5&nbsp;','6&nbsp;','7&nbsp;']" :style="{bottom: `${12/10 * index}rem`}" class="absolute text-xs right-0">
            <div style="line-height: 1rem;">&nbsp;</div>
            <div class="mb-7">{{ item }}</div>
        </div>

        <div v-if="settings.map.type === 'pga'" class="mb-1 relative w-3 h-48 border border-[#485053] rounded-lg background mr-9">
            <div v-for="(item, index) in new Array(15).fill(null)" :style="{top: `${12/15 * index}rem`, display: `${index ? 'block' : 'none'}`}" class="absolute w-full h-[1px] bg-[gray]"></div>

            <div :style="{bottom: maxMaxPgaBottom, backgroundColor: `${calcPgaColor(maxMaxPga)}`}" class="opacity-60 absolute -ml-[0.3125rem] w-5 h-2 rounded-md border border-[#485053]"></div>
            <div :style="{bottom: maxPgaBottom, backgroundColor: `${calcPgaColor(maxPga)}`}" class="absolute -ml-[0.3125rem] w-5 h-2 rounded-md border border-[#485053]"></div>
        </div>

        <div v-if="settings.map.type === 'pga'" style="line-height: 0;" v-for="(item, index) in ['0.01&nbsp;','0.02&nbsp;','0.05&nbsp;','0.1&nbsp;&nbsp;&nbsp;','0.2&nbsp;&nbsp;&nbsp;','0.5&nbsp;&nbsp;&nbsp;','1&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;','2&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;','5&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;','10&nbsp;&nbsp;&nbsp;&nbsp;','20&nbsp;&nbsp;&nbsp;&nbsp;','50&nbsp;&nbsp;&nbsp;&nbsp;','100&nbsp;&nbsp;','200&nbsp;&nbsp;','500&nbsp;&nbsp;','1000']" :style="{bottom: `${12/15 * index}rem`}" class="absolute text-xs right-0">
            <div style="line-height: 1rem;">&nbsp;</div>
            <div class="mb-7">{{ item }}</div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { DATA, settings } from '../../utils/store'
import { calcIntensityColor, calcShindoColor, calcPgaColor } from '../../utils/function'

const maxCalcIntensityBottom = computed(() => {
    if (maxCalcIntensity.value === -Infinity) return '0rem'

    if (maxCalcIntensity.value < -3) return '0rem'

    const level = 12 / 16
    const value = maxCalcIntensity.value + 3

    return `${value * level}rem`
})

const maxMaxCalcIntensityBottom = computed(() => {
    if (maxMaxCalcIntensity.value === -Infinity) return '0rem'

    if (maxMaxCalcIntensity.value < -3) return '0rem'

    const level = 12 / 16
    const value = maxMaxCalcIntensity.value + 3

    return `${value * level}rem`
})

const maxCalcShindoBottom = computed(() => {
    if (maxCalcShindo.value === -Infinity) return '0rem'

    const level = 12 / 11
    const value = maxCalcShindo.value + 3

    return `${value * level}rem`
})

const maxMaxCalcShindoBottom = computed(() => {
    if (maxMaxCalcShindo.value === -Infinity) return '0rem'

    const level = 12 / 11
    const value = maxMaxCalcShindo.value + 3

    return `${value * level}rem`
})

const maxPgaBottom = computed(() => {
    if (maxPga.value === -Infinity) return '0rem'

    if (maxPga.value < -3) return '0rem'

    const level = 12 / 16
    let value = 0

    if (maxPga.value >= 0.01 && maxPga.value < 0.02) value = 0 + (1 / (0.02 - 0.01) * (maxPga.value - 0.01))
    else if (maxPga.value >= 0.02 && maxPga.value < 0.05) value = 1 + (1 / (0.05 - 0.02) * (maxPga.value - 0.02))
    else if (maxPga.value >= 0.05 && maxPga.value < 0.1) value = 2 + (1 / (0.1 - 0.05) * (maxPga.value - 0.05))
    else if (maxPga.value >= 0.1 && maxPga.value < 0.2) value = 3 + (1 / (0.2 - 0.1) * (maxPga.value - 0.1))
    else if (maxPga.value >= 0.2 && maxPga.value < 0.5) value = 4 + (1 / (0.5 - 0.2) * (maxPga.value - 0.2))
    else if (maxPga.value >= 0.5 && maxPga.value < 1) value = 5 + (1 / (1 - 0.5) * (maxPga.value - 0.5))
    else if (maxPga.value >= 1 && maxPga.value < 2) value = 6 + (1 / (2 - 1) * (maxPga.value - 1))
    else if (maxPga.value >= 2 && maxPga.value < 5) value = 7 + (1 / (5 - 2) * (maxPga.value - 2))
    else if (maxPga.value >= 5 && maxPga.value < 10) value = 8 + (1 / (10 - 5) * (maxPga.value - 5))
    else if (maxPga.value >= 10 && maxPga.value < 20) value = 9 + (1 / (20 - 10) * (maxPga.value - 10))
    else if (maxPga.value >= 20 && maxPga.value < 50) value = 10 + (1 / (50 - 20) * (maxPga.value - 20))
    else if (maxPga.value >= 50 && maxPga.value < 100) value = 11 + (1 / (100 - 50) * (maxPga.value - 50))
    else if (maxPga.value >= 100 && maxPga.value < 200) value = 12 + (1 / (200 - 100) * (maxPga.value - 100))
    else if (maxPga.value >= 200 && maxPga.value < 500) value = 13 + (1 / (500 - 200) * (maxPga.value - 200))
    else if (maxPga.value >= 500 && maxPga.value < 1000) value = 14 + (1 / (1000 - 500) * (maxPga.value - 500))
    else if (maxPga.value >= 1000) value = 15 + (1 / (2000 - 1000) * (maxPga.value - 1000))

    return `${value * level}rem`
})

const maxMaxPgaBottom = computed(() => {
    if (maxMaxPga.value === -Infinity) return '0rem'

    if (maxMaxPga.value < -3) return '0rem'

    const level = 12 / 16
    let value = 0

    if (maxMaxPga.value >= 0.01 && maxMaxPga.value < 0.02) value = 0 + (1 / (0.02 - 0.01) * (maxMaxPga.value - 0.01))
    else if (maxMaxPga.value >= 0.02 && maxMaxPga.value < 0.05) value = 1 + (1 / (0.05 - 0.02) * (maxMaxPga.value - 0.02))
    else if (maxMaxPga.value >= 0.05 && maxMaxPga.value < 0.1) value = 2 + (1 / (0.1 - 0.05) * (maxMaxPga.value - 0.05))
    else if (maxMaxPga.value >= 0.1 && maxMaxPga.value < 0.2) value = 3 + (1 / (0.2 - 0.1) * (maxMaxPga.value - 0.1))
    else if (maxMaxPga.value >= 0.2 && maxMaxPga.value < 0.5) value = 4 + (1 / (0.5 - 0.2) * (maxMaxPga.value - 0.2))
    else if (maxMaxPga.value >= 0.5 && maxMaxPga.value < 1) value = 5 + (1 / (1 - 0.5) * (maxMaxPga.value - 0.5))
    else if (maxMaxPga.value >= 1 && maxMaxPga.value < 2) value = 6 + (1 / (2 - 1) * (maxMaxPga.value - 1))
    else if (maxMaxPga.value >= 2 && maxMaxPga.value < 5) value = 7 + (1 / (5 - 2) * (maxMaxPga.value - 2))
    else if (maxMaxPga.value >= 5 && maxMaxPga.value < 10) value = 8 + (1 / (10 - 5) * (maxMaxPga.value - 5))
    else if (maxMaxPga.value >= 10 && maxMaxPga.value < 20) value = 9 + (1 / (20 - 10) * (maxMaxPga.value - 10))
    else if (maxMaxPga.value >= 20 && maxMaxPga.value < 50) value = 10 + (1 / (50 - 20) * (maxMaxPga.value - 20))
    else if (maxMaxPga.value >= 50 && maxMaxPga.value < 100) value = 11 + (1 / (100 - 50) * (maxMaxPga.value - 50))
    else if (maxMaxPga.value >= 100 && maxMaxPga.value < 200) value = 12 + (1 / (200 - 100) * (maxMaxPga.value - 100))
    else if (maxMaxPga.value >= 200 && maxMaxPga.value < 500) value = 13 + (1 / (500 - 200) * (maxMaxPga.value - 200))
    else if (maxMaxPga.value >= 500 && maxMaxPga.value < 1000) value = 14 + (1 / (1000 - 500) * (maxMaxPga.value - 500))
    else if (maxMaxPga.value >= 1000) value = 15 + (1 / (2000 - 1000) * (maxMaxPga.value - 1000))

    return `${value * level}rem`
})

const maxCalcIntensity = computed(() => {
    return Math.max(...Object.values(DATA.wolfx.data).map((v: any) => v.CalcIntensity))
})

const maxMaxCalcIntensity = computed(() => {
    return Math.max(...Object.values(DATA.wolfx.data).map((v: any) => v.Max_CalcIntensity))
})

const maxCalcShindo = computed(() => {
    return Math.max(...Object.values(DATA.wolfx.data).map((v: any) => v.CalcShindo))
})

const maxMaxCalcShindo = computed(() => {
    return Math.max(...Object.values(DATA.wolfx.data).map((v: any) => v.Max_CalcShindo))
})

const maxPga = computed(() => {
    return Math.max(...Object.values(DATA.wolfx.data).map((v: any) => v.PGA))
})

const maxMaxPga = computed(() => {
    return Math.max(...Object.values(DATA.wolfx.data).map((v: any) => v.Max_PGA))
})
</script>

<style scoped>
.background {
    background: linear-gradient(
        to bottom,
        rgb(170, 0, 0),
        rgb(177, 0, 0),
        rgb(246, 6, 0),
        rgb(255, 75, 0),
        rgb(255, 151, 0),
        rgb(255, 224, 0),
        rgb(248, 255, 1),
        rgb(176, 254, 16),
        rgb(56, 245, 62),
        rgb(0, 194, 150),
        rgb(0, 64, 245),
        rgb(0, 0, 205)
    );
}
</style>
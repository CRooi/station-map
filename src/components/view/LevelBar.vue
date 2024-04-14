<template>
    <div class="flex items-end flex-col">
        <div class="text-xs" v-if="settings.show.type === 'intensity'">烈度 Int.</div>
        <div class="text-xs mb-1" v-if="settings.show.type === 'shindo'">震度 Int.</div>
        
        <div class="mb-1 relative w-3 h-48 border border-[#485053] rounded-lg background mr-4">
            <div v-for="(item, index) in new Array(10).fill(null)" :style="{top: `${12/10 * index}rem`, display: `${index ? 'block' : 'none'}`}" class="absolute w-full h-[1px] bg-[gray]"></div>

            <div :style="{bottom: maxMaxCalcShindoBottom, backgroundColor: `${calcShindoColor(maxMaxCalcShindo, maxMaxCalcShindo - Math.floor(maxMaxCalcShindo))}`}" class="opacity-60 absolute -ml-[0.3125rem] w-5 h-2 rounded-md border border-[#485053]"></div>
            <div :style="{bottom: maxCalcShindoBottom, backgroundColor: `${calcShindoColor(maxCalcShindo, maxCalcShindo - Math.floor(maxCalcShindo))}`}" class="absolute -ml-[0.3125rem] w-5 h-2 rounded-md border border-[#485053]"></div>
        </div>

        <div style="line-height: 0;" v-for="(item, index) in ['-3','-2','-1','0&nbsp;','1&nbsp;','2&nbsp;','3&nbsp;','4&nbsp;','5&nbsp;','6&nbsp;','7&nbsp;']" :style="{bottom: `${12/10 * index}rem`}" class="absolute text-xs right-0">
            <div style="line-height: 1rem;">&nbsp;</div>
            <div class="mb-7">{{ item }}</div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { DATA, settings } from '../../utils/store'
import { calcIntensityColor, calcShindoColor } from '../../utils/function'

const maxCalcShindoBottom = computed(() => {
    if (maxCalcShindo.value === -Infinity) return '0rem'

    if (settings.show.type === 'shindo') {
        const level = 12 / 11
        const value = maxCalcShindo.value + 3

        return `${value * level}rem`
    }
})

const maxMaxCalcShindoBottom = computed(() => {
    if (maxMaxCalcShindo.value === -Infinity) return '0rem'

    if (settings.show.type === 'shindo') {
        const level = 12 / 11
        const value = maxMaxCalcShindo.value + 3

        return `${value * level}rem`
    }
})

const maxCalcShindo = computed(() => {
    return Math.max(...Object.values(DATA.wolfx.data).map((v: any) => v.CalcShindo))
})

const maxMaxCalcShindo = computed(() => {
    return Math.max(...Object.values(DATA.wolfx.data).map((v: any) => v.Max_CalcShindo))
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
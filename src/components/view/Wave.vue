<template>
    <div class="relative" v-for="(_, name) in DATA.wolfx.list">
        <div class="wave" :id="`wolfx-${name}-wave`"></div>
        <div v-if="DATA.wolfx.chartList[name]" class="absolute top-0 left-0 text-sm">{{ DATA.wolfx.list[name].location }} {{ name }} {{ DATA.wolfx.chartList[name].rawValue[DATA.wolfx.chartList[name].rawValue.length - 1] }} {{ DATA.wolfx.chartList[name].value[DATA.wolfx.chartList[name].value.length - 1] }} {{ DATA.wolfx.chartList[name].rawValue.length }} {{ DATA.wolfx.chartList[name].value.length }}</div>
    </div>
</template>

<script setup lang="ts">
import * as echarts from 'echarts'
import { DATA, settings } from '../../utils/store'

interface ChartList {
    [key: string]: {
        chart: echarts.ECharts
        value: number[]
    }
}

const resize = () => {
    for (const name in DATA.wolfx.chartList) {
        DATA.wolfx.chartList[name].chart.resize()
    }
}

onMounted(() => {
    for (const name in DATA.wolfx.list) {
        DATA.wolfx.chartList[name] = {
            isFirst: true,
            chart: echarts.init(document.getElementById(`wolfx-${name}-wave`) as HTMLDivElement),
            value: new Array(60).fill(null),
            rawValue: new Array(60).fill(null)
        }
    }

    window.addEventListener('resize', () => {
        resize()
    })
})

onBeforeUnmount(() => {
    window.removeEventListener('resize', () => {
        resize()
    })
})
</script>

<style scoped>
.wave {
    height: 80px;
}
</style>
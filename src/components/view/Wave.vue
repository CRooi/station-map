<template>
    <div class="rounded-md relative border border-[#485053] my-1" v-for="(_, name) in DATA.wolfx.list">
        <div class="wave" :id="`wolfx-${name}-wave`"></div>
        <div v-if="DATA.wolfx.chartList[name]" class="cursor-default absolute top-0.5 left-0.5 text-xs">{{ DATA.wolfx.list[name].location }} {{ String(name).split('_')[2] }}</div>
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

.wave div {
    cursor: default;
}
</style>
<template>
    <div class="relative" v-for="(_, name) in DATA.wolfx.list">
        <div class="wave" :id="`wolfx-${name}-wave`"></div>
        <div class="absolute top-0 left-0 text-sm">{{ DATA.wolfx.list[name].location }} {{ name }}</div>
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

onMounted(() => {
    for (const name in DATA.wolfx.list) {
        DATA.wolfx.chartList[name] = {
            chart: echarts.init(document.getElementById(`wolfx-${name}-wave`) as HTMLDivElement),
            value: new Array(60).fill(null)
        }
    }
})
</script>

<style scoped>
.wave {
    height: 80px;
}
</style>
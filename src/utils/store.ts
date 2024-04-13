import { ref, reactive } from 'vue'
import maplibre from 'maplibre-gl'

interface ChartList {
    [key: string]: {
        chart: echarts.ECharts
        value: number[]
    }
}

export const map = ref<maplibre.Map>() as Ref<maplibre.Map>
export const map2 = ref<maplibre.Map>() as Ref<maplibre.Map>

export const DATA = reactive({
    rinet: {} as any,
    wolfx: {
        list: {} as any,
        data: {} as any,
        chartList: {} as ChartList
    },
    time: '0000/00/00 00:00:00'
})

export const settings = reactive({
    show: {
        type: 'shindo' as 'intensity' | 'shindo' | 'pga'
    }
})
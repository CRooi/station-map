<template>

</template>

<script setup lang="ts">
import maplibre from 'maplibre-gl'
import * as echarts from 'echarts'
import axios from 'axios'

import { map, map2, DATA, settings } from '../../utils/store'
import { calcIntensityColor, calcShindoColor } from '../../utils/function'


let wolfxServer: WebSocket

onMounted(async () => {
    DATA.wolfx.list = (await axios.get(`https://api.wolfx.jp/seis_list.json?${Date.now()}`)).data

    for (const name in DATA.wolfx.list) {
        if (!DATA.wolfx.list[name].enable) continue

        const el = document.createElement('div')
        el.id = `wolfx-${name}`
        el.className = 'station'

        const el2 = document.createElement('div')
        el2.id = `wolfx-${name}-2`
        el2.className = 'station'

        new maplibre.Marker({element: el})
            .setLngLat([DATA.wolfx.list[name].longitude, DATA.wolfx.list[name].latitude])
            .addTo(map.value)

        new maplibre.Marker({element: el2})
            .setLngLat([DATA.wolfx.list[name].longitude, DATA.wolfx.list[name].latitude])
            .addTo(map2.value)
    }

    setWolfxServer()
})

const option = {
    xAxis: {
        data: new Array(60).fill(0),
        axisLine: {
            show: false
        },
        axisTick: {
            show: false
        },
        axisLabel: {
            show: false
        }
    },
    yAxis: {
        splitLine: {
            show: false
        },
        // axisLabel: {
        //     show: false
        // },
        type: 'value',
        max: 0.3,
        min: -0.3
    },
    series: [
        {
            data: [] as number[],
            type: 'line',
            lineStyle: {
                color: '#fff',
                width: 1.5
            }
        }
    ],
    grid: {
        top: '0px',
        left: '0px',
        right: '0px',
        bottom: '0px',
        containLabel: false
    },
    animation: false
}

const setWolfxServer = () => {
    wolfxServer = new WebSocket('wss://seis.wolfx.jp/all_seis')
    
    wolfxServer.onmessage = e => {
        const message = JSON.parse(e.data)

        if (message.type === 'CQ_BEB_01') {
            DATA.time = message.update_at
        }

        if (!DATA.wolfx.list[message.type]) return

        DATA.wolfx.data[message.type] = message

        if (settings.show.type === 'shindo') {
            document.getElementById(`wolfx-${message.type}`)!.style.backgroundColor = calcShindoColor(message.Max_CalcShindo, message.Max_CalcShindo - Math.floor(message.Max_CalcShindo)) as string
            document.getElementById(`wolfx-${message.type}-2`)!.style.backgroundColor = calcShindoColor(message.Max_CalcShindo, message.Max_CalcShindo - Math.floor(message.Max_CalcShindo)) as string

            document.getElementById(`wolfx-${message.type}`)!.style.zIndex = ((message.Max_CalcShindo + 10) * 10).toFixed(0)
            document.getElementById(`wolfx-${message.type}-2`)!.style.zIndex = ((message.Max_CalcShindo + 10) * 10).toFixed(0)
        }

        DATA.wolfx.chartList[message.type].rawValue.push(message.PGA)

        if (DATA.wolfx.chartList[message.type].rawValue.length > 60) {
            DATA.wolfx.chartList[message.type].rawValue.shift()
        }

        if (DATA.wolfx.chartList[message.type].isFirst) {
            DATA.wolfx.chartList[message.type].isFirst = false
            return
        }

        DATA.wolfx.chartList[message.type].value.push(DATA.wolfx.chartList[message.type].rawValue[DATA.wolfx.chartList[message.type].rawValue.length - 2] - message.PGA)

        option.yAxis.max = Math.max(...DATA.wolfx.chartList[message.type].value.map(v => Math.abs(v))) * 1.1
        option.yAxis.min = -option.yAxis.max

        if (DATA.wolfx.chartList[message.type].value.length > 60) {
            DATA.wolfx.chartList[message.type].value.shift()
        }
        
        option.series[0].data = DATA.wolfx.chartList[message.type].value
        DATA.wolfx.chartList[message.type].chart.setOption(option)
    }

    wolfxServer.onclose = () => {
        setTimeout(() => {
            setWolfxServer()
        }, 1000)
    }
}
</script>

<style>

</style>
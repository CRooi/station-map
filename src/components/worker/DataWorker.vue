<template></template>

<script setup lang="ts">
import axios from 'axios'

import { DATA, settings } from '../../utils/store'
import { calcIntensityColor, calcShindoColor, calcPgaColor } from '../../utils/function'


let wolfxServer: WebSocket

onMounted(async () => {
    DATA.wolfx.list = (await axios.get(`https://wolfx.jp/seis_list.json?${Date.now()}`)).data

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
            },
            showSymbol: false
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
    wolfxServer = new WebSocket('wss://seisjs.wolfx.jp/all_seis')

    wolfxServer.onmessage = e => {
        const message = JSON.parse(e.data)

        if (message.type === '3ac89d51-eace-4a58-b5c1-72162604fe86') {
            DATA.time = message.update_at
        }

        if (!DATA.wolfx.list[message.type]) return

        DATA.wolfx.data[message.type] = message

        if (settings.map.enabled) {
            if (settings.map.type === 'shindo') {
                document.getElementById(`wolfx-${message.type}`)!.style.backgroundColor = calcShindoColor(message.Max_CalcShindo, message.Max_CalcShindo - Math.floor(message.Max_CalcShindo)) as string
                document.getElementById(`wolfx-${message.type}-2`)!.style.backgroundColor = calcShindoColor(message.Max_CalcShindo, message.Max_CalcShindo - Math.floor(message.Max_CalcShindo)) as string

                document.getElementById(`wolfx-${message.type}`)!.style.zIndex = ((message.Max_CalcShindo + 10) * 10).toFixed(0)
                document.getElementById(`wolfx-${message.type}-2`)!.style.zIndex = ((message.Max_CalcShindo + 10) * 10).toFixed(0)
            } else if (settings.map.type === 'intensity') {
                document.getElementById(`wolfx-${message.type}`)!.style.backgroundColor = calcIntensityColor(message.Max_CalcIntensity, message.Max_CalcIntensity - Math.floor(message.Max_CalcIntensity)) as string
                document.getElementById(`wolfx-${message.type}-2`)!.style.backgroundColor = calcIntensityColor(message.Max_CalcIntensity, message.Max_CalcIntensity - Math.floor(message.Max_CalcIntensity)) as string

                document.getElementById(`wolfx-${message.type}`)!.style.zIndex = ((message.Max_CalcIntensity + 10) * 10).toFixed(0)
                document.getElementById(`wolfx-${message.type}-2`)!.style.zIndex = ((message.Max_CalcIntensity + 10) * 10).toFixed(0)
            } else if (settings.map.type === 'pga') {
                document.getElementById(`wolfx-${message.type}`)!.style.backgroundColor = calcPgaColor(message.PGA) as string
                document.getElementById(`wolfx-${message.type}-2`)!.style.backgroundColor = calcPgaColor(message.PGA) as string

                document.getElementById(`wolfx-${message.type}`)!.style.zIndex = (message.PGA * 100).toFixed(0)
                document.getElementById(`wolfx-${message.type}-2`)!.style.zIndex = (message.PGA * 100).toFixed(0)
            }
        }

        DATA.wolfx.chartList[message.type].rawValue.push(message.PGA)

        if (DATA.wolfx.chartList[message.type].rawValue.length > 60) {
            DATA.wolfx.chartList[message.type].rawValue.shift()
        }

        if (DATA.wolfx.chartList[message.type].isFirst) {
            DATA.wolfx.chartList[message.type].isFirst = false
            return
        }

        DATA.wolfx.chartList[message.type].value.push(message.PGA - DATA.wolfx.chartList[message.type].rawValue[DATA.wolfx.chartList[message.type].rawValue.length - 2])

        option.yAxis.max = Math.max(...DATA.wolfx.chartList[message.type].value.map(v => Math.abs(v))) * 1.1
        option.yAxis.min = -option.yAxis.max

        if (option.yAxis.max < 1) {
            option.yAxis.max = 1
            option.yAxis.min = -1
        }

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

<style></style>
<template>
    <div class="relative w-[65%] float-left" v-if="isSettingsLoaded && settings.map.enabled">
        <div class="w-full min-h-screen max-h-screen" id="map">
        </div>

        <div class="shadow-lg bg-[#242424] border border-[#485053] rounded-lg absolute bottom-2 left-2 w-[20%] h-[25%]">
            <div class="w-full h-full" id="map2"></div>
            <div class="absolute bottom-0 right-1 text-sm select-none cursor-default">南海诸岛</div>
        </div>

        <BottomRightContainer class="absolute bottom-1 right-0 select-none cursor-default" />
    </div>

    <div v-if="isSettingsLoaded"
        :class="`select-none cursor-default float-left max-h-screen ${settings.map.enabled ? 'w-[35%]' : 'w-[100%]'} w-[100%] p-1 overflow-hidden overflow-y-auto`">
        <Wave v-if="JSON.stringify(DATA.wolfx.list) !== '{}'" />
    </div>

    <MapView v-if="isSettingsLoaded && settings.map.enabled" />
    <DataWorker v-if="isSettingsLoaded" />

    <div class="p-2 absolute w-full min-h-screen max-h-screen bg-[#242424]" style="z-index: 999;" v-if="isShowSettings">
        <!-- <div class="cursor-pointer flex items-center" @click="isShowSettings = false">
            <t-icon size="large" name="chevron-left" />
            <div class="text-2xl" style="font-family: OPPOSans-B;">设置</div>
        </div> -->

        <div>
            <div class="text-lg select-none cursor-default">地图显示</div>

            <div class="ml-2">
                <div class="flex justify-between">
                    <div>启用</div>
                    <t-switch v-model="settingsInput.map.enabled" />
                </div>

                <div class="flex justify-between">
                    <div>展示数据类型</div>

                    <t-select size="small" v-model="settingsInput.map.type" class="max-w-48">
                        <t-option key="intensity" label="烈度(CSIS)" value="intensity" />
                        <t-option key="shindo" label="震度(JMA)" value="shindo" />
                        <t-option key="pga" label="峰值加速度(PGA)" value="pga" />
                    </t-select>
                </div>
            </div>

            <div class="absolute bottom-2 right-2 flex">
                <t-button theme="default" @click="saveSettings()">保存并退出</t-button>

                <div class="ml-2">
                    <t-button @click="cancelSettings()">取消</t-button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { appWindow, LogicalSize } from '@tauri-apps/api/window'
import maplibre from 'maplibre-gl'
import { onEventShowMenu, showMenu } from 'tauri-plugin-context-menu'
import 'maplibre-gl/dist/maplibre-gl.css'

import { map, map2, DATA, settings } from './utils/store'

import MapView from './components/view/MapView.vue'
import Wave from './components/view/Wave.vue'
import BottomRightContainer from './components/view/BottomRightContainer.vue'

import DataWorker from './components/worker/DataWorker.vue'

const isShowSettings = ref(false)
const isSettingsLoaded = ref(false)

const settingsInput = reactive({
    map: {
        enabled: true,
        type: 'intensity'
    }
})

const saveSettings = async () => {
    await changeWindowSize()

    settings.map.enabled = settingsInput.map.enabled
    settings.map.type = settingsInput.map.type as 'intensity' | 'shindo' | 'pga'

    localStorage.setItem('settings', JSON.stringify(settings))

    isShowSettings.value = false
}

const cancelSettings = () => {
    isShowSettings.value = false

    settingsInput.map.enabled = settings.map.enabled
    settingsInput.map.type = settings.map.type
}

const initSettings = () => {
    if (!localStorage.getItem('settings')) {
        localStorage.setItem('settings', JSON.stringify(settings))
        isSettingsLoaded.value = true
        return
    }

    if (JSON.parse(localStorage.getItem('settings')!).map.enabled !== undefined) {
        settings.map.enabled = JSON.parse(localStorage.getItem('settings')!).map.enabled
    } else {
        settings.map.enabled = true
    }

    if (JSON.parse(localStorage.getItem('settings')!).map.type) {
        settings.map.type = JSON.parse(localStorage.getItem('settings')!).map.type
    } else {
        settings.map.type = 'intensity'
    }

    isSettingsLoaded.value = true
}

onMounted(() => {
    // document.addEventListener('contextmenu', event => event.preventDefault())

    initSettings()

    settingsInput.map.enabled = settings.map.enabled
    settingsInput.map.type = settings.map.type

    /* document.addEventListener('contextmenu', async e => {
        e.preventDefault()

        showMenu({
            pos: {
                x: e.clientX,
                y: e.clientY
            },
            items: isShowSettings.value ? [
                {
                    label: '重载',
                    shortcut: 'cmd_or_ctrl+r',
                    event: () => {
                        location.reload()
                    }
                }
            ] : [
                {
                    label: '设置',
                    event: () => {
                        isShowSettings.value = true
                    }
                },
                {
                    is_separator: true
                },
                {
                    label: '重载',
                    shortcut: 'cmd_or_ctrl+r',
                    event: () => {
                        location.reload()
                    }
                }
            ]
        })
    }) */

    if (settings.map.enabled) {
        appWindow.setSize(new LogicalSize(900, 540))
        appWindow.setMinSize(new LogicalSize(900, 540))
    } else {
        appWindow.setSize(new LogicalSize(315, 540))
        appWindow.setMinSize(new LogicalSize(315, 540))
    }
})

const changeWindowSize = async () => {
    if (settingsInput.map.enabled) {
        appWindow.setSize(new LogicalSize(900, 540))
        appWindow.setMinSize(new LogicalSize(900, 540))

        await new Promise(resolve => setTimeout(resolve, 100))

        let i = 0

        const interval = setInterval(() => {
            for (const name in DATA.wolfx.chartList) {
                DATA.wolfx.chartList[name].chart.resize()
            }

            map.value.fitBounds([[136.0765, 55.33], [72.4951, 15.58]], { animate: false })
            map2.value.fitBounds([[122.56, 23.74], [107.15, 2.68]], { animate: false })

            i += 10

            if (i === 1000) clearInterval(interval)
        }, 10)
    } else {
        appWindow.setSize(new LogicalSize(315, 540))
        appWindow.setMinSize(new LogicalSize(315, 540))

        for (const name in DATA.wolfx.chartList) {
            DATA.wolfx.chartList[name].chart.resize()
        }
    }
}

// watch(() => settings.map.enabled, () => {
//     changeWindowSize()
// })
</script>

<style>
@import url(./css/global.css);
</style>
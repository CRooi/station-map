<template>
    <div class="relative w-[65%] float-left">
        <div class="w-full min-h-screen max-h-screen" id="map">
        </div>

        <div class="shadow-lg bg-[#242424] border border-[#485053] rounded-lg absolute bottom-2 left-2 w-[20%] h-[25%]">
            <div class="w-full h-full" id="map2"></div>
            <div class="absolute bottom-0 right-1 text-sm select-none cursor-default">南海诸岛</div>
        </div>

        <BottomRightContainer class="absolute bottom-2 right-2 select-none cursor-default" />
    </div>

    <div class="select-none cursor-pointer float-left max-h-screen w-[35%] p-1 overflow-hidden overflow-y-auto">
        <Wave v-if="JSON.stringify(DATA.wolfx.list) !== '{}'" />
    </div>

    <MapView />

    <DataWorker />
</template>

<script setup lang="ts">
import maplibre from 'maplibre-gl'
import 'maplibre-gl/dist/maplibre-gl.css'

import { DATA } from './utils/store'

import MapView from './components/view/MapView.vue'
import Wave from './components/view/Wave.vue'

import DataWorker from './components/worker/DataWorker.vue'
import BottomRightContainer from './components/view/BottomRightContainer.vue'
</script>

<style>
@import url(./css/global.css);
</style>
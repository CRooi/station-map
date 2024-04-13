<template>
</template>

<script setup lang="ts">
import maplibre from 'maplibre-gl'
import axios from 'axios'

import { map, map2 } from '../../utils/store'

onMounted(async () => {
    map.value = new maplibre.Map({
        container: 'map',
        style: '',
        center: [107.79942839007867, 37.093496518166944],
        zoom: 2,
        dragPan: false,
        dragRotate: false,
        scrollZoom: false,
        boxZoom: false,
        touchZoomRotate: false,
        doubleClickZoom: false,
        pitchWithRotate: false
    })

    map.value.addSource('china', {
        type: 'geojson',
        data: (await axios.get('./resources/geojson/china.json')).data
    })

    map.value.addLayer({
        id: 'china-fill',
        type: 'fill',
        source: 'china',
        paint: {
            'fill-color': '#222'
        }
    })

    map.value.addLayer({
        id: 'china-line',
        type: 'line',
        source: 'china',
        paint: {
            'line-color': '#ADB8C0',
            'line-width': 0.8
        }
    })

    map2.value = new maplibre.Map({
        container: 'map2',
        style: '',
        center: [107.79942839007867, 37.093496518166944],
        zoom: 2,
        dragPan: false,
        dragRotate: false,
        scrollZoom: false,
        boxZoom: false,
        touchZoomRotate: false,
        doubleClickZoom: false,
        pitchWithRotate: false
    })

    map2.value.addSource('china', {
        type: 'geojson',
        data: (await axios.get('./resources/geojson/china.json')).data
    })

    map2.value.addLayer({
        id: 'china-fill',
        type: 'fill',
        source: 'china',
        paint: {
            'fill-color': '#222'
        }
    })

    map2.value.addLayer({
        id: 'china-line',
        type: 'line',
        source: 'china',
        paint: {
            'line-color': '#ADB8C0',
            'line-width': 0.8
        }
    })

    fitChinaMainlandBounds()
    fitSouthChinaSeaBounds()

    window.addEventListener('resize', () => {
        fitChinaMainlandBounds()
        fitSouthChinaSeaBounds()

        let i = 0

        const interval = setInterval(() => {
            fitChinaMainlandBounds()
            fitSouthChinaSeaBounds()
            i += 10

            if (i === 1000) clearInterval(interval)
        }, 10)
    })
})

onBeforeUnmount(() => {
    map.value.remove()
    map2.value.remove()

    window.removeEventListener('resize', () => {
        fitChinaMainlandBounds()
        fitSouthChinaSeaBounds()
    })
})

const fitChinaMainlandBounds = () => {
    map.value.fitBounds([[136.0765, 55.33], [72.4951, 15.58]], { animate: false })
}

const fitSouthChinaSeaBounds = () => {
    map2.value.fitBounds([[122.56, 23.74], [107.15, 2.68]], { animate: false })
}
</script>

<style>

</style>
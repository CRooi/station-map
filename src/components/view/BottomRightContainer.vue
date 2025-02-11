<template>
    <div id="bottom-right-container">
        <LevelBar />

        <Time />
    </div>
</template>

<script setup lang="ts">
import LevelBar from './LevelBar.vue'
import Time from './Time.vue'
</script>

<style>
#bottom-right-container {
    z-index: 998;
}
</style>
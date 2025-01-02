<template>
    <div>{{ DATA.time.replace(/-/g, '/') }}</div>
</template>

<script setup lang="ts">
import { DATA } from '../../utils/store'
</script>

<style></style>
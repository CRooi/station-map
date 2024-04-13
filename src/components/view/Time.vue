<template>
    {{ DATA.time.replace(/-/g, '/') }}
</template>

<script setup lang="ts">
import { DATA } from '../../utils/store'
</script>

<style>

</style>
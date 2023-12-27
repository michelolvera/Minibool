<script setup lang="ts">
import untypedLangData from '../../assets/strings/lang.json'
import AuthNavbarComponent from "../elements/AuthNavbarComponent.vue";

const langData: {[key: string]: any} = untypedLangData
defineProps<{ currentLang: string }>()
</script>

<template>
<auth-navbar-component :current-lang=currentLang />
</template>

<style scoped>

</style>
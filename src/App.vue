<script setup lang="ts">

import {ref} from "vue";
import { getCookie, setCookie } from './utils/utils'

let currentLang = ref(getCookie("lang"))

if (currentLang.value == ''){
  currentLang.value = "en-US"
  setCookie("lang", currentLang.value, 30);
}

function changeLangCookie(event: Event){
  currentLang.value = (event.target as HTMLSelectElement).value
  setCookie("lang", currentLang.value, 30);
}

</script>

<template>
  <RouterView v-slot="{ Component }">
    <component
        :is="Component"
        :current-lang=currentLang
        @change-lang=changeLangCookie
    />
  </RouterView>
</template>

<style scoped>

</style>

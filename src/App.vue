<script setup lang="ts">

import {ref} from "vue";

let currentLang = ref(getCookie("lang"))

if (currentLang.value == ''){
  currentLang.value = "en-US"
  setCookie("lang", currentLang.value, 30);
}

function setCookie(cname, cvalue, exdays) {
  if (exdays != 0) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
  } else
    document.cookie = cname + "=" + cvalue + ";path=/";
}

function getCookie(cname): string {
  var name = cname + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(';');
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

function changeLangCookie(event){
  currentLang.value = event.target.value
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

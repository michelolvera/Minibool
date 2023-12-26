<script setup lang="ts">
import AboutModalComponent from "./AboutModalComponent.vue"
import untypedLangData from '../../assets/strings/lang.json'

defineProps<{ currentLang: string }>()
const langData: {[key: string]: any} = untypedLangData
</script>

<template>
  <nav class="navbar navbar-expand-lg fixed-top navbar-dark bg-dark">
    <div class="container-fluid">
      <a class="navbar-brand" href="/">
        <img src="../../assets/imgs/logo-blanco.svg" alt="Logo" style="max-width: 100%; width: 70px;">
      </a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse d-flex justify-content-end" id="navbarNavAltMarkup">
        <div class="navbar-nav">
          <a class="nav-link" href="#" data-bs-toggle="modal" data-bs-target="#vntn_acercade">{{langData[currentLang]['AcercaDe']}}</a>
        </div>
      </div>
    </div>
  </nav>
  <about-modal-component :current-lang=currentLang />
</template>

<style scoped>

</style>
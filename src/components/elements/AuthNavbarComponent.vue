<script setup lang="ts">
import AboutModalComponent from "./AboutModalComponent.vue"
import untypedLangData from '../../assets/strings/lang.json'
import { getCookie } from '../../utils/utils'
import RankingModalComponent from "./RankingModalComponent.vue"
import axios from "axios"
import {ref} from "vue"

defineProps<{ currentLang: string }>()
const langData: {[key: string]: any} = untypedLangData
const rankingData = ref([])
const notificationsCount = ref(0)

let response = axios.get('/.netlify/functions/count-notifications');
response.then(responseData => {
  if (responseData.status == 200){
    notificationsCount.value = responseData.data.count
  }
})

async function updateRankingData(event: Event){
  let response = await axios.get('/.netlify/functions/ranking')

  if (response.status == 200){
    rankingData.value = response.data
  }
}
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
      <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div class="navbar-nav d-flex w-100">
          <div class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              {{langData[currentLang]['Ejercicios']}}
            </a>
            <ul class="dropdown-menu">
              <li><a class="dropdown-item" href="#">{{langData[currentLang]['Aleatorio']}}</a></li>
              <li><a class="dropdown-item" href="#">{{langData[currentLang]['Conocido']}}</a></li>
            </ul>
          </div>
          <a class="nav-link" href="#" data-bs-toggle="modal" data-bs-target="#vntn_ranking" @click="updateRankingData">{{langData[currentLang]['Clasificacion']}}</a>
          <a class="nav-link" href="/estadisticas">{{langData[currentLang]['Estadisticas']}}</a>
          <div class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              {{langData[currentLang]['Administración']}}
            </a>
            <ul class="dropdown-menu">
              <li><a class="dropdown-item" href="#">{{langData[currentLang]['Ponderacion']}}</a></li>
              <li><a class="dropdown-item" href="#">{{langData[currentLang]['Notificacion']}}</a></li>
              <li><a class="dropdown-item" href="#">{{langData[currentLang]['Usuarios']}}</a></li>
            </ul>
          </div>
          <a class="nav-link ms-auto" href="#" data-bs-toggle="modal" data-bs-target="#vntn_acercade">{{langData[currentLang]['AcercaDe']}}</a>
          <a class="nav-link" href="#" data-bs-toggle="modal" data-bs-target="#vntn_acercade">{{langData[currentLang]['Notificacion']}}<span class="badge bg-secondary ms-1">{{notificationsCount}}</span></a>
          <div class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              {{langData[currentLang]['Usuario'] + ': ' + getCookie("user")}}
            </a>
            <ul class="dropdown-menu dropdown-menu-end">
              <li><a class="dropdown-item" href="#">{{langData[currentLang]['ConfigurarCuenta']}}</a></li>
              <li><a class="dropdown-item" href="#">{{langData[currentLang]['MisResultados']}}</a></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </nav>
  <about-modal-component :current-lang=currentLang />
  <ranking-modal-component :current-lang=currentLang :ranking-data=rankingData />
</template>

<style scoped>

</style>
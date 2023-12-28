<script setup lang="ts">
import NoAuthNavbarComponent from "../elements/NoAuthNavbarComponent.vue"
import untypedLangData from '../../assets/strings/lang.json'
import { getCookie, setCookie } from '../../utils/utils'
import axios from "axios"
import router from "../../router.ts";
import {ref} from "vue";

const langData: {[key: string]: any} = untypedLangData
defineProps<{ currentLang: string }>()

let countriesData = ref([])


axios.get("https://restcountries.com/v3.1/all?fields=name,cca2").then((response) => {
  let countries = response.data
  countries.sort((a: {name: {common: string}}, b: {name: {common: string}}) => a.name.common.toLowerCase().localeCompare(b.name.common.toLowerCase()))
  countriesData.value = countries
})

async function validateLogin(event: Event){
  let submitEvent = event as SubmitEvent
  submitEvent.preventDefault();

  let user = (document.getElementById('userInput') as HTMLInputElement).value
  let password = (document.getElementById('passwordInput') as HTMLInputElement).value
  let remember = (document.getElementById('checkRememberPass') as HTMLInputElement).value == 'on'

  let response = await requestLogin(user, password);

  if (response.status == 204){
    setCookie("user", user, remember ? 30 : 0)
    setCookie("pass", password, remember ? 30 : 0)
    await router.push('home')
  }
}

async function requestLogin(user: string, password: string){
  let apiURL = '/.netlify/functions/login'
  let response = await axios.post(apiURL, {user: user, password: password})

  return response
}

if (getCookie("user") != "" && getCookie("pass") != ""){
  let response = requestLogin(getCookie("user"), getCookie("pass"));
  response.then(responseData => {
    if (responseData.status == 204){
      router.push("home")
    }
  })
}
</script>

<template>
  <no-auth-navbar-component :current-lang=currentLang />
  <form class="container">
    <div class="row">
      <div class="col-12">
        <h2 class="h2 mb-3 font-weight-normal">{{langData[currentLang]['NuevaCuenta']}}</h2>
      </div>
    </div>
    <div class="row">
      <div class="col-sm-12 col-md-6">
        <label for="userInput" class="form-label"><strong>{{langData[currentLang]['Usuario']}}</strong></label>
        <input type="text" class="form-control" id="userInput" :placeholder="langData[currentLang]['UsuarioRequisitos']">
      </div>
      <div class="col-sm-12 col-md-6">
        <label for="nameInput" class="form-label"><strong>{{langData[currentLang]['Nombre']}}</strong></label>
        <input type="text" class="form-control" id="nameInput" :placeholder="langData[currentLang]['NombreCompleto']">
      </div>
    </div>
    <div class="row mt-3">
      <div class="col-sm-12 col-md-6">
        <label for="lastNameInput" class="form-label"><strong>{{langData[currentLang]['ApellidoPaterno']}}</strong></label>
        <input type="text" class="form-control" id="lastNameInput" :placeholder="langData[currentLang]['ApellidoPaternoRequisitos']">
      </div>
      <div class="col-sm-12 col-md-6">
        <label for="secondLastNameInput" class="form-label"><strong>{{langData[currentLang]['ApellidoMaterno']}}</strong></label>
        <input type="text" class="form-control" id="secondLastNameInput" :placeholder="langData[currentLang]['ApellidoMaternoRequisitos']">
      </div>
    </div>
    <div class="row mt-3">
      <div class="col-sm-12 col-md-6">
        <label for="emailInput" class="form-label"><strong>{{langData[currentLang]['CorreoElectronico']}}</strong></label>
        <input type="text" class="form-control" id="emailInput" :placeholder="langData[currentLang]['CorreoElectronico']">
      </div>
      <div class="col-sm-12 col-md-6">
        <label for="passwordInput" class="form-label"><strong>{{langData[currentLang]['Pass']}}</strong></label>
        <input type="password" class="form-control" id="passwordInput" :placeholder="langData[currentLang]['RequisitosPass']">
      </div>
    </div>
    <div class="row mt-3">
      <div class="col-sm-12 col-md-6">
        <label for="countrySelect" class="form-label"><strong>{{langData[currentLang]['Pais']}}</strong></label>
        <select id="countrySelect" class="form-select">
          <option v-for="country in countriesData" :value="country['cca2']" :selected="country['cca2'] == 'MX'">{{country['name']['common']}}</option>
        </select>
      </div>
      <div class="col-sm-12 col-md-6">
        <label for="passwordInput" class="form-label"><strong>{{langData[currentLang]['EstudiantePregunta']}}</strong></label>
        <div class="form-check">
          <input class="form-check-input" type="radio" name="studentRadio" id="studentRadio1">
          <label class="form-check-label" for="studentRadio1">
            {{langData[currentLang]['Si']}}
          </label>
        </div>
        <div class="form-check">
          <input class="form-check-input" type="radio" name="studentRadio" id="studentRadio2">
          <label class="form-check-label" for="studentRadio2">
            {{langData[currentLang]['No']}}
          </label>
        </div>
      </div>
    </div>
  </form>
</template>

<style scoped>
form{
  margin-top: 4em;
}
</style>
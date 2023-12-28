<script setup lang="ts">
import NoAuthNavbarComponent from "../elements/NoAuthNavbarComponent.vue"
import untypedLangData from '../../assets/strings/lang.json'
import { getCookie, setCookie } from '../../utils/utils'
import axios from "axios"
import router from "../../router.ts";

const langData: {[key: string]: any} = untypedLangData
defineProps<{ currentLang: string }>()

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

  <div id="contenedorLogin" class="container">
    <div class="col-12">
      <form @submit="validateLogin">
        <h2 class="h2 mb-3 font-weight-normal">{{langData[currentLang]['tituloLogin']}}</h2>
        <div class="mb-3">
          <input id="userInput" type="text" class="form-control" name="user" required :placeholder="langData[currentLang]['Usuario']">
        </div>
        <div class="mb-3">
          <input id="passwordInput" type="password" class="form-control" name="password" required :placeholder="langData[currentLang]['Pass']">
        </div>
        <div class="mb-3 form-check">
          <input type="checkbox" name="remember" class="form-check-input" id="checkRememberPass">
          <label class="form-check-label" for="checkRememberPass">{{langData[currentLang]['RecordarPass']}}</label>
        </div>
        <div class="d-grid">
          <button type="submit" class="btn btn-lg btn-outline-success">{{langData[currentLang]['IniciarSesion']}}</button>
        </div>
      </form>
    </div>
    <div class="col-12 mt-1">
      <p>
        <a href="/register/password-recovery">{{langData[currentLang]['OlvidastePass']}}</a>
      </p>
    </div>
    <div class="col-12 mt-4">
      <p>
        <label id="lb_no_cuenta">{{langData[currentLang]['SinCuenta']}}</label>
        <br>
        <a href="/register">{{langData[currentLang]['CreaCuenta']}}</a>
      </p>
    </div>
    <div class="col-12 mt-4">
      <p>{{langData[currentLang]['Idioma']}}</p>
      <select class="form-select" :aria-label="langData[currentLang]['Idioma']" @change="$emit('changeLang', $event)">
        <option
            v-for="languajeKey in Object.keys(langData)"
            :value=languajeKey
            :selected="languajeKey == currentLang">
          {{langData[languajeKey]['nombreIdioma']}}
        </option>
      </select>
    </div>
  </div>
</template>

<style scoped>
#contenedorLogin{
  margin-top: 4em;
  max-width: 360px;
}
</style>
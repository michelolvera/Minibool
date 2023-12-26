<script setup lang="ts">
import NoAuthNavbarComponent from "../elements/NoAuthNavbarComponent.vue"
import untypedLangData from '../../assets/strings/lang.json'

const langData: {[key: string]: any} = untypedLangData
defineProps<{ currentLang: string }>()
</script>

<template>
  <no-auth-navbar-component :current-lang=currentLang />

  <div id="contenedorLogin" class="container">
    <div class="col-12">
      <form>
        <h2 class="h2 mb-3 font-weight-normal">{{langData[currentLang]['tituloLogin']}}</h2>
        <div class="mb-3">
          <input type="email" class="form-control" :placeholder="langData[currentLang]['Usuario']">
        </div>
        <div class="mb-3">
          <input type="password" class="form-control" :placeholder="langData[currentLang]['Pass']">
        </div>
        <div class="mb-3 form-check">
          <input type="checkbox" class="form-check-input" id="checkRememberPass">
          <label class="form-check-label" for="checkRememberPass">{{langData[currentLang]['RecordarPass']}}</label>
        </div>
        <div class="d-grid">
          <button type="submit" class="btn btn-lg btn-outline-success">{{langData[currentLang]['IniciarSesion']}}</button>
        </div>
      </form>
    </div>
    <div class="col-12 mt-1">
      <p>
        <a href="/registro/recuperarpass">{{langData[currentLang]['OlvidastePass']}}</a>
      </p>
    </div>
    <div class="col-12 mt-4">
      <p>
        <label id="lb_no_cuenta">{{langData[currentLang]['SinCuenta']}}</label>
        <br>
        <a href="/registro">{{langData[currentLang]['CreaCuenta']}}</a>
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
<script setup lang="ts">
import untypedLangData from '../../assets/strings/lang.json'

defineProps<{ currentLang: string }>()
const langData: {[key: string]: any} = untypedLangData
</script>

<template>
  <div class="modal fade" tabindex="-1" id="vntn_acercade">
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">{{langData[currentLang]['AcercaDe']}}</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body text-center">
          <p><img src="../../assets/imgs/logo-negro.svg" alt="Logo"></p>
          <p>{{langData[currentLang]['Descripcion']}}</p>
          <p><strong>{{langData[currentLang]['ProfColab']}}</strong></p>
          <p>
            <img class="img-thumbnail mx-auto d-block" style="width: 120px; height: 150px;" src="../../assets/imgs/profesores/erendira.jpg">
            <a href="mailto:emjimenezh@gmail.com">DR (C). ERÉNDIRA MIRIAM JIMÉNEZ HERNÁNDEZ</a><br>
            <span style="white-space: pre-line;">{{langData[currentLang]['MiriamDesc']}}</span>
          </p>
          <p>
            <img class="img-thumbnail mx-auto d-block" style="width: 120px; height: 150px;" src="../../assets/imgs/profesores/josealfredo.jpg">
            <a href="mailto:jjimenez@itmorelia.edu.mx">M.C. JOSE ALFREDO JIMÉNEZ MURILLO</a><br>
            <span style="white-space: pre-line;">{{langData[currentLang]['JoseDesc']}}</span>
          </p>
          <p>
            <img class="img-thumbnail mx-auto d-block" style="width: 120px; height: 150px;" src="../../assets/imgs/profesores/Hanna.jpg">
            <a href="#">DRA. HANNA OKTABA</a><br>
            <span style="white-space: pre-line;">{{langData[currentLang]['HannaDesc']}}</span>
          </p>
          <p>
            <img class="img-thumbnail mx-auto d-block" style="width: 120px; height: 150px;" src="../../assets/imgs/profesores/frida.jpg">
            <a href="#">DRA. FRIDA DÍAZ BARRIGA ARCEO</a><br>
            <span style="white-space: pre-line;">{{langData[currentLang]['FridaDesc']}}</span>
          </p>
          <p>
            <img class="img-thumbnail mx-auto d-block" style="width: 120px; height: 150px;" src="../../assets/imgs/profesores/Mario.jpg">
            <a href="#">DR. MARIO PIATTINI</a><br>
            <span style="white-space: pre-line;">{{langData[currentLang]['MarioDesc']}}</span>
          </p>
          <p>
            <img class="img-thumbnail mx-auto d-block" style="width: 120px; height: 150px;" src="../../assets/imgs/profesores/octavio.jpg">
            <a href="mailto:octavioortiz@itmorelia.edu.mx">DR. OCTAVIO SALUD ORTIZ ORTIZ</a><br>
            <span style="white-space: pre-line;">{{langData[currentLang]['OctavioDesc']}}</span>
          </p>
          <p>
            <img class="img-thumbnail mx-auto d-block" style="width: 120px; height: 150px;" src="../../assets/imgs/profesores/Nelly.jpg">
            <a href="mailto:alvarado@itmorelia.edu.mx">M.A. LAURA NELLY ALVARADO ZAMORA</a><br>
            <span style="white-space: pre-line;">{{langData[currentLang]['NellyDesc']}}</span>
          </p>
          <p><strong>{{langData[currentLang]['Desarrolladores']}}</strong></p>
          <p><img class="img-thumbnail mx-auto d-block" style="width: 120px; height: 150px;" src="../../assets/imgs/desarrolladores/jlaa.jpg">
            <a href="mailto:coke_1224@hotmail.com">JORGE LUIS ARREYGUE ÁVILA</a> <strong>(UI, UX, Parser)</strong><br>
            <span>{{langData[currentLang]['DescJorge']}}</span>
          </p>
          <p>
            <img class="img-thumbnail mx-auto d-block" style="width: 150px; height: 150px;" src="../../assets/imgs/desarrolladores/meop.png">
            <a href="https://www.linkedin.com/in/michelolvera/">MICHEL ENRIQUE OLVERA PEREZ</a> <strong>(UI, UX, Quine–McCluskey, Petrick)</strong><br>
            <span>{{langData[currentLang]['DescMichel']}}</span>
          </p>
          <p>
            <img class="img-thumbnail mx-auto d-block" style="width: 120px; height: 150px;" src="../../assets/imgs/desarrolladores/acrv.png">
            <a href="mailto:alan.cruzrv@gmail.com/">ALAN CRUZ ROBLES VAZQUEZ</a> <strong>(UI, UX, DB, Security)</strong><br>
            <span>{{langData[currentLang]['DescAlan']}}</span>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
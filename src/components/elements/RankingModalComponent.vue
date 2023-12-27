<script setup lang="ts">
import untypedLangData from '../../assets/strings/lang.json'

defineProps<{ currentLang: string, rankingData: Array<{nombre_completo: string, total: string}>}>()
const langData: {[key: string]: any} = untypedLangData
</script>

<template>
  <div class="modal fade" tabindex="-1" id="vntn_ranking">
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">{{langData[currentLang]['Clasificacion']}}</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body text-center">
          <div class="container">
            <div class="row" v-for="ranking in rankingData">
              <div class="col-9">
                <div class="alert alert-info" role="alert">
                  {{ranking.nombre_completo}}
                </div>
              </div>
              <div class="col-3">
                <div class="alert alert-info" role="alert">
                  {{ranking.total}}
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
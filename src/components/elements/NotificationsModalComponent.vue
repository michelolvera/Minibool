<script setup lang="ts">
import untypedLangData from '../../assets/strings/lang.json'

defineProps<{ currentLang: string, notifications: Array<{id: string, notificacion: string, fecha: string, tipo: string}>}>()
const langData: {[key: string]: any} = untypedLangData
</script>

<template>
  <div class="modal fade" tabindex="-1" id="vntn_notifications">
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">{{langData[currentLang]['Clasificacion']}}</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <div class="container">
            <div class="row" v-for="notification in notifications">
              <div class="col-12">
                <div class="alert" :class="'alert-'+notification.tipo" role="alert">
                  {{notification.notificacion}}
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
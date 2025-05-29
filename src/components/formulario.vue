<template>
  <el-drawer v-model="drawerStore.showDrawer" title="Modulo" :with-header="false">
    <div class="container">
    <span>Modulo: Nuevo {{ drawerTitle }}</span>
    <div class="buttons">
      <el-button style="margin-left: 5px;">Cancelar</el-button>
      <el-button 
      style="
      background-color: #8000ff;
      color: aliceblue;
      "
      >{{ drawerTitle }}
    </el-button>
    </div>
    </div>

    <el-main class="main-content">
      <keep-alive>
          <slot name="slotForm_drawer"></slot>
      </keep-alive>
    </el-main>
  </el-drawer>
</template>

<script setup lang="ts">
import {useDrawerStore} from '@/components/stores/useDrawerStore'
import { ref } from 'vue'

const drawerStore = useDrawerStore()

defineProps({
  drawerTitle: String,
})



</script>

<style scoped>
.el-drawer .el-button{
  color: rgb(0, 0, 0);
}
.container{
  text-align: center;
}
.buttons{
  margin-top: 5px;
}

</style>
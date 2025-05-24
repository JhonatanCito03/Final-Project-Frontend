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
      >Crear {{ drawerTitle }}</el-button>
    </div>
    </div>
    <keep-alive>
    <el-main class="main-content">
                <slot name="slotForm_drawer"></slot>
    </el-main>
    </keep-alive>
  </el-drawer>
  
</template>

<script setup>
import {useDrawerStore} from '@/components/stores/useDrawerStore'
const drawerStore = useDrawerStore()
const propiedad = defineProps({
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
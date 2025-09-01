<template>
  <el-drawer v-model="drawerStore.showDrawer" title="Modulo" :with-header="false">
    <div class="container">
    <h1>Modulo de: {{ drawerTitle }}</h1>
    <h1>***************************************</h1>
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
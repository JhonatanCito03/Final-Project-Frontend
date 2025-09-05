<template>
      <el-menu 
      :default-active="$route.path"
      router
      class="el-menu-vertical-demo"
      background-color="#13161c"
      text-color="white"
        >
      <!--- Esta es la parte correspondiente a el primer sidebar ---->
      <el-sub-menu index="0">
          <template #title>
            <el-icon><Histogram /></el-icon>
            <span>Gestion de metas</span>
          </template>

          <el-sub-menu index="0-1">
            <template #title>
            <span><el-icon><User /></el-icon>Progreso</span>
            </template>
            <el-menu-item index="/metas"><el-icon><Money/></el-icon>Gestion de cumplimiento</el-menu-item>
            <el-menu-item index="/tablaGeneral"><el-icon><Money/></el-icon>Tabla de ejecucion</el-menu-item>
          </el-sub-menu>

          <el-sub-menu index="0-2">
            <template #title>
            <span><el-icon><Place/></el-icon>Creacion</span>
            </template>
            <el-menu-item index="/nuevo_valor"><el-icon><connection/></el-icon>Registrar meta global (Presidente)</el-menu-item>
            <el-menu-item index="/registro_ejecucion"><el-icon><Money/></el-icon>Registrar nueva ejecucion</el-menu-item>
          </el-sub-menu>


        </el-sub-menu>


        <el-sub-menu index="1">
          <template #title>
            <el-icon><User /></el-icon>
            <span>Contacto</span>
          </template>

          <el-sub-menu index="1-1">
            <template #title>
            <el-icon></el-icon>
            <span>Información</span>
            </template>
            <el-menu-item index="Empleados">Empleados</el-menu-item>
            <el-menu-item index="Paises">Paises</el-menu-item>
            <el-menu-item index="Regiones">Departamentos</el-menu-item>
            <el-menu-item index="Municipios">Municipios</el-menu-item>
            <el-menu-item index="Oficinas">Oficinas</el-menu-item>
          </el-sub-menu>
        </el-sub-menu>


        <el-sub-menu index="2">
          <template #title>
            <el-icon><DataLine /></el-icon>
            <span>Rankign</span>
          </template>

          <el-sub-menu index="2-1">
            <template #title>
              <el-icon><List /></el-icon>
            <span>Sistema de ranking general</span>
            </template>
            <el-menu-item index="r_empleados"><el-icon><Search /></el-icon>Ranking Empleados</el-menu-item>
           </el-sub-menu>
        </el-sub-menu>


        <el-sub-menu index="3">
          <template #title>
            <el-icon><Tools /></el-icon>
            <span>Herramientas</span>
          </template>

          <el-sub-menu index="3-1">
            <template #title>
              <el-icon><EditPen /></el-icon>
            <span>Gestion de versiones</span>
            </template>
            <el-menu-item index="versions"><el-icon><Crop /></el-icon>Gestion de versiones</el-menu-item>
          </el-sub-menu>
        </el-sub-menu>
      </el-menu>
</template>

<script lang="ts" setup>
import {User,DataLine,List,Search,Tools,EditPen,Crop,Histogram,Stamp,Connection,Money,Place} from '@element-plus/icons-vue'
import userInfo from '../../userInfo'

console.log('user info: ', userInfo.userInfo)

</script>

<style scoped>
html, body{
  margin: 0;
  padding: 0;
}
.el-menu-vertical-demo{
  margin-top: 20px;
  background-color: #13161c;
  width: fit-content;
  min-height: 90%;
  border-color: #8000ff;
}
</style>
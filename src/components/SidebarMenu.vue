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
            <span>Estadisticas</span>
          </template>

          <el-sub-menu index="0-1">
            <template #title>
            <span><el-icon><User /></el-icon>Personales</span>
            </template>
            <el-menu-item index="/metas?captacion_index"><el-icon><Money/></el-icon>Metas de captación</el-menu-item>
            <el-menu-item index="/metas?colocacion_index"><el-icon><Connection/></el-icon>Metas de colocación</el-menu-item>
            <el-menu-item index="/metas?mixtas_index"><el-icon><Stamp/></el-icon> Metas clasificación mixta</el-menu-item>
          </el-sub-menu>

          <el-sub-menu index="0-2">
            <template #title>
            <span><el-icon><Place/></el-icon>Generales</span>
            </template>
            <el-menu-item index="/"><el-icon><Money/></el-icon>Metas de captación nivel.{{ userInfo.userInfo.region }}</el-menu-item>
            <el-menu-item index="/"><el-icon><Connection/></el-icon>Metas de colocación nivel.{{ userInfo.userInfo.region }}</el-menu-item>
            <el-menu-item index="/"><el-icon><Stamp/></el-icon> Metas clasificación mixta nivel.{{ userInfo.userInfo.region }}</el-menu-item>
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
            <el-menu-item index="Regiones">Regiones</el-menu-item>
            <el-menu-item index="Departamentos">Departamentos</el-menu-item>
            <el-menu-item index="Departamentos">Municipios</el-menu-item>
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
            <el-menu-item index="Cargos"><el-icon><Search /></el-icon>Ranking Cargos</el-menu-item>
            <el-menu-item index="Paises"><el-icon><Search /></el-icon>Ranking Paises</el-menu-item>
            <el-menu-item index="Regiones"><el-icon><Search /></el-icon>Ranking Regiones</el-menu-item>
            <el-menu-item index="Departamentos"><el-icon><Search /></el-icon>Ranking Departamentos</el-menu-item>
            <el-menu-item index="Oficinas"><el-icon><Search /></el-icon>Ranking Oficinas</el-menu-item>
            <el-menu-item index="Municipios"><el-icon><Search /></el-icon>Ranking Municipios</el-menu-item>
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
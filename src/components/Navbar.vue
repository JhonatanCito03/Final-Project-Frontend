<template>
    <el-menu
      :default-active="activeIndex"
      text-color="white"
      class="el-menu-demo"
      mode="horizontal"
      :ellipsis="false"
      @select="handleSelect"
    >
    
        
        <router-link to="/">
          <img 
          src="../../Images/TrueMaster_Logo.jpg" 
          alt="Logo TrueMaster"
          />
        </router-link>
          

      <h1 style="color: white; display: flex; justify-content: center; align-items: center; margin-right:auto; margin-left: auto;">TrueMaster</h1>
      <el-sub-menu index="1">
        <template #title><el-icon><user/></el-icon>Jhonatan Montoya</template>
        <el-menu-item id="navbarIcon1" index="2-1"><el-icon><user/></el-icon>Perfil</el-menu-item>
        <el-menu-item id="navbarIcon2" index="2-2"><el-icon><BellFilled/></el-icon>Reporte de bugs</el-menu-item>
        <el-menu-item id="navbarIcon3" index="2-3" ><el-icon><Close/></el-icon>Cerrar Sesión</el-menu-item>
      </el-sub-menu>
    </el-menu>
  </template>
  
  <script lang="ts" setup>
  import { ref } from 'vue'
 import { Menu as IconMenu, User, BellFilled, Close} from '@element-plus/icons-vue'
import { RouterView } from 'vue-router'

  const activeIndex = ref('1')
  const handleSelect = (key: string, keyPath: string[]) => {
    console.log(key, keyPath)
  }
  </script>
  <style scoped>
  img{
    width: 100px;
    height: 80px;
    background-color: #101113;
    transition: ease-in .4s;
  }
  img:hover{
    transition: ease-in .4s;
    transform: scale(0.8);
    width: 100px;
    height: 80px;
    border-radius: 10px;
  }
  .el-menu-demo{
    background-color: #13161c;
    border-color: rgb(89, 0, 255);
    top: 0;
    height: fit-content;
    z-index: 10;
  }
  .el-menu-demo:hover{
    transition:cubic-bezier(0.6, -0.28, 0.735, 0.045);
    animation: reverse;
    -webkit-animation: reverse;
    background-color: #101113;
    top: 0;
    height: fit-content;
  }

  #navbarIcon1 {
  background-color: #13161c;
  }

  #navbarIcon2 {
  background-color: #13161c;
  }

  #navbarIcon3 {
  background-color: #13161c;
  }


  .el-menu--horizontal > .el-menu-item:nth-child(1) {
  margin-right: auto;
  }
  .el-menu-item{
    color: #101113;
  }
  </style>
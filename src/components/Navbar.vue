<template>
  <keep-alive>
  <el-menu
      :default-active="activeIndex"
      text-color="white"
      background-color="black"
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
          

      <h1 style="color: white; display: flex;justify-content: center; align-items: center; margin-right:auto; margin-left: auto;">TrueMaster</h1>
      <!-- Este es el menu de la documentacion del software-->
       <el-sub-menu index="1" id="sub1">
        <template #title><el-icon><Document/></el-icon>Estadísticas</template>
        <div id="editable">
          <el-menu-item id="docsIcon" index="0-1" @click="mensajeDocs"><el-icon><HomeFilled/></el-icon>Sobre TrueMaster</el-menu-item>
        </div>
      </el-sub-menu>

      
      <el-sub-menu index="2" id="sub2">
        <template #title><el-icon><Document/></el-icon>Docs</template>
        <div id="editable1">
          <el-menu-item id="docsIcon1" index="1-1" @click="mensajeDocs"><el-icon><HomeFilled/></el-icon>Sobre TrueMaster</el-menu-item>
        </div>
      </el-sub-menu>

      <el-sub-menu index="3" id="sub3">
        <template v-if="userInfo.userInfo.name !== ''" #title><el-icon><user/></el-icon>{{ primerNombre }}</template>
        <div id="editable2">
        <el-menu-item id="navbarIcon1" index="2-1" @click="mensajebf"><el-icon><user/></el-icon>Perfil</el-menu-item>
        <el-menu-item id="navbarIcon2" index="2-2"><el-icon><BellFilled/></el-icon>Reporte de bugs</el-menu-item>
        <el-menu-item @click="mensajeal" id="navbarIcon3" index="2-3" ><el-icon><Close/></el-icon>Cerrar Sesión</el-menu-item>
        </div>
      </el-sub-menu>
    </el-menu>
  </keep-alive>
    
</template>
  
<script lang="ts" setup>
  import userInfo from '../../userInfo'
  import { ref } from 'vue'
  import { Menu as IconMenu, User, BellFilled, Close,Document,HomeFilled} from '@element-plus/icons-vue'
  import {ElMessageBox} from 'element-plus'
  import { useRouter } from 'vue-router'

 let usuarios = [{name:userInfo.userInfo.name}]
 let primerNombre = ''

  if(usuarios[0]["name"] !== ''){
    let valor = usuarios.map(user => {
      const partesNombre = user.name.split(" ")
      return partesNombre.slice(0,2).join(" ")
    })
    primerNombre = valor[0]
    console.log(primerNombre)
  }
  else{
    console.log('error inesperado')
  }


const router = useRouter()

//pruebas

const props = defineProps({
  user: Object
})


  const mensajebf = (done: () => void) => {
    ElMessageBox.confirm(
    `
    <img style="margin-top:5px;display: flex; justify-content: center; align-items: center; margin-right:auto; margin-left: auto;width: 180px;height: 180px;" src="${userInfo.userInfo.img}">
    Usuario: ${userInfo.userInfo.name}<br/>
    Número de cédula: ${userInfo.userInfo.id_number}<br/>
    Fecha de nacimiento: ${userInfo.userInfo.age}<br/>
    Correo electronico: ${userInfo.userInfo.email}<br/>
    Telefono: ${userInfo.userInfo.phone}<br/>
    Su rol en la empresa: ${userInfo.userInfo.rol}<br/>
    <hr>Descripcion del rol: ${userInfo.userInfo.message}<br/>
    `,
    'Información de Usuario',
    {
      confirmButtonText: 'Confirmar',
      dangerouslyUseHTMLString: true,
      type: 'info',
    }
  ).then(() => {
        router.push('/report')
      })
  }

  const mensajeDocs = (done: () => void) => {
    ElMessageBox.confirm(
    `Estimado usuario ${userInfo.userInfo.name}, Usted está a punto de ser redirigido a la página principal de el software TrueMaster, ¿está usted seguro?.<br><b>Si confirma es posible que deba iniciar sesión nuevamente</b>`,
    {
      confirmButtonText: 'Confirmar',
      cancelButtonText:'Cancelar',
      dangerouslyUseHTMLString: true,
      type: 'info',
    }
  ).then(() => {
        router.push('/about')
      })
  }

  const mensajeal = ()=>{
ElMessageBox.confirm(
    `Seguro que quiere cerrar sesion?`,
    'Información de Usuario',
    {
      confirmButtonText: 'Confirmar',
      cancelButtonText:'Cancelar',
      dangerouslyUseHTMLString: true,
      type: 'info',
    }
  ).then(() => {
    router.push('/')
  }) 
  }
     

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
    border-color: rgb(89, 0, 255);
    top: 0;
    height: fit-content;
    z-index: 10;
  }
  .el-sub-menu{
    width: fit-content;
  }

  #editable{
    margin-top: -12px;
  }
  #editable1{
    margin-top: -12px;
  }

  #editable2{
    margin-top: -12px;
    border-radius: 5px;
    margin-right: -6px;
  }
</style>
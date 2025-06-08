<script setup>

import Navbar from '../components/Navbar.vue';
import Sidebar from '../components/SidebarMenu.vue';
import userInfo from '../../userInfo'
import { useRouter } from 'vue-router';
import { ElNotification } from 'element-plus';

const router = useRouter();

console.log(userInfo.is_running)

if(userInfo.userInfo.id_number === '' && userInfo.userInfo.password === ''){
    router.push('/')
    ElNotification({
    title: 'Debe iniciar sesion',
    message: 'Por favor inicie sesion para acceder a TrueMaster',
    type: 'warning',
  })
}
</script >


<template>
    <el-container style="height: 100vh;">
        <el-header>
            <Navbar></Navbar>
        </el-header>


        <el-container>
            <el-aside width="auto">
                <Sidebar></Sidebar>
            </el-aside>
            <el-main class="main-content" style="margin-top: 20px;">
                <slot name="slotLayout">
                </slot>
            </el-main>
        </el-container>
    </el-container>     
</template>
  

<style scoped>
.el-main{
    margin-top: 10px;
}
.el-button{
    display: flex;
    margin-left: auto;
    margin-right: auto;
    margin-top: 20px;
}
.el-header{
    padding: 0;
}

.el-aside{
    background-color: #13161c;
}

.main-content{
    position: relative;
}
</style>

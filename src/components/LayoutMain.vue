<script setup>

import Navbar from '../components/Navbar.vue';
import Sidebar from '../components/SidebarMenu.vue';
import Statistic_ from './users/Statistic_.vue';

import {CaretTop} from '@element-plus/icons-vue'


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
            <el-main class="main-content">
                <Statistic_/>
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

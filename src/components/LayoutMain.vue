<script setup>
import Navbar from '../components/Navbar.vue';
import Sidebar from '../components/SidebarMenu.vue';



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
            <slot name="slotLayout">
            </slot>
        </el-main>
    </el-container>


</el-container> 

</template>
  

<style scoped>
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

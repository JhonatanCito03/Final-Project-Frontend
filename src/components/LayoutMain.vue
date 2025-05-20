<script setup>
import Navbar from '../components/Navbar.vue';
import Sidebar from '../components/SidebarMenu.vue';

import {CaretTop} from '@element-plus/icons-vue'


import { VueLenis, useLenis } from 'lenis/vue'
import { watch } from 'vue'

function scrollToTop() {
  lenis.value.scrollTo(0, { duration: 1.5 })
}

const lenis = useLenis(({ scroll }) => {
  console.log('Scroll position:', scroll)
})

watch(lenis, (lenis) => {
  // lenis instance
})

</script >


<template>
<VueLenis root>
    <!-- content -->
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
                <el-button @click="scrollToTop" type="info" :icon="CaretTop" circle />
            </el-main>
        </el-container>
    </el-container> 
</VueLenis>
    
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

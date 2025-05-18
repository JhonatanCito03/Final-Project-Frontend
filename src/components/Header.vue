<template>
  
    <div class="container">
      <div class="container_header">
        <h2 class="container_title">Módulo de {{ titulo }}</h2>

      <el-row justify="center">
        <el-button type="primary" @click="abrir" class="padded-button">{{ tituloBoton  }}</el-button>
      </el-row>
      
      </div>
        
    </div>
</template>

<script setup>
defineProps({
  titulo: {String, required: true},
  tituloBoton:{String, required: true},
  abrir:{
    type:Function,
    required:true
  }
})

</script>

<style scoped>
.container{
  margin-bottom: 10px;
}
.container_header{
  display: flex;
  justify-content: space-between;
}

.padded-button{
  padding: 20px;
  background-color: #8000ff;
  border: none;
  color: rgb(255, 255, 255);
  font-size: 15px;
}
.container_title{
  margin-left: auto;
  margin-right: auto;
  color: #13161c;
}


</style>
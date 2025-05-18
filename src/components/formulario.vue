<template>
    <el-container v-show="isVisible" class="form-container">
      <el-row :gutter="5" class="form-container__row">
        <el-col :xs="18" :sm="18" :md="18" :lg="22" :xl="22" class="form-container__title-col">
          <el-button text class="form-container__title-button" size="large">
            {{ titulo }}
          </el-button>
        </el-col>
        <el-col :xs="6" :sm="6" :md="6" :lg="2" :xl="2" class="form-container__button-group">
          <el-button size="large" class="form-container__button-cancel" @click="irAtras">Cancelar</el-button>
          <el-button color="#8000ff" size="large" class="form-container_button-submit" @click="submit" >{{tituloBoton}}</el-button>
          
        </el-col>
      </el-row>
  
      <el-main class="form-container__main">
        <slot name="slotForm"></slot>
      </el-main>
    </el-container>
  </template>
  
  <script setup>

  import { computed } from 'vue';
  
  const propiedad = defineProps({
    titulo: String,
    isEdit: Boolean,
    isOpen: Boolean,
  });
  
  console.log(propiedad.isEdit)
  const tituloBoton = computed(()=>(propiedad.isEdit ? 'Actualizar': 'Guardar'))
  
  const isVisible = computed(() => propiedad.isOpen);
  
  const $emit = defineEmits(['update:is-open','save' ,'update:is-edit']);
  
  const irAtras = ()  => {
    $emit('update:is-open', false);
  };
  
  const submit=()=>{
    if(propiedad.isEdit){
      $emit('update')
    }else{
      $emit('save')
    }
  }
  
  </script>
  
  <style scoped>
  .form-container {
    height: 100vh;
    position: absolute;
    top: 0;
    left: 0;
    right: 5px;
    width: 100%;
    z-index: 90;
    background-color: rgb(255, 255, 255);
    display: flex;
    flex-direction: column;
    height: calc(100vh + 42%);
  }
  
  
  
  .form-container__row {
    display: flex;
    align-items: center;
    padding: 10px;
  }
  
  /* estilos del titulo delformulario  */
  .form-container__title-button {
    font-size: 1.5rem;
    font-weight: bold;
  }
  
  
  /* alinear los botones en la parte soperior derecha */
  .form-container__button-group {
    display: flex;
    justify-content: flex-end;
    gap: 10px;
  }
  
  .form-container__button-submit {
    background-color: #ffffff;
    border: none;
    color: white;
  }
  
  
  </style>
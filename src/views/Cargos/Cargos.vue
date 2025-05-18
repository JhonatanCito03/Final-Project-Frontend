<template>
  <LayoutMain>
      <template #slotLayout>
          <Header   
          :titulo="'Cargos'"
          :tituloBoton="'Crear cargo'"
          :abrir="abrirFormulario"
          ></Header>

        <Formulario :titulo="'Gestion de Cargos'" v-model:is-open="mostrarFormulario" :is-edit="editandoFormulario">
            <template #slotForm>
                <el-row :gutter="20">
                <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                <FormularioCargos 
                v-model:is-open="mostrarFormulario" :is-edit="editandoFormulario"  
                />
                </el-col>
                </el-row>
            </template>
            
        </formulario>

              <el-table :data="tableData" stripe style="width: 100%; height: auto; color: black;">
                  <el-table-column prop="name" label="Nombre del cargo" width="180"/>
                  <el-table-column prop="address" label="código del cargo" width="180" />
                  <el-table-column prop="phone" label="Fecha de creación" />
                  <el-table-column fixed="right" label="Acciones" min-width="120">
                    <template #default>
                    <el-button link type="" size="large" :icon="Edit" @click="editarFormulario" >                  
                    </el-button>
                    <el-button link type="danger" :icon="Delete" ></el-button>
                    </template>
                  </el-table-column>
              </el-table>

      </template>
  </LayoutMain>
</template>

<script setup>

  import { onMounted, reactive, ref } from 'vue'
  import LayoutMain from '../../components/LayoutMain.vue';
  import Formulario from "../../components/formulario.vue";
  import FormularioCargos from "./components/formCargos.vue"
  import Header from '../../components/Header.vue';
  import {Delete,Edit, Loading} from "@element-plus/icons-vue"

  const mostrarFormulario = ref(false)
  const editandoFormulario = ref(false)
  
  const abrirFormulario = async() =>{
    mostrarFormulario.value=true
    editandoFormulario.value=false
  }
  const editarFormulario = () =>{
    mostrarFormulario.value=true
    editandoFormulario.value=true
  }

const tableData = [
{
  name: '',
  address: '',
  phone: '',
},
]
</script>

<style scoped>


</style>

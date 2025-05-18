<template>
    <LayoutMain>
        <template #slotLayout>
            <Header   
            :titulo="'Países'"
            :tituloBoton="'Crear País'"
            :abrir="abrirFormulario"
            ></Header>

          <Formulario :titulo="'Gestion de Paises'" v-model:is-open="mostrarFormulario" :is-edit="editandoFormulario">
              <template #slotForm>
                  <el-row :gutter="20">
                  <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                  <FormularioPaises   
                  v-model:is-open="mostrarFormulario" :is-edit="editandoFormulario"  
                  />
                  </el-col>
                  </el-row>
              </template>
              
          </formulario>

                <el-table :data="tableData" stripe style="width: 100%;">
                    <el-table-column prop="name" label="Nombre" width="180"/>
                    <el-table-column prop="address" label="Dirección" width="180" />
                    <el-table-column prop="phone" label="Teléfono" />
                    <el-table-column fixed="right" label="Acciones" min-width="120">
                      <template #default>
                      <el-button link type="primary" size="large" :icon="Edit" @click="editarFormulario" >                  
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
    import FormularioPaises from "./components/formPaises.vue"
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
    name: 'none',
    address: 'none',
    phone: 'none',
  },
]
  </script>

<style scoped>


</style>
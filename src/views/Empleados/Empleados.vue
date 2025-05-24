<template>
    <LayoutMain>
      <template #slotLayout>
          <Header   
          :titulo="'Empleados'"
          :tituloBoton="'Crear Empleado'"
          :abrir="abrirFormulario"
          ></Header>
          
          <formulario
          drawerTitle="colaborador"
          >
          
              <template #slotForm_drawer>
                <div class="imageUpload">
                  <h5>Foto de colaborador</h5>
                  <upload/>
                </div>
                <formEmpleados/>
              </template>
            
          </formulario>

              <el-table :data="tableData" stripe style="width: 100%; margin-left: auto; margin-right: auto;">
                <el-table-column prop="id" width="20"/>
                  <el-table-column label="Foto" width="100">
                        <template #default="{ row }">
                        <img :src="row.img" style="width: 80px; height: 80px; object-fit: cover;" />
                        </template>
                  </el-table-column>
                  <el-table-column prop="name" label="Nombre" width="260" />
                  <el-table-column prop="email" label="Correo" width="280" />
                  <el-table-column prop="globalScore" label="Puntaje global" width="100" />
                  <el-table-column prop="rol" label="Cargo en la empresa" width="160" />
                  <el-table-column prop="phone" label="Telefono" width="140" />
                  <el-table-column prop="region" label="Región" width="140" />
                  <el-table-column v-show="showActions" fixed="right" label="Acciones" min-width="80">
                    <template #default>
                    <el-button link size="large" :icon="Edit" >                  
                    </el-button>
                    <el-button link type="danger" :icon="Delete" ></el-button>
                    </template>
                  </el-table-column>
              </el-table>
      </template>
    </LayoutMain>

</template>

<script setup>
  import {Edit,Delete} from '@element-plus/icons-vue'
  import LayoutMain from '../../components/LayoutMain.vue';
  import Formulario from "../../components/formulario.vue";
  import formEmpleados from './components/formEmpleados.vue';
  import Header from '../../components/Header.vue';
  import upload from '../../../src/components/utilities/upload.vue'
  import axios from 'axios'
  import {ref,onMounted} from 'vue'
 
  
  const tableData = ref([])
  
  onMounted(() => {
    axios.get('http://127.0.0.1:8000/api/empleado')
    .then(response => {
        tableData.value = response.data.empleado
        tableData.value.forEach(empleado => {
            console.log(empleado.name)
            console.log(empleado.img)
        })
    })
    .catch(error => {
        console.error('error al cargar los datos: ', error)
    })
})

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
</script>

<style scoped>
.el-table{
    color: rgb(0, 0, 0);
}
.el-table > label{
    width: 100px;
    color: rgb(0, 0, 0);
}
.imageUpload{
  text-decoration: underline;
  text-align: center;
  margin-top: -30px;
  margin-bottom: 10px;
}
</style>

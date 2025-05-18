<template>
  <LayoutMain>
      <template #slotLayout>
          <Header   
          :titulo="'Empleados'"
          :tituloBoton="'Crear Empleado'"
          :abrir="abrirFormulario"
          ></Header>

        <Formulario :titulo="'Gestion de Empleados'" v-model:is-open="mostrarFormulario" :is-edit="editandoFormulario">
            <template #slotForm>
                <el-row :gutter="20">
                <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                <FormularioEmpleados 
                v-model:is-open="mostrarFormulario" :is-edit="editandoFormulario"  
                />
                </el-col>
                </el-row>
            </template>
            
        </formulario>

              <el-table :data="tableData" stripe style="width: 100%;">
                  <el-table-column prop="name" label="Nombre" width="180"/>
                  <el-table-column prop="secondName" label="Segundo nombre" width="180" />
                  <el-table-column prop="lastName" label="Apellido" width="180" />
                  <el-table-column prop="secLastName" label="Segundo apellido" width="180" />
                  <el-table-column prop="idNumber" label="Cedula" width="180" />
                  <el-table-column prop="bornDate" label="Fecha de nacimiento" width="180" />
                  <el-table-column prop="integrationDate" label="Fecha de integracion" />
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

<script lang="ts" setup>

  import { onMounted, reactive, ref , watch } from 'vue'
  import LayoutMain from '../../components/LayoutMain.vue';
  import Formulario from "../../components/formulario.vue";
  import Header from '../../components/Header.vue';
  import {Delete,Edit, Loading} from "@element-plus/icons-vue"
  import FormularioEmpleados from "./components/formEmpleados.vue"
  import { ElMessage, ElMessageBox } from 'element-plus'
  import axios from 'axios';

  const mostrarFormulario = ref(false)
  const editandoFormulario = ref(false)
  const formRef = ref()
  const dataEmpleadosById = ref()
  const Empleados = ref([])

  
  const abrirFormulario = async() =>{
    mostrarFormulario.value=true
    editandoFormulario.value=false
  }
  const editarFormulario = (id) =>{
    dataEmpleadosById.value =  datosById(id) //pruebas axios
    mostrarFormulario.value=true
    editandoFormulario.value=true
  }






//pruebas de la base de datos




  const guardarDatos = async () => {
    const validacion = await formRef.value?.validarFormulario()
    if (validacion) {
        await crearEmpleado()
    }
}

const actualizarDatos = async () => {
    const validacion = await formRef.value?.validarFormulario()
    if (validacion) {
        await actualizarEmpleado()
    }
}

const crearEmpleado = async () => {

const url = 'http://127.0.0.1:8000/api/empleados/save'

const dataFormulario = {
    name: formRef.value.formulario.primer_nombre,
    secondName: formRef.value.formulario.segundo_nombre,
    lastName: formRef.value.formulario.primer_apellido,
    secLastName: formRef.value.formulario.segundo_apellido,
    idNumber: formRef.value.formulario.cedula,
    bornDate: formRef.value.formulario.fecha_nacimiento,
    integrationDate: formRef.value.formulario.fecha_integracion,
}
try {
    axios.post(url, dataFormulario)
        .then(function (response) {
            console.log(response);
            formRef.value?.limpiarFormulario()
            ElMessage({
                message: 'El empleado se creo con exito    .',
                type: 'success',
            })
            datosEmpleado()
            mostrarFormulario.value = false
        })
        .catch(function (error) {
            console.log(error);
        });

} catch (error) {
    console.error('error al crear empleado ', error)
}
}

const actualizarCargo = async () => {
 
 const url = 'http://127.0.0.1:8000/api/empleados/update'

 const dataFormulario = {
    id:dataEmpleadosById.value[0].id,
    name: formRef.value.formulario.primer_nombre,
    secondName: formRef.value.formulario.segundo_nombre,
    lastName: formRef.value.formulario.primer_apellido,
    secLastName: formRef.value.formulario.segundo_apellido,
    idNumber: formRef.value.formulario.cedula,
    bornDate: formRef.value.formulario.fecha_nacimiento,
    integrationDate: formRef.value.formulario.fecha_integracion,    
 }

 try {
     axios.put(url, dataFormulario)
         .then(function (response) {
             console.log(response);
             formRef.value?.limpiarFormulario()
             ElMessage({
                 message: 'El empleado se actualizo con exito    .',
                 type: 'success',
             })
             datosEmpleado()
             mostrarFormulario.value = false

         })
         .catch(function (error) {
             console.log(error);
         });

 } catch (error) {
     console.error('error crear empleado ', error)
 }

}

const datosById = async (id) => {

const url = 'http://127.0.0.1:8000/api/empleados/datosById'

try {
    const response = axios.get(url, {
        params: {
            id: id
        }
    })
    return (await response).data.result

} catch (error) {
    console.error('error crear empleado ', error)
}

}
const eliminarCargo = async (id) => {

const url = 'http://127.0.0.1:8000/api/empleados/delete'

ElMessageBox.confirm(
    'Esta seguro de eliminar el empleado? ',
    'Eliminar Registro',
    {
        confirmButtonText: 'Si, deseo eliminar al empleado' + id,
        cancelButtonText: 'Cancelar',
        type: 'error',
    }
)
    .then(() => {

        try {
            axios.delete(url, { data: { id } })
                .then(function (response) {
                    datosEmpleado()

                })
                .catch(function (error) {
                    console.log(error);
                });

        } catch (error) {
            console.error('error al crear empleado ', error)
        }
        ElMessage({
            type: 'success',
            message: 'Se elimino correctamente el registro',
        })
    })
    .catch(() => {
        ElMessage({
            type: 'info',
            message: 'Eliminacion cancelada',
        })
    })

}
const datosEmpleado = async () => {

const url = 'http://127.0.0.1:8000/api/empleados/get'

try {
    axios.get(url)
        .then(function (response) {
            Empleados.value = response.data.result   // /// ---> posible error
           // console.log(response);

        })
        .catch(function (error) {
            console.log(error);
        });

} catch (error) {
    console.error('error al crear empleado ', error)
}


}


onMounted(() => {
datosEmpleado()
})
</script>

<style scoped>


</style>

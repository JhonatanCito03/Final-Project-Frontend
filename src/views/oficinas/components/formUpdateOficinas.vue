<template>
    <LayoutMain>
      <template #slotLayout>
          <Header   
          :titulo="'Oficinas'"
          :tituloBoton="'Crear oficina'"
          :abrir="() => { is_create(); openDrawer(); }"
          ></Header>
          
          <formulario
          :drawerTitle = "drawerTitle"
          >
              <template #slotForm_drawer>
                <formPaises v-if="is_create_btn"/>
                <formUpdatePaises v-if="is_edit_btn" :user="paisSeleccionado"/>
              </template>

            
          </formulario>
          <!--Loading-->
              <el-table 
              v-loading="loading"
              :data="tableData" 
              stripe 
              style="width: 90%; margin-left: auto; margin-right: auto; font-size: large;"
              
              >
                  <el-table-column prop="nombre_region" label="Nombre" width="260" />
                  <el-table-column prop="codigo_iso" label="Código ISO" width="280" />
                  <el-table-column prop="prefijo_telefonico" label="Prefijo Telefónico" width="140"  />
                  <el-table-column prop="moneda" label="Moneda" width="160" />
                  <el-table-column prop="idioma_principal" label="Idioma Principal" width="140" />

                  <!--Caso de estudio-->
                  <el-table-column prop="activo" label="Activo?" width="120"/>

                  <el-table-column fixed="right" label="Acciones">
                    <template #default="{ row }">
                    <el-button 
                    link 
                    size="large" 
                    :icon="Edit"
                    @click="editarPais(row)"
                    >                  
                    </el-button>
                    <el-button 
                    link 
                    type="danger" 
                    :icon="Delete"
                    @click="handleDelete(row.id,row.nombre_region)"
                    ></el-button>
                    </template>
                  </el-table-column>
              </el-table>
              <el-button style="margin-left: auto; margin-right: auto; display: flex; margin-top: 10px;" @click="loadData">Recargar</el-button>
      </template>
    </LayoutMain>
</template>

<script lang="ts" setup>
  import {Edit,Delete} from '@element-plus/icons-vue'
  import LayoutMain from '../../../components/LayoutMain.vue';
  import Formulario from "../../../components/formulario.vue";
  import formRegiones from './components/formRegiones.vue';
  import formUpdateRegiones from './components/formUpdateRegiones.vue';
  import Header from '../../../components/Header.vue';
  import axios from 'axios'
  import {ref,onMounted, h} from 'vue'
  import { ElMessageBox, ElMessage } from 'element-plus';
  import { useRouter } from 'vue-router'
  import { computed } from 'vue';
  import {useDrawerStore} from '../../../components/stores/useDrawerStore'
  //import is_logged from '../../../userInfo';

  function formatDay(row, column, cellValue) {
  if (!cellValue) return ''
  const date = new Date(cellValue)
  const day = String(date.getDate()).padStart(2, '0')
  const month = String(date.getMonth()).padStart(2, '0')
  const year = date.getFullYear()
  return `${day}/${month}/${year}`

  }

  const paisSeleccionado = ref(null)

  function editarPais(pais) {
    is_create_btn.value = false
    is_edit_btn.value = true
    openDrawer()
    paisSeleccionado.value = pais
  }

  const drawerStore = useDrawerStore()


  const openDrawer = () => {
    drawerStore.openDrawer()
  }

  const is_create_btn = ref(true)
  const is_edit_btn = ref(false)

  function is_create(){
    is_create_btn.value = true
    is_edit_btn.value = false
  }
  function is_edit(){
    is_create_btn.value = false
    is_edit_btn.value = true
  }

  const drawerTitle = computed(() => is_create_btn.value == true ? 'Creación de Países' : 'Actualización de Países')

  const router = useRouter()
 

  const loading = ref(true)
  const tableData = ref([])
  const loaded = ref(true)

//table

const handleDelete = (id:number, nombre_region:string) => {
  console.log('eliminar pais id: ', id, nombre_region) 
  try{
  //prueba msg
    ElMessageBox.confirm(
    `Esta usted seguro de que quiere eliminar a ${nombre_region} con id:${id}`,
    `Eliminar pais ${nombre_region}`,
    {
      confirmButtonText: 'Si, estoy segur@',
      cancelButtonText: 'No, no quiero eliminar',
      type: 'warning',
    }
  )
    .then(() => {
      ElMessage({
        type: `Usuario ${nombre_region} eliminado con exito`,
        message: `${id} eliminado con exito`,
      })
      axios.delete(`http://127.0.0.1:8000/api/pais/${id}`)
      .then((response)=>{console.log(response, 'eliminado', id)})
    })
    .catch(() => {
      ElMessage({
        type: 'warning',
        message: 'No se elimino el usuario',
      })
    })
  }
  catch{}
  finally{

  }
}


  function loadData(){
    try {
    loading.value = true
      axios.get('http://127.0.0.1:8000/api/pais')
    .then(response => {
        tableData.value = []
        response.data.data.forEach(pais => {
          tableData.value.push(pais)
        });
        console.log(tableData.value)
    })
    .catch(error => {
      ElMessageBox({
        title:error,
        message: h('p', null, [
          h('span', null, 'Hubo un problema cargando los datos, por favor intentelo de nuevo')
        ])
      })
      .then(() => {
      router.push('/')
      }) 
    })
    } catch(error){
      console.log(error)
    } finally {
    loading.value = false
    loaded.value = true
    }
  }
 
  onMounted(async () => {
    loadData()
  })


</script>

<style scoped>
body{
  margin: 0;
}
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
.example-showcase .el-loading-mask {
  z-index: 9;
}
</style>

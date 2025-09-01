<template>
    <LayoutMain>
      <template #slotLayout>
          <Header   
          :titulo="'Departamentos'"
          :tituloBoton="'Crear departamento'"
          :abrir="() => { is_create(); openDrawer(); }"
          ></Header>
          
          <formulario
          :drawerTitle = "drawerTitle"
          >
              <template #slotForm_drawer>
                <formRegiones v-if="is_create_btn"/>
                <formUpdateRegiones v-if="is_edit_btn" :user="departamentoSeleccionado"/>
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
                  <el-table-column prop="numero_region" label="Codigo" width="100" />
                  <el-table-column prop="zona" label="Zona" width="140"  />
                <el-table-column label="Ver Detalles" width="140">
                    <template #default="{ row }">
                        <el-button type="primary" size="small" @click="openMsg(row)">
                            Ver Detalles
                        </el-button>
                    </template>
                </el-table-column>

                  <!--Caso de estudio-->
                  <el-table-column 
                  prop="activo"
                  label="Activo?"
                  width="120"
                  />


                <el-table-column
                label="País">
                    <template #default="{ row }">
                        {{ getPaisNombre(row.pais_id) }}
                    </template>
                </el-table-column>

                  <el-table-column fixed="right" label="Acciones">
                    <template #default="{ row }">
                    <el-button 
                    link 
                    size="large" 
                    :icon="Edit"
                    @click="editarRegion(row)"
                    >                  
                    </el-button>
                    <el-button 
                    link 
                    type="danger" 
                    :icon="Delete"
                    @click="handleDelete(row.id,row.nombre_Region)"
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
  import LayoutMain from '../../components/LayoutMain.vue';
  import Formulario from "../../components/formulario.vue";
  import formRegiones from './components/formRegiones.vue';
  import formUpdateRegiones from './components/formUpdateRegiones.vue';
  import Header from '../../components/Header.vue';
  import axios from 'axios'
  import {ref,onMounted, h, watch} from 'vue'
  import { ElMessageBox, ElMessage, formatter } from 'element-plus';
  import { useRouter } from 'vue-router'
  import { computed } from 'vue';
  import {useDrawerStore} from '../../components/stores/useDrawerStore'
  import type { Action } from 'element-plus'
import { row } from '@primeuix/themes/aura/datatable';
  //import is_logged from '../../../userInfo';


  const departamentoSeleccionado = ref(null)

  function editarRegion(region) {
    is_create_btn.value = false
    is_edit_btn.value = true
    openDrawer()
    departamentoSeleccionado.value = region
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

  const drawerTitle = computed(() => is_create_btn.value == true ? 'Creación de Regiones' : 'Actualización de Regiones')

  const router = useRouter()
 

  const loading = ref(true)
  const tableData = ref([])
  const loaded = ref(true)

//table

const handleDelete = (id:number, nombre_region:string) => {
  console.log('eliminar region id: ', id, nombre_region) 
  try{
  //prueba msg
    ElMessageBox.confirm(
    `Esta usted seguro de que quiere eliminar a ${nombre_region} con id:${id}`,
    `Eliminar region ${nombre_region}`,
    {
      confirmButtonText: 'Si, estoy segur@',
      cancelButtonText: 'No, no quiero eliminar',
      type: 'warning',
    }
  )
    .then(() => {
      ElMessage({
        type: `Región ${nombre_region} eliminada con exito`,
        message: `${id} eliminado con exito`,
      })
      axios.delete(`http://127.0.0.1:8000/api/region/${id}`)
      .then((response)=>{console.log(response, 'eliminado', id)})
    })
    .catch(() => {
      ElMessage({
        type: 'warning',
        message: 'No se elimino la region',
      })
    })
  }
  catch(error){
    console.log(error)
  }
  finally{

  }
}


function loadData() {
    try {
        loading.value = true
        axios.get('http://127.0.0.1:8000/api/region')
            .then(response => {
                tableData.value = []
                if (response.data.lista && response.data.lista.length > 0) {
                    response.data.lista.forEach(region => {
                        tableData.value.push(region)
                    });
                }
                console.log(tableData.value)
            })
            .catch(error => {
                if (error.response && error.response.status !== 404) {
                    ElMessageBox({
                        title: error,
                        message: h('p', null, [
                            h('span', null, 'Hubo un problema cargando los datos, por favor intentelo de nuevo')
                        ])
                    })
                }
                tableData.value = []
            })
    }
    catch { }
    finally {
        loading.value = false
        loaded.value = true
    }
}
  onMounted(async () => {
    loadData()
    loadCountries()
  })


  function openMsg(valor1) {
  ElMessageBox.alert(`La región identificada con el nombre: '${valor1.nombre_region}', tiene un ID: '${valor1.id}', pertenece a el pais con identificador: '${valor1.pais_id}'. Fue creada el '${valor1.created_at}'`, valor1.nombre_region, {
    // if you want to disable its autofocus
    // autofocus: false,
    confirmButtonText: 'Aceptar'
  })
}


  // === PAISES ===
const countries = ref<{ pais_id: number; nombre_pais: string }[]>([])

function loadCountries() {
  axios.get('http://127.0.0.1:8000/api/pais')
    .then(response => {
      countries.value = (response.data.data || []).map((p: any) => ({
        pais_id: p.id,
        nombre_pais: p.nombre_pais
      }))

      console.log('Paises cargados:', countries.value)
    })

    .catch(error => {
          console.error('Error al cargar los paises:', error)
        })
}

function getPaisNombre(pais_id: number | string) {
  const country = countries.value.find(
    c => String(c.pais_id) === String(pais_id)
  )
  console.log('pais id:', pais_id)
  return country ? country.nombre_pais : 'Desconocido'


}





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

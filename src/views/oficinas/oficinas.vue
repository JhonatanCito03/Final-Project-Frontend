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
                <formOficinas v-if="is_create_btn"/>
                <formUpdateOficinas v-if="is_edit_btn" :user="oficinaSeleccionada"/>
              </template>

            </formulario>
          <!--Loading-->
              <el-table 
              v-loading="loading"
              :data="tableData" 
              stripe 
              style="width: 90%; margin-left: auto; margin-right: auto; font-size: large;"
              
              >
                  <el-table-column prop="nombre_oficina" label="Nombre" width="260" />
                  <el-table-column prop="codigo_oficina" label="Codigo" width="100" />
                  <el-table-column prop="direccion" label="Dirección" width="140"  />
                  <el-table-column prop="telefono" label="Teléfono" width="140"  />
                  <el-table-column prop="email_contacto" label="Email de contacto" width="140"  />

           

                <el-table-column label="Municipio" width="180">
                    <template #default="{ row }">
                        {{ getOficinaName(row.oficina_id) }}
                    </template>
                </el-table-column>


                 <el-table-column label="Horarios de atención" width="180">
                    <el-button plain @click="ver_horarios(row)">Ver horarios</el-button>
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
  import formOficinas from './components/formOficinas.vue';
  import formUpdateOficinas from './components/formUpdateOficinas.vue';
  import Header from '../../components/Header.vue';
  import axios from 'axios'
  import {ref,onMounted, h, watch} from 'vue'
  import { ElMessageBox, ElMessage, formatter } from 'element-plus';
  import { useRouter } from 'vue-router'
  import { computed } from 'vue';
  import {useDrawerStore} from '../../components/stores/useDrawerStore'
    import { row } from '@primeuix/themes/aura/datatable';
    import type { Action } from 'element-plus'


  const oficinaSeleccionada = ref(null)

  function editarRegion(region) {
    is_create_btn.value = false
    is_edit_btn.value = true
    openDrawer()
    oficinaSeleccionada.value = region
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


  //mensaje para boton horarios
  const ver_horarios = (row) => {
  ElMessageBox.alert('This is a message', 'Title', {
    // if you want to disable its autofocus
    // autofocus: false,
    confirmButtonText: 'OK',
    callback: (action: Action) => {
      ElMessage({
        type: 'info',
        message: `action: ${action}`,
      })
    },
  })
}


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
      axios.delete(`http://127.0.0.1:8000/api/municipio/${id}`)
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
        axios.get('http://127.0.0.1:8000/api/municipio')
            .then(response => {
                tableData.value = []
                if (response.data.data && response.data.data.length > 0) {
                    response.data.data.forEach(municipio => {
                        tableData.value.push(municipio)
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
    loadRegions()
  })

  // === PAISES ===
const regions = ref<{ id: number; nombre_region: string }[]>([])

function loadRegions() {
  axios.get('http://127.0.0.1:8000/api/region')
    .then(response => {
      const lista = response.data.data || response.data.lista || []
      regions.value = lista.map((p: any) => ({
        id: p.id,
        nombre_region: p.nombre_region
      }))
      console.log('Regiones cargadas:', regions.value)
    })

    .catch(error => {
        console.error('Error al cargar los departamentos:', error)
    })
}

function getOficinaName(oficina_id: number|string) {
  const region = regions.value.find(
    c => String(c.id) === String(oficina_id)
  )
  console.log('Region encontrada:', region)
  return region ? region.nombre_region : 'Desconocido'
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

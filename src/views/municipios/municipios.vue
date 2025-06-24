<template>
    <LayoutMain>
      <template #slotLayout>
        <button>Hola</button>
          <Header   
          :titulo="'Empleados'"
          :tituloBoton="'Crear colaborador'"
          :abrir="() => { is_create(); openDrawer(); }"
          ></Header>
          
          <formulario
          :drawerTitle = "drawerTitle"
          >
              <template #slotForm_drawer>
                <formEmpleados v-if="is_create_btn"/>
                <formUpdate v-if="is_edit_btn" :user="usuarioSeleccionado"/>
              </template>
          </formulario>
          <!--Loading-->
              <el-table 
              v-loading="loading"
              :data="tableData" 
              stripe 
              style="width: 100%; margin-left: auto; margin-right: auto;">
                  <el-table-column prop="name" label="Nombre" width="260" />
                  <el-table-column prop="region" label="Región" width="140" />
                  <el-table-column fixed="right" label="Acciones" min-width="80">
                    <template #default="{ row }">
                    <el-button 
                    link 
                    size="large" 
                    :icon="Edit"
                    @click="editarUsuario(row)"
                    >                  
                    </el-button>
                    <el-button 
                    link 
                    type="danger" 
                    :icon="Delete"
                    @click="handleDelete(row.id,row.name)"
                    ></el-button>
                    </template>
                  </el-table-column>
                  <el-table-column 
                  prop="created_at" 
                  label="Fecha de creacion"
                  :formatter="formatDay"
                  width="115"
                  />
                </el-table>
                <el-button style="margin-left: auto; margin-right: auto; display: flex; margin-top: 10px;" v-if="!loaded" @click="loadData">Recargar</el-button>
                <button>Hola</button>
      </template>
    </LayoutMain>
</template>

<script lang="ts" setup>
  import {Edit,Delete} from '@element-plus/icons-vue'
  import LayoutMain from '../../components/LayoutMain.vue';
  import Formulario from "../../components/formulario.vue";
  import formMunicipios from 'src/views/municipios/components/formMunicipios.vue'
  import formUdate from 'src/views/municipios/components/formUdate.vue'
  import Header from '../../components/Header.vue';
  import axios from 'axios'
  import {ref,onMounted, h} from 'vue'
  import { ElMessageBox, ElMessage } from 'element-plus';
  import { useRouter } from 'vue-router'
  import { computed } from 'vue';
  import {useDrawerStore} from '../../components/stores/useDrawerStore'

  function formatDay(row, column, cellValue) {
  if (!cellValue) return ''
  const date = new Date(cellValue)
  const day = String(date.getDate()).padStart(2, '0')
  const month = String(date.getMonth()).padStart(2, '0')
  const year = date.getFullYear()
  return `${day}/${month}/${year}`

  }

  const usuarioSeleccionado = ref(null)

  function editarUsuario(usuario) {
    is_create_btn.value = false
    is_edit_btn.value = true
    openDrawer()
    usuarioSeleccionado.value = usuario
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
  
  const drawerTitle = computed(() => is_create_btn.value == true ? 'Crear Empleado' : 'Actualizar empleado')

  const router = useRouter()
 

  const loading = ref(true)
  const tableData = ref([])
  const loaded = ref(true)

//table

const handleDelete = (id:number, name:string) => {
  console.log('eliminar empleado id: ', id, name) 
  try{
  //prueba msg
    ElMessageBox.confirm(
    `Esta usted seguro de que quiere eliminar a ${name} con id:${id}`,
    `Eliminar empleado ${name}`,
    {
      confirmButtonText: 'Si, estoy segur@',
      cancelButtonText: 'No, no quiero eliminar',
      type: 'warning',
    }
  )
    .then(() => {
      ElMessage({
        type: `Usuario ${name} eliminado con exito`,
        message: `${id} eliminado con exito`,
      })
      axios.delete(`http://127.0.0.1:8000/api/empleado/${id}`)
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
}


  function loadData(){
    try {
    loading.value = true
      axios.get('http://127.0.0.1:8000/api/municipio')
    .then(response => {
        tableData.value = response.data.municipio
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
    loaded.value = false
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

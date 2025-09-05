<template>
  <LayoutMain>
    
    <template #slotLayout>

      <h2 style="text-align: center; margin-top: 20px; margin-bottom: 20px;">Crear nuevo valor de meta</h2>

      <el-form 
      ref="ruleFormRef"
        :model="formData"
        >
        <el-input v-model="datos.userInfo.name" prop="creado_por" label="Director" width="180" disabled/>
      <el-input v-model="datos.userInfo.id_number" label="Director" width="180" disabled/>
      <el-input v-model="datos.userInfo.rol" label="Director" width="180" disabled/>
      <el-input v-model="formData.meta_name" prop="nombre_meta" placeholder="Nombre de la meta" />
      <el-input v-model="formData.meta_description" prop="descripcion_meta" placeholder="Descripcion de la meta" type="textarea" />
      <el-input v-model="formData.target_value" prop="valor_objetivo" placeholder="Valor objetivo" type="number" />
      <el-input v-model="formData.current_value" prop="valor_actual" placeholder="Valor actual" type="number" />

      <el-form-item>
        <el-select 
        v-model="formData.status" 
        prop="status"
        placeholder="Estado de la meta">
          <el-option 
          label="En progreso"
          value= 0
          />
          <el-option 
          label="Completada"
          value= 1
          />
        </el-select>
      </el-form-item>

      <el-form-item>
        <div class="container" style="display: flex; align-items: center; justify-content: center; margin-left: auto; margin-right: auto; margin-top: 15px;">
            <el-button style="color: aliceblue; background-color: blueviolet;" @click="submitForm(ruleFormRef)">
              Crear valor de meta
            </el-button>
            <el-button @click="resetForm(ruleFormRef)">Resetear formulario</el-button>
        </div>      
    </el-form-item>
      </el-form>
    </template>
  </LayoutMain>


</template>

<script lang="ts" setup>
import LayoutMain from '../../components/LayoutMain.vue';
import { onMounted, ref, watch } from 'vue'
import userInfo from '../../../userInfo'
import axios from 'axios';
import { ElMessage,ElMessageBox } from 'element-plus';
import { useRouter } from 'vue-router';
import { info } from 'sass-embedded';

const datos = ref(userInfo)
const router = useRouter()

const formData = ref({
  nombre_meta: '',
  descripcion_meta: '',
  valor_objetivo: '',
  valor_actual: '',
  estado_meta: '',
  creado_por: '',
  actualizado_por: ''
})

function sendWarn() {
  ElMessageBox.confirm(
    'Tenga en cuenta que este valor define la meta general de la empresa, por lo que su mal uso será sancionado.',
    'Warning',
    {
      confirmButtonText: 'Continuar',
      cancelButtonText: 'Volver',
      type: 'warning',
    }
  )
    .then(() => {
      ElMessage({
        type: 'success',
        message: 'Módulo de creación de nuevo valor de meta (GLOBAL)',
      })
    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: 'Redirigido',
      })
      router.push('/Empleados') // ✅ works now
    })
}


function submitForm() {

  axios.put('http://127.0.0.1:8000/api/meta_presidencia/1', formData.value)
  .then(response => {
    const open2 = () => {
      ElMessage({
        message: `Nuevo valor de meta: ${response.data.valor_objetivo} con el id: ${response.data.nombre_meta} creado correctamente.`,
        type: 'success',
      })
    };
  })
  .catch(error => {
    const openError = () => {
      ElMessage({
        message:`El nuevo valor de meta ${Response.data.valor_objetivo} No ha podido ser creado, por favor intentelo de nuevo`
      })
    }
  });
} 


onMounted(() => {
  sendWarn()
})
</script>

<style scoped>

</style>

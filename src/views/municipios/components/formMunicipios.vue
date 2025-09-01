<template>
  <el-form
    v-loading="loading"
    ref="ruleFormRef"
    style="max-width: 600px"
    :model="ruleForm"
    status-icon
    :rules="rules"
    label-width="auto"
    class="demo-ruleForm"
  >


  <!--Form-->
  <el-form-item label="Nombre del municipio" prop="nombre_municipio">
    <el-input v-model.string="ruleForm.nombre_municipio" type="text" />
  </el-form-item>

  <el-form-item label="Codigo identificador" prop="codigo_municipio">
    <el-input v-model.string="ruleForm.codigo_municipio" type="text"/>
  </el-form-item>

  <!--Pruebas del formulario-->
  <el-form-item label="Población" prop="poblacion">
    <el-input v-model.number="ruleForm.poblacion" type="number"/>
  </el-form-item>

  <el-form-item label="Es capital?" prop="es_capital">
      <el-select v-model="ruleForm.es_capital" placeholder="Seleccione una opción">
        <el-option label="Sí, es capital" value="true" />
        <el-option label="No, no es capital" value="false" />
      </el-select>
    </el-form-item>

    
    <!--prueba2-->
    <el-form-item label="Departamento al cual pertenece" prop="region_id">
        <el-select v-model="ruleForm.region_id" placeholder="Seleccionar departamento">
            <el-option
            v-for="item in regions"
            :key="item.id"
            :label="item.nombre_region"
            :value="item.id"
            />
        </el-select>
    </el-form-item>
    
    <el-form-item label="¿Está activo?" prop="activo">
      <el-input v-model="ruleForm.activo" disabled></el-input>
    </el-form-item>

    <!--Caso de estudio-->
  
    
    <el-form-item>
        <div class="container" style="display: flex; align-items: center; justify-content: center; margin-left: auto; margin-right: auto;">
            <el-button style="color: aliceblue; background-color: blueviolet;" @click="submitForm(ruleFormRef)">
              Crear País
            </el-button>
            <el-button @click="resetForm(ruleFormRef)">Resetear formulario</el-button>
        </div>      
    </el-form-item>
  </el-form>
</template>

<script lang="ts" setup>
import { onMounted, reactive, ref , watch} from 'vue'
import { computed } from 'vue'
import axios from 'axios'
import type { FormInstance, FormRules } from 'element-plus'
import {Delete,Download,ZoomIn} from '@element-plus/icons-vue' 
import coinType from '../../../components/generalData/coinType.json'
import languages from '../../../components/generalData/languages.json'
import type {UploadUserFile } from 'element-plus'
import type { UploadFile } from 'element-plus'
import { ElMessage } from 'element-plus'


onMounted(() => {
  loadRegions()
})

const regions = ref([])

const loadRegions = () => {
  axios.get('http://127.0.0.1:8000/api/region')
    .then(response => {
        regions.value = []
        response.data.lista.forEach(region => {
          regions.value.push(region)
        });

        console.log('regiones cargas 101: ' + regions.value);
    })
    .catch(error => {
      ElMessageBox({
        title:error,
        message: h('p', null, [
          h('span', null, 'Hubo un problema cargando los datos, por favor intentelo de nuevo')
        ])
      })
    })
}




const loading = ref(false)

const fileList = ref<UploadUserFile[]>([])

const dialogImageUrl = ref('')
const dialogVisible = ref(false)
const disabled = ref(false)

const ruleFormRef = ref<FormInstance>()


const checkName = (rule: any, value: String, callback: any) => {
  if (!value) {
    return callback(new Error('Por favor ingrese el nombre del municipio'))
  }
  else if (value.length < 3 || value.length > 50) {
    callback(new Error('El nombre del municipio debe ser de 3 a 50 caracteres'))
  } 
  else {
      callback()
  }
}

const checkIsoCode = (rule: any, value: any, callback: any) => {
    setTimeout(() => {
        if (value.length < 1 || value.length > 4) {
        callback(new Error('Debe ingresar un valor válido'))
        } 
        else {
            callback()
        }
    }, 1000)
}
const checkPopulation = (rule: any, value: any, callback: any) => {
    setTimeout(() => {
        if (value < 5000 || value > 20000000) {
        callback(new Error('Los valores deben estar entre 5000 y 20000000'))
        } 
        else {
            callback()
        }
    }, 1000)
}
const check_is_capital = (rule: any, value: any, callback: any) => {
    setTimeout(() => {
        if (value === '' || value === null) {
        callback(new Error('Este campo es obligatorio'))
        } 
        else {
            callback()
        }
    }, 1000)
}
const check_region = (rule: any, value: any, callback: any) => {
    setTimeout(() => {
        if (value === '' || value === null) {
        callback(new Error('Seleccione un departamento'))
        } 
        else {
            callback()
        }
    }, 1000)
}





const ruleForm = reactive({
  nombre_municipio: '',
  codigo_municipio: '',
  poblacion: '',
  es_capital: '',
  activo: '',
  region_id: ''
})

const is_region_active = ref('')

function cargar_regiones() {

    axios.get(`http://127.0.0.1:8000/api/region/${ruleForm.region_id}`)
    .then(response => {
        is_region_active.value = response.data.data.activo

        
        if(is_region_active.value === 'Si'){
            ruleForm.activo = 'Si'
        } else {
            ruleForm.activo = 'No'
        }
    }).catch(error => {
      console.error('Error al cargar los países:', error);
    });
}



const statusSwitch = ref(false)



const rules = reactive<FormRules<typeof ruleForm>>({
  nombre_municipio: [{ validator: checkName, trigger: 'blur' }],
  codigo_municipio: [{ validator: checkIsoCode, min: 7, trigger: 'blur' }],
  poblacion: [{ validator: checkPopulation, trigger: 'blur' }],
  es_capital: [{ validator: check_is_capital, trigger: 'blur' }],
  region_id: [{ validator: check_region, trigger: 'blur' }]
})

const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.validate((valid) => {
    if (valid) {
      setTimeout(() => {
          loading.value = true
        }, 1000);
      const formData = new FormData()

      formData.append('nombre_municipio', ruleForm.nombre_municipio)
      formData.append('codigo_municipio', ruleForm.codigo_municipio)
      formData.append('poblacion', ruleForm.poblacion)
      formData.append('es_capital', ruleForm.es_capital === 'true' ? 1 : 0)
      formData.append('activo', ruleForm.activo === 1 ? true : false)
      formData.append('region_id', ruleForm.region_id)

      axios.post('http://127.0.0.1:8000/api/municipio', formData, {
        headers: {
          'Content-Type':'multipart/form-data'
        }
      })
      .then(function (response) {
        ElMessage({
          showClose: true,
          message: 'Nuevo municipio creado correctamente',
          type:'success',
          duration: 3000
        })

        setTimeout(() => {
            loading.value = false
        }, 1000);
        console.log('Respuesta del servidor:', response.data);

      })
      .catch(function (error) {
        setTimeout(() => {
          loading.value = false
        }, 1000);
        console.log(error);
        ElMessage({
          showClose: true,
          message: 'Error al cargar los datos. Verifique la informacion e intentelo de nuevo',
        })
      }
    );


    } else {
      console.log('error submit!')
    }
  })
}

loading.value = false

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()
}

const props = defineProps<{
  userToEdit: any
}>()

watch(
  () => props.userToEdit,
  (newUser) => {
    if (newUser) {
      ruleForm.nombre_municipio = newUser.nombre_municipio
      ruleForm.codigo_municipio = newUser.codigo_municipio
      ruleForm.poblacion = newUser.poblacion
      ruleForm.es_capital = newUser.es_capital
      ruleForm.activo = newUser.activo
      ruleForm.region_id = newUser.region_id
    }
  },
  {immediate:true}
)

watch(
    () => ruleForm.region_id,
    (newRegion, oldRegion) => {
        if (newRegion !== oldRegion) {
            cargar_regiones()
        }
    }
)

watch(
    () => ruleForm.activo,
    (newActivo, oldActivo) => {
        console.log('El estado de "activo" ha cambiado a: ', newActivo)
    }
)
</script>

<style scoped>
.container{
  display: flex;
  justify-content: center;
}

.preview-image{
  max-width: 500px;
  width: 100%;
  display: block;
  margin: 0 auto;
  border-radius: 8px;
}
</style>
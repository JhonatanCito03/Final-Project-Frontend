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
  <el-form-item label="Nombre de la región" prop="nombre_region">
    <el-input v-model.string="ruleForm.nombre_region" type="text" />
  </el-form-item>

  <el-form-item label="Número identificador" prop="numero_region">
    <el-input v-model.string="ruleForm.numero_region" type="text"/>
  </el-form-item>

  <el-form-item label="Zona regional" prop="zona">
      <el-select v-model="ruleForm.zona" placeholder="Seleccione zona">
        <el-option label="Norte" value="Norte" />
        <el-option label="Sur" value="Sur" />
        <el-option label="Este" value="Este" />
        <el-option label="Oeste" value="Oeste" />
      </el-select>
    </el-form-item>

    <el-form-item label="Descripción" prop="descripcion">
      <el-input v-model="ruleForm.descripcion" type="textarea" placeholder="Debe describir los datos básicos de la región, como Ciudad o municipio principal..."/>
    </el-form-item>

    <!--prueba2-->
    <el-form-item label="País al que pertenece" prop="pais">
      <el-select v-model="ruleForm.pais" placeholder="Seleccionar país">
        <el-option 
        v-for="item in countries"
        :key="item.id"
        :label="item.nombre_pais"
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

<button @click="logDescription">Log Description</button>
</template>

<script lang="ts" setup>
import { onMounted, reactive, ref , watch} from 'vue'
import { computed } from 'vue'
import axios from 'axios'
import type { FormInstance, FormRules } from 'element-plus'
import {Delete,Download,ZoomIn} from '@element-plus/icons-vue' 
import regions from '../../../components/generalData/regions.json'
import coinType from '../../../components/generalData/coinType.json'
import languages from '../../../components/generalData/languages.json'
import type {UploadUserFile } from 'element-plus'
import type { UploadFile } from 'element-plus'
import { ElMessage } from 'element-plus'


onMounted(() => {
  loadCountries()
})

const countries = ref([])

const loadCountries = () => {
  axios.get('http://127.0.0.1:8000/api/pais')
    .then(response => {
        countries.value = []
        response.data.data.forEach(pais => {
          countries.value.push(pais)
        });

        console.log(countries.value);
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
    return callback(new Error('Por favor ingrese el nombre de la región'))
  }
  else if (value.length < 3 || value.length > 50) {
    callback(new Error('El nombre de la región debe ser de 3 a 50 caracteres'))
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





const ruleForm = reactive({
  nombre_region: '',
  numero_region: '',
  zona: '',
  descripcion: '',
  activo: '',
  pais: ''
})



const is_country_active = ref('')

function cargarPaises() {
  axios.get(`http://127.0.0.1:8000/api/pais/${ruleForm.pais}`)
    .then(response => {
      is_country_active.value = response.data.data.activo

        if(is_country_active.value === 'Sí'){
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
  nombre_region: [{ validator: checkName, trigger: 'blur' }],
  numero_region: [{ validator: checkIsoCode, min: 7, trigger: 'blur' }]
})

const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.validate((valid) => {
    if (valid) {
      setTimeout(() => {
          loading.value = true
        }, 1000);
      const formData = new FormData()

      formData.append('nombre_region', ruleForm.nombre_region)
      formData.append('numero_region', ruleForm.numero_region)
      formData.append('zona', ruleForm.zona)
      formData.append('descripcion', ruleForm.descripcion.toString())
      formData.append('activo', ruleForm.activo)
      formData.append('pais_id', ruleForm.pais)


      console.log('Datos del formulario:', ruleForm)

      axios.post('http://127.0.0.1:8000/api/region', formData, {
        headers: {
          'Content-Type':'multipart/form-data'
        }
      })
      .then(function (response) {
        ElMessage({
          showClose: true,
          message: 'Nueva región creada correctamente',
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
      ruleForm.nombre_region = newUser.nombre_region
      ruleForm.numero_region = newUser.numero_region
      ruleForm.zona = newUser.zona
      ruleForm.descripcion = newUser.descripcion
      ruleForm.activo = newUser.activo
      ruleForm.pais_id = newUser.pais_id
    }
  },
  {immediate:true}
)

watch(
    () => ruleForm.pais,
    (newPais, oldPais) => {
        if (newPais !== oldPais) {
            cargarPaises()
        }
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
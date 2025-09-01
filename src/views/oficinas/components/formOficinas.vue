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
  <el-form-item label="Nombre de la oficina" prop="nombre_oficina">
    <el-input v-model.string="ruleForm.nombre_oficina" type="text" />
  </el-form-item>

  <el-form-item label="Codigo identificador" prop="codigo_oficina">
    <el-input v-model.string="ruleForm.codigo_oficina" type="text"/>
  </el-form-item>

  <!--Pruebas del formulario-->
  <el-form-item label="Dirección" prop="direccion">
    <el-input v-model.string="ruleForm.direccion" type="text"/>
  </el-form-item>


  <el-form-item label="Teléfono" prop="telefono">
    <el-input v-model.number="ruleForm.telefono" type="number">
        <template #prepend>+</template>
    </el-input>
</el-form-item>

  


<el-form-item
      prop="email_contacto"
      label="Email"
      :rules="[
        {
          required: true,
          message: 'Por favor ingrese una dirección de correo electrónico',
          trigger: 'blur',
        },
        {
          type: 'email',
          message: 'Por favor ingrese una dirección de correo electrónico válida',
          trigger: ['blur', 'change'],
        },
      ]"
    >
    <el-input v-model="ruleForm.email_contacto" />
  </el-form-item>

    
    <!--prueba2-->
    <el-form-item label="Municipio al cual pertenece" prop="municipio_id">
        <el-select v-model="ruleForm.municipio_id" placeholder="Seleccionar municipio">
            <el-option
            v-for="item in municipios"
            :key="item.id"
            :label="item.nombre_municipio"
            :value="item.id"
            />
        </el-select>
    </el-form-item>


    <el-form-item label="Horario de atención" prop="horario_atencion">
        <el-input
            type="textarea"
            v-model="ruleForm.horario_atencion"
            :rows="4"
            placeholder="Ingrese el horario de atención de la oficina"
        />
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
  loadMunicipies()
})

const municipios = ref([])

const loadMunicipies = () => {
  axios.get('http://127.0.0.1:8000/api/municipio')
    .then(response => {
        municipios.value = []
        response.data.lista.forEach(municipio => {
          municipios.value.push(municipio)
        });

        console.log('municipios cargados 101: ' + municipios.value);
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
    return callback(new Error('Por favor ingrese el nombre de la oficina'))
  }
  else if (value.length < 3 || value.length > 50) {
    callback(new Error('El nombre de la oficina debe ser de 3 a 50 caracteres'))
  } 
  else {
      callback()
  }
}

const checkOficinaCode = (rule: any, value: any, callback: any) => {
    setTimeout(() => {
        if (value.length < 1 || value.length > 10) {
        callback(new Error('Debe ingresar un valor válido'))
        } 
        else {
            callback()
        }
    }, 1000)
}
// Validación de dirección de oficina
const checkAddress = (rule: any, value: string, callback: any) => {
  setTimeout(() => {
    if (!value || value.trim() === '') {
      callback(new Error('La dirección no puede estar vacía'))
    } else if (value.length < 5) {
      callback(new Error('La dirección debe tener al menos 5 caracteres'))
    } else if (!/^[a-zA-Z0-9\s\-\#\.]+$/.test(value)) {
      callback(new Error('La dirección contiene caracteres inválidos'))
    } else {
      callback()
    }
  }, 500)
}

const checkPhone = (rule: any, value: any, callback: any) => {
  setTimeout(() => {
    const telefonoRegex = /^[0-9]{7,10}$/  // solo números de 7 a 10 dígitos
    
    if (!value) {
      callback(new Error('El teléfono es obligatorio'))
    } else if (!telefonoRegex.test(value)) {
      callback(new Error('El teléfono debe tener entre 7 y 10 dígitos numéricos'))
    } else {
      callback()
    }
  }, 500)
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
  nombre_oficina: '',
  codigo_oficina: '',
  direccion: '',
  telefono: '',
  email_contacto: '',
  horario_atencion: '',
  activo:'',
  municipio_id: ''
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





const rules = reactive<FormRules<typeof ruleForm>>({
  nombre_oficina: [{ validator: checkName, trigger: 'blur' }],
  codigo_oficina: [{ validator: checkOficinaCode, min: 7, trigger: 'blur' }],
  direccion: [{ validator: checkAddress, trigger: 'blur' }],
  telefono: [
    { required: true, message: 'Por favor ingrese un teléfono', trigger: 'blur' },
    { validator: checkPhone, trigger: 'blur' }
  ],
  email_contacto: [{ validator: check_region, trigger: 'blur' }],
  horario_atencion: [{ validator: check_region, trigger: 'blur' }],
  activo: [{ validator: check_region, trigger: 'blur' }],
  municipio_id: [{ validator: check_region, trigger: 'blur' }]
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
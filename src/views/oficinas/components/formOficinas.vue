<template>
  <el-form
    v-loading="loading"
    ref="ruleFormRef"
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


    <!--pruebas empleados-->
    <el-form-item label="Empleado a cargo de la oficina" prop="responsable_id">
        <el-select v-model="ruleForm.responsable_id" placeholder="Seleccionar empleado">
            <el-option
            v-for="item in empleado"
            :key="item.id"
            :label="item.name"
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
              Crear oficina
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
import Empleados from '../../Empleados/Empleados.vue'


onMounted(() => {
  loadMunicipies()
  cargar_empleados()
})

const municipios = ref([])

const loadMunicipies = () => {
  axios.get('http://127.0.0.1:8000/api/municipio')
    .then(response => {
        municipios.value = []
        response.data.data.forEach(municipio => {
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
      callback(new Error('El teléfono no debe ser de mas de 10 dígitos y no debe contener letras ni caracteres especiales'))
    } else {
      callback()
    }
  }, 500)
}


const checkEmail = (rule: any, value: any, callback: any) => {
  setTimeout(() => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    if (!value) {
      callback(new Error('El correo es obligatorio'))
    } else if (!emailRegex.test(value)) {
      callback(new Error('Ingrese un correo válido'))
    } else {
      callback()
    }
  }, 500)
}

const check_schedule = (rule: any, value: any, callback: any) => {
    setTimeout(() => {
        if (value === '' || value === null) {
        callback(new Error('Ingrese un horario de oficina'))
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
  municipio_id: '',
  responsable_id: ''
})

const is_municipio_active = ref('')

function cargar_municipios() {

    axios.get(`http://127.0.0.1:8000/api/municipio/${ruleForm.municipio_id}`)
    .then(response => {
        is_municipio_active.value = response.data.data.activo

        if(is_municipio_active.value === 'Si'){
            ruleForm.activo = 'Si'
        } else {
            ruleForm.activo = 'No'
        }
    }).catch(error => {
      console.error('Error al cargar los municipios:', error);
    });
}



//pruebas empleados

const empleado = ref('')

function cargar_empleados() {

    axios.get(`http://127.0.0.1:8000/api/empleado/${ruleForm.responsable_id}`)
     .then(response => {
        empleado.value = []
        response.data.empleado.forEach(emp => {
          empleado.value.push(emp)
        });

        console.log('empleados cargados 101: ' + empleado.value);
    })
    .catch(error => {
      console.error('Error al cargar los empleados:', error);
    })
}




const rules = reactive<FormRules<typeof ruleForm>>({
  nombre_oficina: [{ validator: checkName, trigger: 'blur' }],
  codigo_oficina: [{ validator: checkOficinaCode, min: 7, trigger: 'blur' }],
  direccion: [{ validator: checkAddress, trigger: 'blur' }],
  telefono: [
    { required: true, message: 'Por favor ingrese un teléfono', trigger: 'blur' },
    { validator: checkPhone, trigger: 'blur' }
  ],
  email_contacto: [
    { required: true, message: 'El correo es obligatorio', trigger: 'blur' },
    { validator: checkEmail, trigger: ['blur', 'change'] }
  ],
  horario_atencion: [{ validator: check_schedule, trigger: 'blur' }]
})

const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.validate((valid) => {
    if (valid) {
      setTimeout(() => {
          loading.value = true
        }, 1000);
      const formData = new FormData()

      formData.append('nombre_oficina', ruleForm.nombre_oficina)
      formData.append('codigo_oficina', ruleForm.codigo_oficina)
      formData.append('direccion', ruleForm.direccion)
      formData.append('telefono', ruleForm.telefono.toString())
      formData.append('email_contacto', ruleForm.email_contacto)
      formData.append('horario_atencion', ruleForm.horario_atencion.toString())
      formData.append('activo', ruleForm.activo === 1 ? 1 : 0)
      formData.append('responsable_id', ruleForm.responsable_id)
      formData.append('municipio_id', Number(ruleForm.municipio_id))

      axios.post('http://127.0.0.1:8000/api/oficina', formData, {
        headers: {
          'Content-Type':'multipart/form-data'
        }
      })
      .then(function (response) {
        ElMessage({
          showClose: true,
          message: 'Nueva oficina creada correctamente',
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
      ruleForm.nombre_oficina = newUser.nombre_oficina
      ruleForm.codigo_oficina = newUser.codigo_oficina
      ruleForm.telefono = newUser.telefono
      ruleForm.email_contacto = newUser.email_contacto
      ruleForm.horario_atencion = newUser.horario_atencion
      ruleForm.activo = newUser.activo
      ruleForm.municipio_id = newUser.municipio_id
    }
  },
  {immediate:true}
)

watch(
    () => ruleForm.municipio_id,
    (newMunicipio, oldMunicipio) => {
        if (newMunicipio !== oldMunicipio) {
            cargar_municipios()
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
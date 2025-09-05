<template>
  <el-form
    v-loading="loading"
    ref="ruleFormRef"
    :model="ruleForm"
    status-icon
    :rules="rules"
    class="demo-ruleForm"
  >
  <div class="container">
    <el-upload
  v-model:file-list="fileList"
  list-type="picture-card"
  style="margin-bottom: 20px;"
  :auto-upload="false"
  :limit="1"
  :on-change="handleFileChange"
  :on-exceed="handleExceed"
  accept="image/*"
  >
      <el-icon ><Plus/></el-icon>
  
      <template #file="{ file }">
        <div>
          <img class="el-upload-list__item-thumbnail" :src="file.url" alt="" />
          <span class="el-upload-list__item-actions">
            <span
              class="el-upload-list__item-preview"
              @click="handlePictureCardPreview(file)"
            >
              <el-icon style="color: aliceblue;"><ZoomIn/></el-icon>
            </span>
            <span
              v-if="!disabled"
              class="el-upload-list__item-delete"
              @click="handleDownload(file)"
            >
              <el-icon style="color: aliceblue;"><Download/></el-icon>
            </span>
            <span
              v-if="!disabled"
              class="el-upload-list__item-delete"
              @click="handleRemove(file)"
            >
              <el-icon style="color: aliceblue;"><Delete/></el-icon>
            </span>
          </span>
        </div>
      </template>
    </el-upload>
  
    <el-dialog class="preview-image1" v-model="dialogVisible">
      <img class="preview-image" :src="dialogImageUrl" alt="Preview Image" />
    </el-dialog>
  </div>

  <!--Form-->

  <el-form-item
      prop="email"
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
    <el-input v-model="ruleForm.email" />
  </el-form-item>

  <el-form-item label="Nombre completo" prop="name">
    <el-input v-model.string="ruleForm.name" placeholder="pe. Juan Felipe Medina Martinez"/>
  </el-form-item>

  <el-form-item label="Numero de cedula" prop="id_number">
    <el-input v-model.number="ruleForm.id_number"/>
  </el-form-item>

  <el-form-item label="Puntaje Global" prop="globalScore">
    <el-input disabled placeholder="0"/>
  </el-form-item>


  <el-form-item label="phone" prop="phone">
      <el-input v-model.number="ruleForm.phone" type="number" />
  </el-form-item>


    <el-form-item label="Password" prop="pass">
      <el-input v-model="ruleForm.pass" type="password" autocomplete="off" />
    </el-form-item>


    <el-form-item label="Confirm" prop="checkPass">
      <el-input
        v-model="ruleForm.checkPass"
        type="password"
        autocomplete="off"
      />


    </el-form-item>

     <el-form-item label="Fecha de nacimiento">
      <el-col>
        <el-date-picker
          v-model="ruleForm.date1"
          type="date"
          aria-label="Pick a date"
          placeholder="Pick a date"
          style="width: 100%"
        />
      </el-col>
    </el-form-item>

    <el-form-item label="Rol del colaborador" prop="rol">
      <el-select v-model="ruleForm.rol" placeholder="Selecciona un cargo">
        <el-option 
        v-for="item in positions.cargos"
        :key="item.value"
        :label="item.label"
        :value="item.value"
        />
      </el-select>
    </el-form-item>

    <el-form-item label="Oficinas disponibles">
      <el-select v-model="oficinaSeleccionada" placeholder="Seleccionar una oficina" >
              <el-option
              v-for="(cantidad, oficina) in conteoOficinas"
              :key="cantidad"
              :label="oficina"
              :value="oficina"
              />
        </el-select>
    </el-form-item>

     <el-form-item label="Acceso completo?" prop="delivery">
      <el-switch
      style="
      --el-switch-on-color: #8000ff;
      --el-switch-off-color: black;
      "
      v-model="statusSwitch" disabled/>
    </el-form-item>
    
    <el-form-item>
        <div class="container" style="display: flex; align-items: center; justify-content: center; margin-left: auto; margin-right: auto; margin-top: 15px;">
            <el-button style="color: aliceblue; background-color: blueviolet;" @click="submitForm(ruleFormRef)">
              Crear Empleado
            </el-button>
            <el-button @click="resetForm(ruleFormRef)">Resetear formulario</el-button>
        </div>      
    </el-form-item>
  </el-form>
</template>

<script lang="ts" setup>
import { reactive, ref , watch} from 'vue'
import { computed } from 'vue'
import axios from 'axios'
import type { FormInstance, FormRules } from 'element-plus'
import {Delete,Download,ZoomIn, Plus} from '@element-plus/icons-vue' 
import regions from '../../../components/generalData/regions.json'
import positions from '../../../components/generalData/positions.json'
import type {UploadUserFile } from 'element-plus'
import type { UploadFile } from 'element-plus'
import { ElMessage } from 'element-plus'
import { onMounted } from 'vue'

const loading = ref(false)

const fileList = ref<UploadUserFile[]>([])

const dialogImageUrl = ref('')
const dialogVisible = ref(false)
const disabled = ref(false)

const ruleFormRef = ref<FormInstance>()

const handleRemove = (file: UploadFile) => {
  fileList.value = fileList.value.filter(f => f.uid !== file.uid)
}

const handlePictureCardPreview = (file: UploadFile) => {
  dialogImageUrl.value = file.url!
  dialogVisible.value = true
}

const emit = defineEmits<{
  (e: 'image-selected', image:File): void
}>()

const handleFileChange = (file: UploadFile, fileListRaw: UploadFile[]) => {
  fileList.value = [fileListRaw[fileListRaw.length - 1]]

  if(file.raw instanceof File) {
    emit('image-selected', file.raw)
  }
}

const handleExceed = (files: File[], fileListRaw: UploadUserFile[]) => {
  fileList.value = [] 
  const newFile: UploadUserFile = {
    name: files[0].name,
    url: URL.createObjectURL(files[0])
  }
  fileList.value.push(newFile)
}

const handleDownload = (file: UploadFile) => {
  if(!file.url) return
  const link = document.createElement('a')
  link.href = file.url
  link.download = file.name || `${file} descargado con exito`
  link.click()
}

//form

const checkName = (rule: any, value: String, callback: any) => {
  if (!value) {
    return callback(new Error('Por favor ingrese el nombre completo del colaborador'))
  }
  setTimeout(() => {
    
    if (Number(value)) {
      callback(new Error('Debe ingresar solo valores alfabeticos'))
    }
    else if(value.length <= 3 || value.length > 255){
      callback(new Error('La longitud del nombre debe ser Min: 3, Max: 255'))
      callback(new alert(value.length))
    }
    else{
      callback()
    }
  }, 1000)
}

const checkuserId = (rule: any, value: any, callback: any) => {
  if (!value) {
    return callback(new Error('Debe ingresar un numero de cedula'))
  }
  setTimeout(() => {
    if (!Number.isInteger(value)) {
      callback(new Error(`${value} no es un id valido`))
    } else {
      if (value.toString().length < 7) {
        callback(new Error('El id no es valido'))
      } else {
        callback()
      }
    }
  }, 1000)
}

const checkphone = (rule: any, value: Number, callback: any) => {
  if (!value) {
    return callback(new Error('Por favor ingrese el telefono'))
  }
  setTimeout(() => {
    if (!Number.isInteger(value)) {
      callback(new Error('Solo valores numericos'))
    } 
    else if(value.toString().length < 9) {
        callback(new Error('esto no parece un numero de telefono'))
    }
    else {
        callback()
    }
  }, 1000)
}

const validatePass = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('Please input the password'))
  } else {
    if (ruleForm.checkPass !== '') {
      if (!ruleFormRef.value) return
      ruleFormRef.value.validateField('checkPass')
    }
    callback()
  }
}
const validatePass2 = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('Please input the password again'))
  } else if (value !== ruleForm.pass) {
    callback(new Error("Two inputs don't match!"))
  } else {
    callback()
  }
}

const imageUrlToSend = computed(() => {
  return fileList.value.length > 0 && fileList.value[0].url
    ? fileList.value[0].url
    : 'https://www.vhv.rs/dpng/d/505-5058560_person-placeholder-image-free-hd-png-download.png'
})

const ruleForm = reactive({
  pass: '',
  checkPass: '',
  name: '',
  date1:'',
  email:'',
  globalScore:0,
  phone: Number,
  rol:'',
  id_number:'',
  id_oficina:'',
  img:''
})


//nuevos valores

const oficinaSeleccionada = ref('')

const conteoOficinas = ref<Record<string, number>>({});

function clasificacion_oficinas() {
  axios.get("http://127.0.0.1:8000/api/oficina")
    .then(response => {
      const oficinas = response.data.data;

      const conteo: Record<string, number> = {};

      oficinas.forEach((oficina: any) => {
          const oficinaId = oficina.nombre_oficina; // Ej: Medellin1, Bogota1, etc.
          conteo[oficinaId] = (conteo[oficinaId] || 0) + 1;
      });

      conteoOficinas.value = conteo; // 👈 lo guardamos en la variable reactiva
    })
    .catch(error => {
      console.error("Error al obtener oficinas:", error);
    });
}
onMounted(() => {
  clasificacion_oficinas();
});

const statusSwitch = ref(false)

watch(()=> ruleForm.rol, (newRol) => {
  statusSwitch.value = newRol === 'director_de_tecnologia_ti' 
  || newRol === 'tecnico_de_sistemas'
  || newRol == 'presidente' 
  ? true : false
})

const rules = reactive<FormRules<typeof ruleForm>>({
  pass: [{ validator: validatePass, trigger: 'blur' }],
  checkPass: [{ validator: validatePass2, trigger: 'blur' }],
  name: [{ validator: checkName, min:3,trigger: 'blur' }],
  id_number: [{ validator: checkuserId, min:7,trigger: 'blur' }],
  phone: [{ validator: checkphone, trigger: 'blur' }],
})

const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.validate((valid) => {
    if (valid) {
      const formData = new FormData()

      formData.append('name', ruleForm.name)
      formData.append('age', ruleForm.date1.toString())
      formData.append('email', ruleForm.email)
      formData.append('globalScore', ruleForm.globalScore.toString())
      formData.append('phone', ruleForm.phone.toString())
      formData.append('password', ruleForm.pass)
      formData.append('rol', ruleForm.rol)
      formData.append('id_number', ruleForm.id_number)
      formData.append('img', imageUrlToSend.value)
      formData.append('id_oficina', oficinaSeleccionada.value)

      axios.post('http://127.0.0.1:8000/api/empleado', formData, {
        headers: {
          'Content-Type':'multipart/form-data'
        }
      })
      .then(function (response) {
        ElMessage({
          showClose: true,
          message: 'Nuevo colaborador creado correctamente',
          type:'success'
        })
        loading.value = false 
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
      ruleForm.name = newUser.name
      ruleForm.email = newUser.email
      ruleForm.id_number = newUser.id_number
      ruleForm.globalScore = newUser.globalScore
      ruleForm.phone = newUser.phone
      ruleForm.pass = newUser.pass
      ruleForm.rol = newUser.rol
      ruleForm.id_oficina = newUser.id_oficina
      ruleForm.date1 = newUser.date1
      ruleForm.img = newUser.img
    }
  },
  {immediate:true}
)
</script>

<style scoped>
.container{
  display: flex;
  justify-content: center;
  margin-top: -70px;
}
.preview-image{
  max-width: 500px;
  width: 100%;
  display: block;
  margin: 0 auto;
  border-radius: 8px;
}
</style>
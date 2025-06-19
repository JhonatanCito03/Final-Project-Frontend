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

  <div class="container">
    <el-upload
  v-model:file-list="fileList"
  list-type="picture-card"
  :auto-upload="false"
  :limit="1"
  :on-change="handleFileChange"
  :on-exceed="handleExceed"
  accept="image/*"
  >
      <el-icon><Plus /></el-icon>
  
      <template #file="{ file }">
        <div>
          <img class="el-upload-list__item-thumbnail" :src="file.url" alt="" />
          <span class="el-upload-list__item-actions">
            <span
              class="el-upload-list__item-preview"
              @click="handlePictureCardPreview(file)"
            >
              <el-icon style="color: aliceblue;"><zoom-in /></el-icon>
            </span>
            <span
              v-if="!disabled"
              class="el-upload-list__item-delete"
              @click="handleDownload(file)"
            >
              <el-icon style="color: aliceblue;"><Download /></el-icon>
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
          messphone: 'Please input email address',
          trigger: 'blur',
        },
        {
          type: 'email',
          messphone: 'Please input correct email address',
          trigger: ['blur', 'change'],
        },
      ]"
    >
    <el-input v-model="ruleForm.email" auto-complete="on"/>
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
      <el-input v-model.number="ruleForm.phone" type="Number" />
  </el-form-item>


  <el-form-item label="Clave encargado" prop="user1Pass">
    <el-input v-model="ruleForm.user1Pass" type="password" autocomplete="off" />
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


    <el-form-item label="Departamento" prop="region">
      <el-select v-model="ruleForm.region" placeholder="Selecciona un departamento">
        <el-option 
        v-for="item in regions.departamentos"
        :key="item.value"
        :label="item.label"
        :value="item.value"
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
      <el-button type="primary" @click="submitForm(ruleFormRef)">
        Submit
      </el-button>
      <el-button @click="resetForm(ruleFormRef)">Reset</el-button>
    </el-form-item>
  </el-form>
</template>

<script lang="ts" setup>
import { reactive, ref , watch} from 'vue'
import { computed } from 'vue'
import axios from 'axios'
import type { FormInstance, FormRules } from 'element-plus'
import regions from '../../../components/generalData/regions.json'
import positions from '../../../components/generalData/positions.json'
import type {UploadUserFile } from 'element-plus'
import type { UploadFile } from 'element-plus'
import { ElMessage } from 'element-plus'
import userInfo from '../../../../userInfo'
import {Plus,Delete,ZoomIn,Download} from '@element-plus/icons-vue'

const user1PassRq = ref('')
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
    ruleForm.img = URL.createObjectURL(file.raw)
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
      if (value.toString().length < 7) {
        callback(new Error('El id no es valido'))
      } else {
        callback()
      }
  }, 1000)
}

const checkphone = (rule: any, value: Number, callback: any) => {
  if (!value) {
    return callback(new Error('Por favor ingrese el telefono'))
  }
  setTimeout(() => {
    if(value.toString().length < 9) {
        callback(new Error('esto no parece un numero de telefono'))
    }
    else {
        callback()
    }
  }, 1000)
}
const validateUser1Pass = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('Ingrese su clave'))
  } else {
    if (ruleForm.user1Pass !== userInfo.userInfo.password) {
      ruleFormRef.value.validateField('checkPass')
    }
    callback()
  }
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

const props = defineProps({
  user: Object
})

console.log(props.user.id)

const ruleForm = reactive({
  user1Pass: '',
  pass: '',
  checkPass: '',
  name: '',
  date1:'',
  email:'',
  globalScore:0,
  phone: '',
  rol:'',
  id_number:0,
  region:'',
  img:''
})


const statusSwitch = ref(false)

watch(()=> ruleForm.rol, (newRol) => {
  statusSwitch.value = newRol === 'director_de_tecnologia_ti' 
  || newRol === 'tecnico_de_sistemas'
  || newRol == 'presidente' 
  ? true : false
})

const rules = reactive<FormRules<typeof ruleForm>>({
  user1Pass: [{validator: validateUser1Pass, trigger: 'blur'}],
  pass: [{ validator: validatePass, trigger: 'blur' }], //pruebas 1
  checkPass: [{ validator: validatePass2, trigger: 'blur' }],
  name: [{ validator: checkName, min:3,trigger: 'blur' }],
  id_number: [{ validator: checkuserId, min:7,trigger: 'blur' }],
  phone: [{ validator: checkphone, trigger: 'blur' }],
})

const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return

  formEl.validate((valid) => {
    if(!valid) return

    const dataToSend = {
      name: ruleForm.name,
      age: 0,
      email: ruleForm.email,
      globalScore:ruleForm.globalScore,
      phone: ruleForm.phone,
      id_number: ruleForm.id_number,
      password: ruleForm.pass,
      rol: ruleForm.rol,
      img: ruleForm.img,
      region: ruleForm.region
    }

    axios.patch(`http://127.0.0.1:8000/api/empleado/${props.user.id}`, dataToSend)
    .then((response) => {
      console.log(`Empleado ${props.user.name}, con el id ${props.user.id} actualizado`, response.data)
      ElMessage.success('Empleado actualizado')
    })
    .catch((error) => {
      console.error(`Error al actualizar a ${props.user.name}, empleado con el id ${props.user.id}`, error)
      ElMessage.error('Error al actualizar')
    })
  })
}

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()
}

watch(
  () => props.user,
  (nuevoUsuario) => {
    if (nuevoUsuario) {
      Object.assign(ruleForm, {
        pass: nuevoUsuario.password,
        name: nuevoUsuario.name || '',
        date1: nuevoUsuario.date1 || '',
        email: nuevoUsuario.email || '',
        globalScore: 0 || '',
        phone: nuevoUsuario.phone || '',
        rol: nuevoUsuario.rol || '',
        id_number: nuevoUsuario.id_number || '',
        region: nuevoUsuario.region || '',
        img: nuevoUsuario.img || '',
      })

      statusSwitch.value = ['director_de_tecnologia_ti','tecnico_de_sistemas','presidente'].includes(nuevoUsuario.rol)
    }
  },
  { immediate: true }
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
<template>
  <div class="container">
    <el-form
      ref="ruleFormRef"
      style="max-width: 600px;min-width: 300px;"
      :model="ruleForm"
      status-icon
      :rules="rules"
      label-width="auto"
      class="demo-ruleForm"
    >
    <el-form-item label="Usuario" prop="userId">
      <el-input v-model.number="ruleForm.userId" />
    </el-form-item>

      <el-form-item label="Password" prop="pass">
        <el-input v-model="ruleForm.pass" type="password" autocomplete="off" />
      </el-form-item>
      <div class="submitBtn">
        <el-form-item>
          <el-button @click="resetForm(ruleFormRef)">Resetear</el-button>
        <el-button type="primary" @click="submitForm(ruleFormRef)">
          Ingresar
        </el-button>
      </el-form-item>
      </div>
    </el-form>
  </div>
  
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
import { ElMessage, ElMessageBox } from 'element-plus'
import { useRouter } from 'vue-router'
import axios from 'axios'

const ruleFormRef = ref<FormInstance>()

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

const ruleForm = reactive({
  pass: '',
  userId: '',
})

const rules = reactive<FormRules<typeof ruleForm>>({
  pass: [{ validator: validatePass, trigger: 'blur' }],
  userId: [{ validator: checkuserId, trigger: 'blur' }],
})

const router = useRouter()
const userData = ref([])

const getData = axios.get('http://127.0.0.1:8000/api/empleado')
                .then((response) => {
                  userData.value = response.data.empleado
                  console.log(userData.value)
                })
                .catch((error) => {console.error(error)})

function validateUserData(registeredId,registeredPassword) {
  const exists = userData.value.some(user => user.id_number === registeredId && user.password === registeredPassword)
  if (exists) {
    ElMessage({
      message:'Los datos son correctos. Será redirigido a la página principan de TrueMaster',
      type:'success'
    })
    setTimeout(() => {
      router.push('/empleados')
    }, 1000);
  }
  else{
    console.error('la cedula no existe')
  }

  return exists
}


const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.validate((valid) => {
    if (valid) {
      validateUserData(ruleForm.userId.toString().trim(),ruleForm.pass.toString().trim())
    } else {
      console.log('error submit!')
    }
  })
}

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()
}
</script>
<style scoped>
.container{
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
}
.submitBtn{
  display: flex;
  justify-content: center;
  text-align: center;
  align-items: center;
}
</style>
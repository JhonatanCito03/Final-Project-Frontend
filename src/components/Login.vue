<template>
<h3 style="text-align: center; font-size: 100px;">BIENVENIDO A</h3>
<h2 style="text-align: center; font-size: 100px; margin-top: -145px;">TRUEMASTER</h2>

<div style="display: flex; justify-content: center;align-items: center;">
<el-form 
    ref="ruleFormRef"
    :model="ruleForm"
    status-icon
    :rules="rules"
    label-width="auto"
    class="demo-ruleForm"
    >
    <el-form-item label="Nombre" prop="age">
    <el-input v-model.string="ruleForm.age" />
    </el-form-item>
    <el-form-item label="Contraseña" prop="pass" >
      <el-input v-model="ruleForm.pass" type="password" autocomplete="off" />
    </el-form-item>

    <el-form-item style="margin-left: 70px; margin-right: auto; margin-top: 30px;">
            <el-button type="primary" @click="submitForm(ruleFormRef), $router.push('/empleados') ">
                Ingresar
            </el-button>
            <el-button @click="resetForm(ruleFormRef)">Borrar</el-button>   
    </el-form-item>
  </el-form>
</div>


  <TMV/>



</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'


const ruleFormRef = ref<FormInstance>()

const checkName = (rule: any, value: any, callback: any) => {
  if (!value) {
    return callback(new Error('Por favor ingrese su nombre'))
  }
}

const validatePass = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('Por favor ingrese una contraseña válida'))
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
  checkPass: '',
  age: '',
})

const rules = reactive<FormRules<typeof ruleForm>>({
  pass: [{ validator: validatePass, trigger: 'blur' }],
  age: [{ validator: checkName, trigger: 'blur' }],
})

const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.validate((valid) => {
    if (valid) {
      console.log('subido!')
    } else {
      console.log('error!')
    }
  })
}

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()
}


</script>

<style>

</style>
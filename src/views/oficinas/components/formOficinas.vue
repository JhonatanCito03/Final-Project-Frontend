<template>
    <el-form
      ref="ruleFormRef"
      style="max-width: 700px; margin-left: auto; margin-right: auto;"
      justify="center"
      :model="ruleForm"
      :rules="rules"
      label-width="auto"
      class="demo-ruleForm"
      :size="formSize"
      status-icon
    >
      <el-form-item label="Nombre de la oficina" prop="name">
        <el-input v-model="ruleForm.name" />
      </el-form-item>

      <el-form-item label="Código de la oficina" prop="code">
        <el-input v-model="ruleForm.code" />
      </el-form-item>
      

      <el-form-item style="display: flex; margin-left: 250px; margin-right: auto;">
        <el-button color="#8000ff" @click="submitForm(ruleFormRef)">
          Crear Oficina
        </el-button>
        <el-button @click="resetForm(ruleFormRef)">Resetear</el-button>
      </el-form-item>
    </el-form>
  </template>
  
  <script lang="ts" setup>
  import { reactive, ref } from 'vue'
  import type { ComponentSize, FormInstance, FormRules } from 'element-plus'
  
  interface RuleForm {
    name: string
    code: string
    prefijo: string
  }
  
  const formSize = ref<ComponentSize>('default')
  const ruleFormRef = ref<FormInstance>()
  const ruleForm = reactive<RuleForm>({
    name: '',
    code: '',
    prefijo: ''
  })
  
  const locationOptions = ['Home', 'Company', 'School']
  
  const rules = reactive<FormRules<RuleForm>>({
    name: [
      { required: true, message: 'Por favor ingresa el nombre del país', trigger: 'blur' },
      { min: 3, max: 20, message: 'la longitud debe serde entre 3 to 20 carácteres', trigger: 'blur' },
    ],
    code: [
      { required: true, message: 'Por favor ingresa el código del país', trigger: 'blur' },
      { min: 3, max: 10, message: 'La longitud debe ser de entre 3 y 10', trigger: 'blur' },
    ],
    prefijo: [
      {
        required: true,
        message: 'Selecciona el prefijo del país',
        trigger: 'change',
      },
    ],
  })
  
  const submitForm = async (formEl: FormInstance | undefined) => {
    if (!formEl) return
    await formEl.validate((valid, fields) => {
      if (valid) {
        console.log('país creado!')
      } else {
        console.log('error al crear país!', fields)
      }
    })
  }
  
  const resetForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.resetFields()
  }
  </script>
<template>
  <el-form :model="ruleForm" label-width="120px">
    <el-form-item label="Nombre">
      <el-input v-model="ruleForm.name" />
    </el-form-item>

    <el-form-item label="Correo">
      <el-input v-model="ruleForm.email" />
    </el-form-item>

    <el-form-item label="Cédula">
      <el-input v-model="ruleForm.id_number" />
    </el-form-item>

    <el-form-item label="Teléfono">
      <el-input v-model="ruleForm.phone" />
    </el-form-item>

    <el-form-item label="Fecha nacimiento">
      <el-date-picker v-model="ruleForm.date1" type="date" />
    </el-form-item>

    <el-form-item label="Rol">
      <el-input v-model="ruleForm.rol" />
    </el-form-item>

    <el-form-item label="Región">
      <el-input v-model="ruleForm.region" />
    </el-form-item>
  </el-form>
</template>

<script setup>
import { reactive, watch } from 'vue'

const props = defineProps({
  user: Object
})

const ruleForm = reactive({
  name: '',
  email: '',
  id_number: '',
  phone: '',
  date1: '',
  rol: '',
  region: '',
  pass: '',
  checkPass: '',
})

// Rellenar los campos cuando cambie el `user`
watch(
  () => props.user,
  (nuevoUsuario) => {
    if (nuevoUsuario) {
      Object.assign(ruleForm, {
        name: nuevoUsuario.name || '',
        email: nuevoUsuario.email || '',
        id_number: nuevoUsuario.id_number || '',
        phone: nuevoUsuario.phone || '',
        date1: nuevoUsuario.date1 || '',
        rol: nuevoUsuario.rol || '',
        region: nuevoUsuario.region || '',
        pass: '',
        checkPass: ''
      })
    }
  },
  { immediate: true }
)
</script>

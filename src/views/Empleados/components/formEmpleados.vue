<template>
  <div class="container">
    <el-form
    ref="ruleFormRef"
    style="max-width: 600px; "
    :model="ruleForm"
    :rules="rules"
    label-width="auto"
  >

    <el-form-item label="Nombre Completo" prop="name">
      <el-input v-model="ruleForm.name" />
    </el-form-item>


    <el-form-item label="Correo" prop="name">
      <el-input v-model="ruleForm.name" />
    </el-form-item>
    
    
    <el-form-item label="Puntaje Global" prop="name">
      <el-input v-model="ruleForm.name" />
    </el-form-item>

    <el-form-item label="Rol" prop="name">
      <el-input v-model="ruleForm.name" />
    </el-form-item>

    <el-form-item label="Telefono/celular" prop="name">
      <el-input v-model="ruleForm.name" />
    </el-form-item>

    <el-tooltip
      class="box-item"
      effect="light"
      content="Región a la que pertenece el/la colaborador/a"
      placement="top-start">
    <el-form-item label="Departamento" prop="region">
        <el-select v-model="ruleForm.region" placeholder="Región">
          <el-option label="Amazonas" value="Amazonas" />
              <el-option label="Amazonas" value="amazonas" />
              <el-option label="Antioquia" value="antioquia" />
              <el-option label="Arauca" value="arauca" />
              <el-option label="Atlántico" value="atlantico" />
              <el-option label="Bolívar" value="bolivar" />
              <el-option label="Boyacá" value="boyaca" />
              <el-option label="Caldas" value="caldas" />
              <el-option label="Caquetá" value="caqueta" />
              <el-option label="Casanare" value="casanare" />
              <el-option label="Cauca" value="cauca" />
              <el-option label="Cesar" value="cesar" />
              <el-option label="Chocó" value="choco" />
              <el-option label="Córdoba" value="cordoba" />
              <el-option label="Cundinamarca" value="cundinamarca" />
              <el-option label="Guainía" value="guainia" />
              <el-option label="Guaviare" value="guaviare" />
              <el-option label="Huila" value="huila" />
              <el-option label="La Guajira" value="laguajira" />
              <el-option label="Magdalena" value="magdalena" />
              <el-option label="Meta" value="meta" />
              <el-option label="Nariño" value="narino" />
              <el-option label="Norte de Santander" value="nortedesantander" />
              <el-option label="Putumayo" value="putumayo" />
              <el-option label="Quindío" value="quindio" />
              <el-option label="Risaralda" value="risaralda" />
              <el-option label="San Andrés y Providencia" value="sanandresyprovidencia" />
              <el-option label="Santander" value="santander" />
              <el-option label="Sucre" value="sucre" />
              <el-option label="Tolima" value="tolima" />
              <el-option label="Valle del Cauca" value="valledelcauca" />
              <el-option label="Vaupés" value="vaupes" />
              <el-option label="Vichada" value="vichada" />
        </el-select>
      </el-form-item>
    </el-tooltip>

    <el-form-item label="Tipo de colaborador" prop="count">
      <el-select-v2
        v-model="ruleForm.count"
        placeholder="seleccionar"
        :options="options"
      />
    </el-form-item>


    <el-form-item label="Fecha de nacimiento" required>
      <el-col>
        <el-form-item prop="date1">
          <el-date-picker
            v-model="ruleForm.date1"
            type="date"
            aria-label="Pick a date"
            placeholder="Pick a date"
            style="width: 100%"
          />
        </el-form-item>
      </el-col>
    </el-form-item>


    <el-form-item label="Es?" prop="delivery">
      <el-switch v-model="ruleForm.delivery" />
    </el-form-item>
    <el-form-item label="Tipo de cargo" prop="type">
      <el-checkbox-group v-model="ruleForm.type">
        <el-checkbox value="Online activities" name="type">
          Online activities
        </el-checkbox>
        <el-checkbox value="Promotion activities" name="type">
          Promotion activities
        </el-checkbox>
        <el-checkbox value="Offline activities" name="type">
          Offline activities
        </el-checkbox>
        <el-checkbox value="Simple brand exposure" name="type">
          Simple brand exposure
        </el-checkbox>
      </el-checkbox-group>
    </el-form-item>
    <el-form-item style="margin-left: auto; margin-right: auto;" class="btns">
      <el-button  type="danger" @click="resetForm(ruleFormRef)">Reset</el-button>
    </el-form-item>
  </el-form>
</div>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
import {CaretTop} from '@element-plus/icons-vue'
interface RuleForm {
  name: string
  region: string
  count: string
  date1: string
  date2: string
  delivery: boolean
  location: string
  type: string[]
  resource: string
  desc: string
}

const ruleFormRef = ref<FormInstance>()
const ruleForm = reactive<RuleForm>({
  name: 'Hello',
  region: '',
  count: '',
  date1: '',
  date2: '',
  delivery: false,
  location: '',
  type: [],
  resource: '',
  desc: '',
})


const rules = reactive<FormRules<RuleForm>>({
  name: [
    { required: true, message: 'Please input Activity name', trigger: 'blur' },
    { min: 3, max: 5, message: 'Length should be 3 to 5', trigger: 'blur' },
  ],
  region: [
    {
      required: true,
      message: 'Please select Activity zone',
      trigger: 'change',
    },
  ],
  count: [
    {
      required: true,
      message: 'Please select Activity count',
      trigger: 'change',
    },
  ],
  date1: [
    {
      type: 'date',
      required: true,
      message: 'Please pick a date',
      trigger: 'change',
    },
  ],
  date2: [
    {
      type: 'date',
      required: true,
      message: 'Please pick a time',
      trigger: 'change',
    },
  ],
  location: [
    {
      required: true,
      message: 'Please select a location',
      trigger: 'change',
    },
  ],
  type: [
    {
      type: 'array',
      required: true,
      message: 'Please select at least one activity type',
      trigger: 'change',
    },
  ],
  resource: [
    {
      required: true,
      message: 'Please select activity resource',
      trigger: 'change',
    },
  ],
  desc: [
    { required: true, message: 'Please input activity form', trigger: 'blur' },
  ],
})

const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      console.log('submit!')
    } else {
      console.log('error submit!', fields)
    }
  })
}

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()
}

const options = Array.from({ length: 10000 }).map((_, idx) => ({
  value: `${idx + 1}`,
  label: `${idx + 1}`,
}))
</script>



<style scoped>
.container{
  color: white;
}
</style>
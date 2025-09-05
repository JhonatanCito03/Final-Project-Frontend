<template>
  <LayoutMain>
    <template #slotLayout>
         <el-form
            ref="ruleFormRef"
            style="max-width: 800px; margin-left: auto; margin-right: auto;"
            justify="center"
            :model="ruleForm"
            status-icon
            :rules="rules"
            label-width="auto"
            class="demo-ruleForm"
            >
            <el-form-item label="Nombre de la ejecucion" prop="nombre_registro">
            <el-input v-model="ruleForm.nombre_registro" />
            </el-form-item>



            <el-form-item label="Valor de la ejecucion" prop="valor">
            <el-input v-model="ruleForm.valor" type="Number" autocomplete="off" />
            </el-form-item>


            <el-form-item label="Asesor ejecutor de la meta" prop="empleado_id">
            <el-select v-model="ruleForm.empleado_id" placeholder="Seleccione el asesor ejecutor">
                <el-option
                v-for="item in listaEmpleados"
                :key="item.id"
                :label="item.name"
                :value="item.id"
                />
            </el-select>
            </el-form-item>

            <el-form-item label="Fecha de la ejecución" prop="fecha_registro">
                <el-select v-model="ruleForm.fecha_registro" placeholder="Seleccione la fecha">
                    <el-option
                    v-for="item in fechas"
                    :key="item.id"
                    :label="item.date"
                    :value="item.date"
                    />
                </el-select>
            </el-form-item>

            <el-form-item label="Nombre de la oficina" prop="oficina_id">
            <el-select v-model="ruleForm.oficina_id" placeholder="Seleccione la oficina">
                <el-option
                v-for="item in listaOficinas"
                :key="item.id"
                :label="item.nombre_oficina"
                :value="item.id"
                />
            </el-select>
            </el-form-item>

             

            <el-form-item style="margin-left: 350px;">
            <el-button type="primary" @click="submitForm(ruleFormRef)">
                Submit
            </el-button>
            <el-button @click="resetForm(ruleFormRef)">Reset</el-button>
            </el-form-item>


        </el-form>
    </template>
  </LayoutMain>


</template>

<script lang="ts" setup>
import LayoutMain from '../../components/LayoutMain.vue';
import fechas from '../Metas/fechas.json'

import { onMounted, reactive, ref } from 'vue'

import type { FormInstance, FormRules } from 'element-plus'
import axios from 'axios';

const ruleFormRef = ref<FormInstance>()

const checkProcessName = (rule: any, value: any, callback: any) => {
  if (!value) {
    return callback(new Error('Debe ingresar el nombre de la ejecucion'))
  }
  setTimeout(() => {
    if (Number(value)) {
      callback(new Error('Por favor ingrese solo caracteres'))
    } else{
      callback()
    }
  }, 1000)
}

const validate_val = (rule: any, value: number, callback: any) => {
    setTimeout(() => {
        if (!value) {
            callback(new Error('Ingrese un valor valido'))
        } else {
            callback()
        }
    }, 1000)
}

const ruleForm = reactive({
    nombre_registro: '',
    valor: 0,
    empleado_id: '',
    fecha_registro: '',
    oficina_id: ''
})

const rules = reactive<FormRules<typeof ruleForm>>({
  nombre_registro: [{ validator: checkProcessName, trigger: 'blur' }],
  valor: [{ validator: validate_val, trigger: 'blur' }],
  oficina_id: [{ required: true, message: 'Seleccione una oficina', trigger: 'blur' }],
  empleado_id: [{ required: true, message: 'Seleccione un empleado', trigger: 'blur' }],
  fecha_registro: [{ required: true, message: 'Seleccione una fecha', trigger: 'blur' }],
})

const listaEmpleados = ref<Array<{ id: number; name: string }>>([])

function getEmpleados() {
  axios.get('http://127.0.0.1:8000/api/empleado')
  .then(response => {
    listaEmpleados.value = response.data.empleado
    console.log(listaEmpleados.value)
  })
  .catch(error => {
    console.error('Error fetching empleados:', error);
  })
  .finally(() => {
    // Any cleanup or final actions can be performed here
  })
}
const listaOficinas = ref<Array<{ id: number; name: string }>>([])

function getOficinas() {
  axios.get('http://127.0.0.1:8000/api/oficina')
  .then(response => {
    listaOficinas.value = response.data.data
    console.log(listaOficinas.value)
  })
  .catch(error => {
    console.error('Error fetching oficinas:', error);
  })
  .finally(() => {
    // Any cleanup or final actions can be performed here
  })
}

const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.validate((valid) => {
    if (valid) {
      axios.post('http://127.0.0.1:8000/api/registro_ejecucion', ruleForm)
        .then(response => {
          console.log('Form submitted successfully:', response.data);
        })
        .catch(error => {
          console.error('Error submitting form:', error);
        });
    } else {
      console.log('error submit!')
    }
  })
}

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()
}


onMounted(() => {
  getEmpleados()
  getOficinas()
})
</script>

<style scoped>

</style>


                   
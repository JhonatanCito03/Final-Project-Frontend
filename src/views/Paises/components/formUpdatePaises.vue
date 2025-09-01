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
  <el-form-item label="Nombre del país" prop="country_name">
    <el-input v-model.string="ruleForm.country_name" />
  </el-form-item>

  <el-form-item label="Código ISO" prop="ISO">
    <el-input v-model.string="ruleForm.ISO" type="text"/>
  </el-form-item>

<el-form-item label="Prefijo Telefónico" prop="phonePrefix">
    <el-input v-model.number="ruleForm.phonePrefix" type="number">
        <template #prepend>+</template>
    </el-input>
</el-form-item>

          <!--prueba2-->
    <el-form-item label="Moneda" prop="moneda">
      <el-select v-model="ruleForm.moneda" placeholder="Seleccionar moneda">
        <el-option 
        v-for="item in coinType.moneda"
        :key="item.value"
        :label="item.label"
        :value="item.value"
        />
      </el-select>
    </el-form-item>


    <el-form-item label="Idioma" prop="idioma">
      <el-select v-model="ruleForm.idioma" placeholder="Seleccionar idioma principal">
        <el-option 
        v-for="item in languages.idioma"
        :key="item.value"
        :label="item.label"
        :value="item.value"
        />
      </el-select>
    </el-form-item>

     <el-form-item label="¿Está activo?" prop="activo">
      <el-select v-model="ruleForm.activo" placeholder="Seleccione estado">
        <el-option label="Sí, está activo" value="Sí" />
        <el-option label="No, no está activo" value="No" />
      </el-select>
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

import coinType from '../../../components/generalData/coinType.json'
import languages from '../../../components/generalData/languages.json'
import {Plus,Delete,ZoomIn,Download} from '@element-plus/icons-vue'
import { id } from 'element-plus/es/locales.mjs'

const user1PassRq = ref('')
const loading = ref(false)

const fileList = ref<UploadUserFile[]>([])

const dialogImageUrl = ref('')
const dialogVisible = ref(false)
const disabled = ref(false)

const ruleFormRef = ref<FormInstance>()


//form


const checkName = (rule: any, value: String, callback: any) => {
  if (!value) {
    return callback(new Error('Por favor ingrese el nombre del país'))
  }
  else if (value.length < 3 || value.length > 50) {
    callback(new Error('El nombre del país debe ser de 3 a 50 caracteres'))
  } 
  else {
      callback()
  }
}

const checkIsoCode = (rule: any, value: any, callback: any) => {
    setTimeout(() => {
        if (value.length < 1 || value.length > 4) {
        callback(new Error('Debe ingresar un valor válido'))
        } 
        else {
            callback()
        }
    }, 1000)
}

const checkphonePrefix = (rule: any, value: Number, callback: any) => {
  
  setTimeout(() => {
    if (!value) {
    return callback(new Error('Por favor ingrese el prefijo telefónico'))
    }
    if (value.toString().length > 10) {
        callback(new Error('esto no parece un prefijo telefónico válido'))
    }
    else {
        callback()
    }
  }, 1000)
}

const checkCoin = (rule: any, value: String, callback: any) => {
  if (value == 0) {
    return callback(new Error('Por favor seleccione una moneda'))
  }
  callback()
}

const checkLanguage = (rule: any, value: String, callback: any) => {
  if (!value) {
    return callback(new Error('Por favor seleccione un idioma'))
  }
  callback()
}
const checkActive = (rule: any, value: any, callback: any) => {
  if (!value) {
    return callback(new Error('Por favor seleccione un estado'))
  }
  callback()
}

const props = defineProps({
  pais: Object
})

//console.log(props.pais.id)

const ruleForm = reactive({
  id: null as number | null,
  country_name: '',
  phonePrefix: 0,
  moneda: '',
  idioma:'',
  ISO:'',
  activo:''
})

const rules = reactive<FormRules<typeof ruleForm>>({
  country_name: [{ validator: checkName, trigger: 'blur' }],
  ISO: [{ validator: checkIsoCode, min: 7, trigger: 'blur' }],
  phonePrefix: [{ validator: checkphonePrefix, trigger: 'blur' }],
  moneda: [{ validator: checkCoin, trigger: 'blur' }],
  idioma: [{ validator: checkLanguage, trigger: 'blur' }],
  activo: [{ validator: checkActive, trigger: 'blur' }],
})



const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return

  formEl.validate((valid) => {
    if(!valid) return

    const dataToSend = {
      country_name: ruleForm.country_name,
      phonePrefix: ruleForm.phonePrefix,
      moneda: ruleForm.moneda,
      idioma: ruleForm.idioma,
      ISO: ruleForm.ISO,
      activo: ruleForm.activo
    }

    console.log("ID que se envía:", ruleForm.id, dataToSend)

    axios.patch(`http://127.0.0.1:8000/api/pais/${ruleForm.id}`, dataToSend)
    .then((response) => {
      console.log(`pais ${props.pais.name}, con el id ${ruleForm.id} actualizado`, response.data)
      ElMessage.success('pais actualizado')
    })
    .catch((error) => {
      console.error(`Error al actualizar a ${props.pais.name}, pais con el id ${ruleForm.id}`, error)
      ElMessage.error('Error al actualizar')
    })
  })
}

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()
}

watch(
  () => props.pais,
  (nuevoPais) => {
    console.log("Pais que llega del padre:", nuevoPais) //pruebas para ver si realmente funciona
    if (nuevoPais) {
      Object.assign(ruleForm, {
        id: nuevoPais.id,
        country_name: nuevoPais.nombre_pais || '',
        phonePrefix: nuevoPais.prefijo_telefonico || 0,
        moneda: nuevoPais.moneda || '',
        idioma: nuevoPais.idioma_principal || '',
        ISO: nuevoPais.codigo_iso || '',
        activo: nuevoPais.activo || ''
      })

      console.log("Formulario actualizado con los datos del país:", ruleForm)
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
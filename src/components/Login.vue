<template>
  <div>
    <!--Loader-->
    <about_ v-if="showLoader"/>

    <div v-else>
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
        <el-form-item label="Cedula" prop="id">
        <el-input v-model.string="ruleForm.id" />
        </el-form-item>
        <el-form-item label="Contraseña" prop="pass" >
          <el-input v-model="ruleForm.pass" type="password" autocomplete="off" />
        </el-form-item>

        <el-form-item style="margin-left: 70px; margin-right: auto; margin-top: 30px;">
                <el-button type="primary" @click="submitForm(ruleFormRef)">
                    Ingresar
                </el-button>
                <el-button @click="resetForm(ruleFormRef)">Borrar</el-button>   
        </el-form-item>
      </el-form>
    </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import usuario from '../../userInfo'
import { useRouter } from 'vue-router'
import UserData from '../../userData.json'
import { onMounted, reactive, ref } from 'vue'
import type { FormInstance, FormRules} from 'element-plus'
import {ElMessageBox} from 'element-plus'
import userInfo from '../../userInfo'
import about_ from './docs/docs_truemaster.vue'


// App.vue o cualquier componente
import Lenis from '@studio-freight/lenis'


    onMounted(() => {
      const lenis = new Lenis()

      function raf(time: number) {
        lenis.raf(time)
        requestAnimationFrame(raf)
      }

      requestAnimationFrame(raf)
    })



const showLoader = ref(true)

onMounted(() => {
  setTimeout(() => {
    showLoader.value = false
  }, 4200);
})


const router = useRouter()
const ruleFormRef = ref<FormInstance>()


//mensaje
const dialogVisible = ref(false)

//contador de veces
let valorContador = reactive({
  counter : 0
}) 

console.log('contador = '+ valorContador.counter)

const handleClose = (done: () => void) => {
  ElMessageBox.confirm('Estas seguro?')
.then(() => {
  done()
})  
.catch(() => {
  // catch error
})
}
//cuidado


//Pruebas generales, no tomar en cuenta hasta que se haya comprobado

const checkid = (rule: any, value: any, callback: any) => {
  if (!value) {
    return callback(new Error('Por favor ingrese su nombre'))
  }

  const idExists = UserData.tableData.some(
    (user: { id: string }) => user.id === value
  )
 

  if (!idExists) {
    return callback(new Error('Nombre no encontrado en el sistema'))
  }

  callback()
}

const validatePass = (rule: any, value: any, callback: any) => {
  if (value === '') {
   return callback(new Error('Por favor ingrese una contraseña'))
  } 
  const userExists = UserData.tableData.some(
    (user: { id: string; password: string}) =>
      user.id === ruleForm.id && user.password === value 
    )
    
    if (!userExists) {
      return callback(new Error('Contraseña incorrecta para el usuario ingresado'))
    }

    return callback()
  

}
//fin de las pruebas



const ruleForm = reactive({
  pass: '',
  checkPass: '',
  name: '',
  id: '',
  rol:'',
  message:'',
  img:'',
  region:''
})

const rules = reactive<FormRules<typeof ruleForm>>({
  pass: [{ validator: validatePass, trigger: 'blur' }],
  id: [{ validator: checkid, trigger: 'blur' }],
})

//caso de estudio
const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return

  formEl.validate((valid) => {
    if (valid) {

      const matchedUser = UserData.tableData.find(
        (user: { id: string; password: string; name: string; rol:string;message:string;img:string; region:string }) =>
          user.id === ruleForm.id && user.password === ruleForm.pass
      )

      if (matchedUser) {
        ruleForm.name = matchedUser.name
        ruleForm.rol = matchedUser.rol
        ruleForm.message = matchedUser.message
        ruleForm.img = matchedUser.img
        ruleForm.region = matchedUser.region

        userInfo.userInfo.id = ruleForm.id
        userInfo.userInfo.name = ruleForm.name
        userInfo.userInfo.img = ruleForm.img
        userInfo.userInfo.region = ruleForm.region
        userInfo.userInfo.message = ruleForm.message
        userInfo.userInfo.rol = ruleForm.rol
        userInfo.userInfo.password = ruleForm.pass
      }
      router.push('/empleados')
    } else {
      if(valorContador.counter < 7){
        ElMessageBox.alert('Nombre o contraseña inválidos', 'Error de autenticación', {
        confirmButtonText: 'Aceptar',
        type: 'error',
      })
      }
      valorContador.counter += 1
    }

    if (valorContador.counter === 7) {
      ElMessageBox.alert('Usted ha sido bloqueado de nuestro sistema', 'Debe comunicarse al 3113353728', {
        confirmButtonText: 'Confirmar',
        type: 'error',
      }).then(() => {
        router.push('/report')
      })
    }
  })
}
//caso de estudio


const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()
}


</script>

<style scoped>
html, body {
  height: 100%;
  overflow: hidden; /* importante para que lenis controle el scroll */
}
</style>
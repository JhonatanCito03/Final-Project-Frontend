<template>
    <el-form
      ref="ruleFormRef"
      style="max-width: 700px; margin-left: auto; margin-right: auto;"
      justify="center"
      :model="ruleForm"
      :rules="rules"
      label-width="auto"
      :size="formSize"
      status-icon
    >
    <p>creación de {{nombre}}</p>
      <el-form-item label="Primer nombre" prop="name">
        <el-input v-model="formulario.name" />
      </el-form-item>

      <el-form-item label="Segundo nombre" prop="secondName">
        <el-input v-model="formulario.secondName" />
      </el-form-item>

      <el-form-item label="Primer apellido" prop="lastName">
        <el-input v-model="formulario.lastName" />
      </el-form-item>

      <el-form-item label="Segundo apellido" prop="secLastName">
        <el-input v-model="formulario.secLastName" />
      </el-form-item>

      <el-form-item label="Número de cédula" prop="idNumber">
        <el-input v-model="formulario.idNumber" />
      </el-form-item>

      <el-form-item label="Fecha de nacimiento" prop="bornDate">
        <el-input v-model="formulario.bornDate" />
      </el-form-item>

      <el-form-item label="Fecha de integración" prop="integrationDate">
        <el-input v-model="formulario.integrationDate" />
      </el-form-item>


      <el-form-item style="display: flex; margin-left: 250px; margin-right: auto;">
        <el-button color="#8000ff" @click="submitForm(ruleFormRef)">
          Crear empleado
        </el-button>
        <el-button @click="resetForm(ruleFormRef)">Resetear</el-button>
      </el-form-item>
    

</el-form>

</template>
  

  <script setup>

  import { onMounted, reactive, ref, watch } from 'vue'
  
  const propiedad = defineProps({
    areas: {
      type: Array,
      required: true,
    },
    dataValue: Object,
  });
  
  const formSize = ref('default')
  const formRef = ref()
  const formulario = reactive({
  name: '',
  secondName: '',
  lastName:'',
  secLastName:'',
  idNumber:'',
  bornDate:'',
  integrationDate:''
  })
  
  const datosFormulario = () => {
  
    formulario.name = propiedad.dataValue[0].primer_nombre;
    formulario.secondName = propiedad.dataValue[0].segundo_nombre;
    formulario.lastName = propiedad.dataValue[0].primer_apellido;
    formulario.secLastName = propiedad.dataValue[0].segundo_apellido;
    formulario.idNumber = propiedad.dataValue[0].cedula;
    formulario.bornDate = propiedad.dataValue[0].fecha_nacimiento;
    formulario.integrationDate = propiedad.dataValue[0].fecha_integracion;
  }
  
  const rulesForm = reactive({
    name: [
      { required: true, message: 'Por favor ingrese el nombre', trigger: 'blur' }
    ],
    secondName: [
      {
        required: false,
        message: 'Ingrese el segundo nombre',
        trigger: 'blur',
      },
    ],
    lastName: [
      {
        required: true,
        message: 'ingrese el apellido',
        trigger: 'blur',
      },
    ],
    seclastName: [
      {
        required: false,
        message: 'ingrese el segundo apellido',
        trigger: 'blur',
      },
    ],

    idNumber: [
      {
        required: true,
        message: 'ingrese la cedula',
        trigger: 'blur',
      },
    ],

    bornDate: [
      {
        required: true,
        message: 'ingrese la fecha de nacimiento',
        trigger: 'blur',
      },
    ],

    integrationDate: [
      {
        required: true,
        message: 'ingrese la fecha de integracion',
        trigger: 'blur',
      },
    ],


  })
  
  const limpiarFormulario = () => {
    formRef.value.resetFields()
  }
  
  const validarFormulario = () => {
  
    return new Promise((resolve) => {
      formRef.value?.validate((valid) => {
        if (valid) {
                resolve(true)
              } else {
                  resolve(false)             
              }
              
          })
          })        
  
      
  }
  
  watch(
    () => propiedad.dataValue,
    (newData) => {
      datosFormulario();
    }
  );
  
  defineExpose({validarFormulario,formulario,limpiarFormulario})
  
  
  
  </script>
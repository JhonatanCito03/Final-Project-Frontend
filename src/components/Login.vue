<template>
  <div class="ground">
 <div class="wrapper">
    <el-form>
      <h1>Inicio de sesion</h1>
      <h2 style="text-align: center;"> Software TrueMaster</h2>
      <div class="input-box">
        <input type="number" placeholder="Ingrese su id" required v-model="id_numberInt">
      </div>

      <div class="input-box">
        <input type="password" placeholder="Ingrese la clave" required v-model="passwordInt">
      </div>

      <div class="remember-forgot">
        <label><input type="checkbox">Recordarme</label>
        <a href="#">Olvide mi contrasena?</a>
      </div>

      <button type="submit" class="btn" @click.prevent="exists">Ingresar</button>
    </el-form>
  </div>
</div>
</template>


<script lang="ts" setup>
import axios from 'axios'
import { onMounted,ref } from 'vue';
import { ElMessage } from 'element-plus'
import { useRouter } from 'vue-router';
import userInfo from '../../userInfo';

const dataUsers = ref([])
const id_numberInt = ref('')
const passwordInt = ref('')
const userName = ref('')

const router = useRouter()

const loading = ref(true)

function loadData(){
  try {
    axios.get('http://127.0.0.1:8000/api/empleado')
    .then(response => {
      dataUsers.value = response.data.empleado
    })
    .catch(error => {console.log(error)})
    }
    catch(error){
      console.log(error)
    }
  } 


function exists(){
const validate = dataUsers.value.some(user => {
  const is_valid = 
  user.id_number === id_numberInt.value.toString().trim() &&
  user.password === passwordInt.value.toString().trim()

  if(is_valid){
    userName.value = user.name

    userInfo.userInfo.name = user.name
    userInfo.userInfo.age = user.age
    userInfo.userInfo.email = user.email
    userInfo.userInfo.globalScore = user.globalScore
    userInfo.userInfo.phone = user.phone
    userInfo.userInfo.rol = user.rol
    userInfo.userInfo.password = user.password
    userInfo.userInfo.id_number = user.id_number
    userInfo.userInfo.img = user.img
    userInfo.userInfo.region = user.region
  }

  return is_valid
});

 if (validate) {
    ElMessage({
    message: `Bienvenido operador: ${userName.value}`,
    type: 'success',
  })
    router.push('/empleados')
  } else {

    if(id_numberInt.value === '' || passwordInt.value === ''){
      ElMessage.error('Debe ingresar algun dato')
    }
    else{
      ElMessage.error('Los datos no son validos por favor intentelo de nuevo')
    }
  }

}

 
onMounted(async () => {
  loadData()
})

const props = defineProps({
  is_logged: {
    type: String,
    required: true
  }
})
</script>


<style>
@import url('https://fonts.googleapis.com/css2?family=Ancizar+Serif:ital,wght@0,300..900;1,300..900&display=swap');

*{
  margin: 0;
  padding: 0; 
  box-sizing: border-box;
  font-family: "Ancizar Serif", serif;
}
.ground{
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background:url(/Images/background2.png) no-repeat;
  background-size: cover;
  background-position: center;
}

.el-form{
  margin-top: 60px;
}

.wrapper h1{
  font-size: 46px;
  text-align: center;
  color: #fff;
}
.wrapper h2{
  font-size: 26px;
  text-align: center;
  color: #ffffff;
  animation: tratarTexto 5s linear infinite;
}

/* animaciones */
@keyframes tratarTexto {
  0%   { filter: contrast(1) invert(0); }
  50%  { filter: contrast(50%) invert(0.6); }
  100% { filter: contrast(1) invert(0); }
}

.wrapper{
  width: 550px;
  height: 550px;
  background: transparent;
  border: 2px solid rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(20px);
  box-shadow: 10px 10px 10px rgba(162, 14, 208, 0.2);
  color: #ffffff;
  border-radius: 10px;
  padding: 30px 40px;
}


.wrapper .input-box{
width: 100%;
height: 60px;
margin: 30px 0;
}

.input-box input{
width: 100%;
height: 100%;
background: rgb(255, 255, 255);
border: none;
outline: none;
border: 2px solid rgb(255, 255, 255); /* aqui va el borde de los inputs */
border-radius: 40px;
font-size: 16px;
color: #000000;
padding: 20px 45px 20px 20px;
}
.input-box input::placeholder{
  color: #000000;
}

.wrapper .remember-forgot{
  display: flex;
  justify-content: space-between;
  font-size: 14.5px;
  margin: -15px 0 15px;
}

.remember-forgot label input{
  accent-color: #ffffff;
  margin-right: 3px;
}
.remember-forgot a {
  color: #f8f8f8;
  text-decoration: none;
}

.remember-forgot a:hover {
  text-decoration: underline;
}

.wrapper .btn{
  width: 100%;
  height: 45px;
  background: #fff;
  border: none;
  outline: none;
  border-radius: 40px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  font-size: 16px;
  color: #333;
  font-weight: 600;
}

.wrapper .register-link{
  font-size: 14.5px;
  text-align: center;
  margin: 20px 0 15px;
}

.register-link p a {
  color: #fff;
  text-decoration: none;
  font-weight: 600;
}

.register-link p a:hover{
  text-decoration: underline;
}
</style>
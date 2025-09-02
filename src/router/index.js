import {createRouter , createWebHistory} from 'vue-router';
import Empleados from '../views/Empleados/Empleados.vue';


// Diseño completo con todos los componentes (pruebas)
import Paises from '../views/Paises/paises.vue';
import Regiones from '../views/Regiones/regiones.vue';
import Municipios from '../views/Municipios/municipios.vue';
import Oficinas from '../views/Oficinas/Oficinas.vue';
import metas from '../views/Metas/metas.vue';



import Login from '../components/Login.vue';


const routes = [
    {
        path:'/',
        name: 'home',
        component:Login
    },
    {
        path:'/empleados',
        name: 'empleados',
        component:Empleados
    },
    {
        path:'/paises',
        name: 'paises',
        component:Paises
    },
    {
        path:'/regiones',
        name: 'regiones',
        component:Regiones
    },
    {
        path:'/municipios',
        name: 'municipios',
        component:Municipios
    },
    {
        path:'/oficinas',
        name: 'oficinas',
        component:Oficinas
    },
    {
        path:'/metas',
        name: 'metas',
        component:metas
    }
]

const router = createRouter({
    history:createWebHistory(),
    routes,
})

export default router;
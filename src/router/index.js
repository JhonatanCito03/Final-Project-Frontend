import {createRouter , createWebHistory} from 'vue-router';
import Empleados from '../views/Empleados/Empleados.vue';


// Diseño completo con todos los componentes (pruebas)
import Paises from '../views/Paises/paises.vue';
import Regiones from '../views/Regiones/regiones.vue';
import Municipios from '../views/Municipios/municipios.vue';
import Oficinas from '../views/Oficinas/Oficinas.vue';
import metas from '../views/Metas/metas.vue';
import tablaGeneral from '../views/Metas/tablaGeneral.vue';
import nuevo_valor from '../views/creacion_valor/nuevo_valor.vue';
import registro_ejecucion from '../views/registro_ejecucion/registro_ejecucion.vue';



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
    },
    {
        path:'/nuevo_valor',
        name: 'nuevo_valor',
        component:nuevo_valor
    },
    {
        path:'/tablaGeneral',
        name: 'tablaGeneral',
        component:tablaGeneral
    },
    {
        path:'/registro_ejecucion',
        name: 'registro_ejecucion',
        component:registro_ejecucion
    }

]

const router = createRouter({
    history:createWebHistory(),
    routes,
})

export default router;
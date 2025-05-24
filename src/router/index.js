import {createRouter , createWebHistory} from 'vue-router';
import Empleados from '../views/Empleados/Empleados.vue';
import LayoutMain from '../components/LayoutMain.vue';
import Login from '../components/Login.vue';
import versions from '../views/version/versiones.vue';
import blank from '../components/users/blankdoc.vue';
import Navbar from '../components/Navbar.vue';
import Paises from '../views/Paises/Paises.vue';
import Oficinas from '../views/oficinas/oficinas.vue';
import Regiones from '../views/regiones/regiones.vue';
import Municipios from '../views/municipios/municipios.vue';
import Dptos from '../views/dptos/dptos.vue';
import docs_truemaster from '../components/docs/docs_truemaster.vue';
import animaciones from '../components/docs/animaciones.vue';
import metas_captacion from '../views/estadisticas_metas/metas_personales/personal_captacion.vue'
import metas_colocacion from '../views/estadisticas_metas/metas_personales/personal_colocacion.vue'
import metas_mixtas from '../views/estadisticas_metas/metas_personales/personal_mixto.vue'
import prueba from '../views/prueba.vue';


import r_empleados from '../views/rankings/r_empleados/r_empleados.vue';

const routes = [
    {
        path:'/pruebas',
        name: 'pruebas',
        component:prueba
    },
    {
        path:'/',
        name: 'home',
        component:Login
    },
    {
        path:'/about',
        name: 'docs_truemaster',
        component:docs_truemaster
    },
    {
        path:'/animaciones',
        name: 'animaciones',
        component:animaciones
    },
    {
        path:'/report',
        name: 'blank',
        component:blank
    },
    {
        path:'/versions',
        name: 'versions',
        component:versions
    },
    {
        path:'/paises',
        name: 'paises',
        component:Paises
    },
    {
        path:'/oficinas',
        name: 'oficinas',
        component:Oficinas
    },
    {
        path:'/regiones',
        name: 'Regiones',
        component:Regiones
    },
    {
        path:'/municipios',
        name: 'municipios',
        component:Municipios
    },
    {
        path:'/empleados',
        name: 'empleados',
        component:Empleados
    },
    {
        path:'/departamentos',
        name: 'departamentos',
        component:Dptos
    },
    {
        path:'/metas_captacion_index',
        name: 'metas_captacion',
        component:metas_captacion
    },
    {
        path:'/metas_colocacion_index',
        name: 'metas_colocacion',
        component:metas_colocacion
    },
    {
        path:'/metas_mixtas_index',
        name: 'metas_mixtas',
        component:metas_mixtas
    },
    {
        path:'/r_empleados',
        name: 'r_empleados',
        component:r_empleados
    }
]

const router = createRouter({
    history:createWebHistory(),
    routes,
})

export default router;
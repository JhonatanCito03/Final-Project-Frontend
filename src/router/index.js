import {createRouter , createWebHistory} from 'vue-router';
import Ejemplo from '../views/ejemplo.vue';
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


import r_empleados from '../views/rankings/r_empleados/r_empleados.vue';

const routes = [
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
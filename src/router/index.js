import {createRouter , createWebHistory} from 'vue-router';
import Ejemplo from '../views/ejemplo.vue';
import Empleados from '../views/Empleados/Empleados.vue';
import LayoutMain from '../components/LayoutMain.vue';
import Login from '../components/Login.vue';
import versions from '../views/version/versiones.vue';
import blank from '../components/users/blankdoc.vue';
import Navbar from '../components/Navbar.vue';
import Paises from '../views/Paises/Paises.vue';
import Cargos from '../views/Cargos/Cargos.vue';
import Oficinas from '../views/oficinas/oficinas.vue';
import Regiones from '../views/regiones/regiones.vue';
import Municipios from '../views/municipios/municipios.vue';
import MetasMunicipios from '../views/metasMunicipios/metasMunicipios.vue';
import MetasOficinas from '../views/metasOficinas/metasOficinas.vue';
import MetasDptos from '../views/metasDptos/metasDptos.vue';
import Dptos from '../views/dptos/dptos.vue';


import r_empleados from '../views/rankings/r_empleados/r_empleados.vue';

const routes = [
    {
        path:'/',
        name: 'home',
        component:Login
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
        path:'/cargos',
        name: 'cargos',
        component:Cargos
    },
    //Mas componentes
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
        path:'/metasMunicipios',
        name: 'metasMunicipios',
        component:MetasMunicipios
    },
    {
        path:'/metasOficinas',
        name: 'metasOficinas',
        component:MetasOficinas
    },
    {
        path:'/metasDptos',
        name: 'metasDptos',
        component:MetasDptos
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
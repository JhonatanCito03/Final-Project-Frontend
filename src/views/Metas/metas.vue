<template>
  <LayoutMain>
    <template #slotLayout>

  <el-row :gutter="16" style="margin-top: 10px; margin-bottom: 15px; display: grid; grid-template-columns: repeat(auto-fill, minmax(400px, 1fr)); text-decoration:overline; font-family: 'Courier New', Courier, monospace;">
    <el-col :xs="24" :sm="12" :md="8" class="mb-4">
      <div class="statistic-card">
        <el-statistic :value="valorFormateado">
          <template #title>
            <div style="display: inline-flex; align-items: center; font-size: medium;">
              Valor de meta global (anual) organizacional
              <el-tooltip
                effect="dark"
                content="Valor de la meta registrado por el presidente de la compañía"
                placement="top"
              >
                <el-icon style="margin-left: 4px" :size="12">
                  <Warning />
                </el-icon>
              </el-tooltip>
            </div>
          </template>
        </el-statistic>
      </div>
    </el-col>



    <el-col :xs="24" :sm="12" :md="8" class="mb-4">
      <div class="statistic-card">
        <el-statistic :value="valorFormateadoDiario((valor_meta / dias))" >
          <template #title>
            <div style="display: inline-flex; align-items: center; font-size: medium;">
              Valor de meta global (diario) organizacional
              <el-tooltip
                effect="dark"
                content="Valor de la meta por asesor registrado por el presidente de la compañía"
                placement="top"
              >
                <el-icon style="margin-left: 4px" :size="12">
                  <Warning />
                </el-icon>
              </el-tooltip>
            </div>
          </template>
        </el-statistic>
      </div>
    </el-col>




    <el-col :xs="24" :sm="12" :md="8" class="mb-4">
      <div class="statistic-card">
        <el-statistic :value="valorFormateadoDiario((valor_meta / asesor_de_oficina))" >
          <template #title>
            <div style="display: inline-flex; align-items: center; font-size: medium;">
              Valor de meta global (anual) por asesor
              <el-tooltip
                effect="dark"
                content="Valor de la meta por asesor registrado por el presidente de la compañía"
                placement="top"
              >
                <el-icon style="margin-left: 4px" :size="12">
                  <Warning />
                </el-icon>
              </el-tooltip>
            </div>
          </template>
        </el-statistic>
      </div>
    </el-col>
    <el-col :xs="24" :sm="12" :md="8" class="mb-4">
      <div class="statistic-card">
        <el-statistic :value="valorFormateadoDiario((valor_meta / asesor_de_oficina)/dias)" title="New transactions today">
          <template #title>
            <div style="display: inline-flex; align-items: center; font-size: medium;">
              Valor de meta global (diaria) por asesor
            </div>
          </template>
        </el-statistic>
      </div>
    </el-col>
  </el-row>

  <div class="container-values" >
    <div>
        <table border="1" width="100%" height="100%">
          <thead>
            <tr>
              <th width="150">Oficina</th>
              <th width="100">Número de asesores</th>
              <th width="200">Valor de meta DIARIO correspondido</th>
              <th width="200">Ejecucion</th>
              <th width="200">Valor de meta ANUAL correspondido</th>
              <th width="200">Acumulada</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(cantidad, oficina) in conteoAsesores" :key="oficina">
              <td>{{ oficina }}</td>
              <td>{{ cantidad }}</td>
              <td>{{ formatoMonedaCOP(cantidad * ((valor_meta / asesor_de_oficina) / dias)) }}</td>
              <td></td>
              <td>{{ formatoMonedaCOP(cantidad * ((valor_meta / asesor_de_oficina))) }}</td>
              <td></td>
            </tr>
          </tbody>
        </table>
      </div>
  </div>
</template>

  </LayoutMain>
</template>

<script lang="ts" setup>
import axios from 'axios';
import LayoutMain from '../../components/LayoutMain.vue';
import fechas from './fechas.json'
import { computed, onMounted, ref, watch } from 'vue'
import tablaGeneral from './tablaGeneral.vue'

onMounted(() => {
  meta_global();
  clasificacion_empleados();
  cant_dias();
  clasificacion_oficinas();
});

const valor_meta = ref(0)


function meta_global() {
  axios.get('http://127.0.0.1:8000/api/meta_presidencia/1')
    .then(response => {
      valor_meta.value = response.data.data.valor_objetivo;
      console.log(response.data);
    })
    .catch(error => {
      console.error('There was an error!', error);
    });
}

const formatoMoneda = new Intl.NumberFormat('es-ES', { 
      style: 'currency',
      currency: 'COP', 
      minimumFractionDigits: 2 
    });

const valorFormateado = computed(() => formatoMoneda.format(valor_meta.value));



function valorFormateadoDiario(valor: number) {
  return formatoMoneda.format(valor);
}


function formatoMonedaCOP(valor: number): string {
  const formato = new Intl.NumberFormat('es-ES', { 
    style: 'currency',
    currency: 'COP', 
    minimumFractionDigits: 2 
  });

  return formato.format(valor || 0); 
}


const options = fechas.map((fecha) => ({
  value: fecha.id,
  label: fecha.date,
}))



let presidente = ref(0)
let gerente_general = ref(0)
let gerente_zonal = ref(0)
let gerente_de_oficina = ref(0)
let subgerente = ref(0)
let director_comercial = ref(0)
let director_financiero = ref(0)
let director_de_riesgos = ref(0)
let director_de_tecnologia_ti = ref(0)
let director_de_talento_humano = ref(0)
let director_de_oficina = ref(0)
let contador = ref(0)
let coordinador_operativo = ref(0)
let coordinador_de_credito_y_cartera = ref(0)
let asesor_de_oficina = ref(0)
let asesor_comercial = ref(0)
let auxiliar_administrativo = ref(0)
let auxiliar_contable = ref(0)
let cajero = ref(0)
let analista_de_credito = ref(0)
let analista_de_cartera = ref(0)
let auxiliar_de_servicio_al_cliente = ref(0)
let auxiliar_de_archivo = ref(0)
let tecnico_de_sistemas = ref(0)



function clasificacion_empleados() {
  axios.get('http://127.0.0.1:8000/api/empleado')
  .then(response => {
    const empleados = response.data.empleado;

    empleados.forEach((cargo: string) => {
      switch (cargo.rol) {
        case 'presidente':
          presidente.value++;
          break;
        case 'director_de_oficina':
          director_de_oficina.value++;
          break;
        case 'gerente_general':
          gerente_general.value++;
          break;
        case 'gerente_zonal':
          gerente_zonal.value++;
          break;
        case 'gerente_de_oficina':
          gerente_de_oficina.value++;
          break;
        case 'Subgerente':
          subgerente.value++;
          break;
        case 'Director Comercial':
          director_comercial.value++;
          break;
        case 'Director Financiero':
          director_financiero.value++;
          break;
        case 'Director de Riesgos':
          director_de_riesgos.value++;
          break;
        case 'Director de Tecnología TI':
          director_de_tecnologia_ti.value++;
          break;
        case 'Director de Talento Humano':
          director_de_talento_humano.value++;
          break;
        case 'Contador':
          contador.value++;
          break;
        case 'Coordinador Operativo':
          coordinador_operativo.value++;
          break;
        case 'Coordinador de Crédito y Cartera':
          coordinador_de_credito_y_cartera.value++;
          break;
        case 'asesor_de_oficina':
          asesor_de_oficina.value++;
          break;
        case 'Asesor Comercial':
          asesor_comercial.value++;
          break;
        case 'Auxiliar Administrativo':
          auxiliar_administrativo.value++;
          break;
        case 'auxiliar_contable':
          auxiliar_contable.value++;
          break;
        case 'cajero':
          cajero.value++;
          break;
        case 'Analista de Crédito':
          analista_de_credito.value++;
          break;
        case 'Analista de Cartera':
          analista_de_cartera.value++;
          break;
        case 'Auxiliar de Servicio al Cliente':
          auxiliar_de_servicio_al_cliente.value++;
          break;
        case 'Auxiliar de Archivo':
          auxiliar_de_archivo.value++;
          break;
        case 'Técnico de Sistemas':
          tecnico_de_sistemas.value++;
          break;
      }
    })
  })
}



const conteoAsesores = ref<Record<string, number>>({});

function clasificacion_oficinas() {
  axios.get("http://127.0.0.1:8000/api/empleado")
    .then(response => {
      const empleados = response.data.empleado;

      const conteo: Record<string, number> = {};

      empleados.forEach((empleado: any) => {
        if (empleado.rol === "asesor_de_oficina") {
          const oficina = empleado.id_oficina; // Ej: Medellin1, Bogota1, etc.
          conteo[oficina] = (conteo[oficina] || 0) + 1;
        }
      });

      conteoAsesores.value = conteo; // 👈 lo guardamos en la variable reactiva
    })
    .catch(error => {
      console.error("Error al obtener empleados:", error);
    });
}

let dias = ref(0);

function cant_dias() {
  fechas.forEach((fecha: any) => {
    dias.value += 1;
  });
}

const selectedValues = ref<any[]>([])



</script>

<style scoped>
.demo-progress .el-progress--line {
  margin-bottom: 15px;
  max-width: 600px;
}
body {
  margin: 0;
}
.el-table {
  color: rgb(0, 0, 0);
}
.el-table > label {
  width: 100px;
  color: rgb(0, 0, 0);
}
.imageUpload {
  text-decoration: underline;
  text-align: center;
  margin-top: -30px;
  margin-bottom: 10px;
}
.example-showcase .el-loading-mask {
  z-index: 9;
}
</style>

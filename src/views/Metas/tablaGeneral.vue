<template>
  <LayoutMain>
    
    <template #slotLayout>

        <el-select v-model="oficina_seleccionada" placeholder="Seleccionar una oficina" style="width: 240px">
            <el-option
            v-for="(cantidad, oficina) in conteoAsesores"
            :key="oficina"
            :label="oficina"
            :value="oficina"
            />
        </el-select>


         <el-table :data="fechas"style="margin-top: 20px" >
          <el-table-column prop="date" label="Fecha" width="180" />

          <!-- Columnas dinámicas según la oficina seleccionada -->
          <template v-for="n in conteoAsesores[oficina_seleccionada] || 0" :key="n">
            <el-table-column
              :class-name="`col-dia`"
              :label="`Asesor ${n}: Día`"
              :prop="`asesor_${n}_dia`"
            />
            <el-table-column
              :class-name="`col-acumulado`"
              :label="`Asesor ${n}: Acumulado`"
              :prop="`asesor_${n}_acumulado`"
            />
          </template>

          <!-- Totales -->
          <el-table-column label="Total oficina: Día" :class-name="`col-dia`" />
          <el-table-column label="Total oficina: Acumulado" :class-name="`col-acumulado`" />
        </el-table>


    </template>
  </LayoutMain>


</template>

<script lang="ts" setup>
import LayoutMain from '../../components/LayoutMain.vue';
import { onMounted, ref } from 'vue';
import axios from 'axios';

const oficina_seleccionada = ref('');
const conteoAsesores = ref<Record<string, number>>({});
const fechas = ref<any[]>([]);

// 1. Cargar oficinas y asesores
async function clasificacion_oficinas() {
  try {
    const response = await axios.get("http://127.0.0.1:8000/api/empleado");
    const empleados = response.data.empleado;

    const conteo: Record<string, number> = {};
    empleados.forEach((empleado: any) => {
      if (empleado.rol === "asesor_de_oficina") {
        const oficina = empleado.id_oficina;
        conteo[oficina] = (conteo[oficina] || 0) + 1;
      }
    });

    conteoAsesores.value = conteo;
  } catch (error) {
    console.error("Error al obtener empleados:", error);
  }
}

// 2. Cargar registros y transformarlos
async function clasificacion_registros() {
  try {
    const response = await axios.get("http://127.0.0.1:8000/api/registro_ejecucion");
    const registros = response.data.lista;

    // Agrupar por fecha
    const agrupado: Record<string, any> = {};

    registros.forEach((r: any) => {
      const fecha = r.fecha_registro;
      if (!agrupado[fecha]) {
        agrupado[fecha] = { date: fecha };
      }

      // Ejemplo: si el id del asesor es 1
      agrupado[fecha][`asesor_${r.empleado_id}_dia`] = r.valor;
      agrupado[fecha][`asesor_${r.empleado_id}_acumulado`] =
        (agrupado[fecha][`asesor_${r.empleado_id}_acumulado`] || 0) + r.valor;
    });

    // Convertir objeto → array para la tabla
    fechas.value = Object.values(agrupado);
  } catch (error) {
    console.error("Error al obtener registros:", error);
  }
}

onMounted(() => {
  clasificacion_oficinas();
  clasificacion_registros();
});
</script>

<style scoped>

:deep(.el-table th), :deep(.el-table td) {
  text-align: center; /* Centrar el texto en las celdas */
  border: 1px solid #7a7a7a; /* Añadir borde a las celdas */
  padding: 8px; /* Añadir algo de espacio interno */
}

:deep(.col-dia) {
  background-color: #dfdfdf; /* Color de fondo azul claro */
  text-align: center; /* Centrar el texto en las celdas */
  font-weight: bold; /* Negrita para destacar */
}


:deep(.col-acumulado) {
  background-color: #a5a4a4; /* Color de fondo naranja claro */
}

</style>


                   
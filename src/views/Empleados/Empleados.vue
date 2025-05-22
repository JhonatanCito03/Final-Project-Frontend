<template>
  <LayoutMain>
      <template #slotLayout>
          <Header   
          :titulo="'Empleados'"
          :tituloBoton="'Crear Empleado'"
          :abrir="abrirFormulario"
          ></Header>

        <Formulario :titulo="'Gestion de Empleados'" v-model:is-open="mostrarFormulario" :is-edit="editandoFormulario">
            <template #slotForm>
                <el-row :gutter="20">
                <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                <FormularioEmpleados 
                v-model:is-open="mostrarFormulario" :is-edit="editandoFormulario"  
                />
                </el-col>
                </el-row>
            </template>
            
        </formulario>

              <el-table :data="usersJSON.tableData" stripe style="width: 70%; margin-left: auto; margin-right: auto;">
                  <el-table-column label="Foto" width="100">
                        <template #default="{ row }">
                        <img :src="row.img" style="width: 50px; height: 50px; object-fit: cover;" />
                        </template>
                  </el-table-column>
                  <el-table-column prop="id" label="N°Identidad" width="180"/>
                  <el-table-column prop="name" label="Nombre" width="280" />
                  <el-table-column fixed="right" prop="globalScore" label="Avance de metas " width="120"/>
                  <el-table-column prop="rol" label="Cargo en la empresa" width="180" />
                  <el-table-column prop="region" label="Region" width="140" />
                  <el-table-column fixed="right" label="Acciones" min-width="80">
                    <template #default>
                    <el-button link size="large" :icon="Edit" @click="editarFormulario" >                  
                    </el-button>
                    <el-button link type="danger" :icon="Delete" ></el-button>
                    </template>
                  </el-table-column>
              </el-table>

      </template>
  </LayoutMain>
</template>

<script lang="ts" setup>
  import {Edit,Delete} from '@element-plus/icons-vue'
  import LayoutMain from '../../components/LayoutMain.vue';
  import Formulario from "../../components/formulario.vue";
  import Header from '../../components/Header.vue';
  import usersJSON from '../../../userData.json'
</script>

<style scoped>
.el-table{
    color: rgb(0, 0, 0);
}
.el-table > label{
    width: 100px;
    color: rgb(0, 0, 0);
}

</style>

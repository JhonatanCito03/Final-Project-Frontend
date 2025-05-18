<template>
  <LayoutMain #slotLayout>
    
    <h2 style="text-align: center;"><strong>Ranking Empleados</strong></h2>
    <hr>
    <div style="margin-top: 50px; ">
        <el-table :data="tableData" height="250" style="width: 100%">
        <el-table-column prop="name" label="Nombre del empleado:"/>
        <el-table-column prop="age" label="Edad del empleado:"/>
        <el-table-column prop="globalScore" label="Puntuacion global del empleado:" />
        </el-table>
    </div>

    <h2 style="text-align: center;"><strong>3 mejores empleados de lo que va del mes</strong></h2>
    <hr>
    <div style="margin-top: 50px; ">
        <el-table :data="top3Employees" height="auto" style="width: 100%">
        <el-table-column prop="name" label="Nombre del empleado:"/>
        <el-table-column prop="age" label="Edad del empleado:"/>
        <el-table-column prop="globalScore" label="Puntuacion global del empleado:" />
        </el-table>
    </div>
  </LayoutMain>
</template>

<script setup>
import LayoutMain from '../../../components/LayoutMain.vue';
import TMV from '../../version/versiones.vue';
import usersJSON from '../../../../userData.json'

    const tableData = usersJSON.tableData
    console.log(tableData)

    const sortedByScore = [...tableData].sort((a, b) => b.globalScore - a.globalScore)
    const top3Scores = [...new Set(sortedByScore.map(emp => emp.globalScore))].slice(0, 3)
    const top3Employees = tableData.filter(emp => top3Scores.includes(emp.globalScore))
    
</script>

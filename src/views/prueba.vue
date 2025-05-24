<template>
    <div>
        <h2>Hola</h2>
    </div>
</template>

<script setup>
import {ref,onMounted} from 'vue'
import axios from 'axios'

const tableData = ref([])

onMounted(() => {
    axios.get('http://127.0.0.1:8000/api/empleado')
    .then(response => {
        tableData.value = response.data.empleado
        tableData.value.forEach(empleado => {
            console.log(empleado.name)
            console.log(empleado.img)
        })
    })
    .catch(error => {
        console.error('error al cargar los datos: ', error)
    })
})


</script>

<style scoped>

</style>
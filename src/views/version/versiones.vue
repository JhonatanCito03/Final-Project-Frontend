<template>
<LayoutMain #slotLayout>
    <div>
        <div id="title" style="text-align: center;">
            <h3 style="font-size: 60px;">Protocolo de versiones</h3>

            <form style="display: grid; justify-content: center;" @submit.prevent="console.log('submitted')">
                <select name="select" id="select1">
                <option style="display: none;">Selecciona una opcion</option>
                <option v-for="item in list[0]" :key="item">{{ item }}</option>
                </select>
                
                <select name="select2" id="select2">
                <option style="display: none;">Usuario a cargo</option>
                <option v-for="user in userList" :key="user">{{ user }}</option>
                </select>
                <button id="submit">Realizar peticion</button>
            </form>
        </div>
    </div>

</LayoutMain>
</template>

<script setup>
import LayoutMain from '../../components/LayoutMain.vue';
const list = [{
    0 : 'Crear datos de actualizacion',
    1 : 'Crear datos de nuevo parche',
    2 : 'Crear datos en actualizacion existente',
    3 : 'Crear nuevo protocolo'
    }   
]

 const tableData = usersJSON.tableData
 let userList = []
 for(const value in tableData){
    userList.push(tableData[value]['name']) 
 }
 console.log(userList)

 


</script>

<style scoped>
#select1{
    width: 600px;
    height: 40px;
    font-size: large;
    border-color: rgb(56, 56, 56);
    border-radius: 10px;
}

#select1:hover{
    height: 40px;
    font-size: large;
    border-color: rgb(115, 0, 255);
    transition: cubic-bezier(0.68, -0.55, 0.265, 1.55);
}

#select2{
    margin-top: 10px;
    width: 600px;
    height: 40px;
    font-size: large;
    border-color: rgb(56, 56, 56);
    border-radius: 10px;
}

#select2:hover{
    height: 40px;
    font-size: large;
    border-color: rgb(115, 0, 255);
    transition: cubic-bezier(0.68, -0.55, 0.265, 1.55);
}
#submit{
    margin-top: 10px;
    border-radius: 6px;
    border-color: rgb(115, 0, 255);
    width: fit-content;
    height: 30px;
    margin-right: auto;
    margin-left: auto;
    font-size: 20px;
}
#submit:hover{
    margin-top: 10px;
    border-radius: 8px;
    border-color: rgb(255, 0, 0);
    width: fit-content;
    height: 30px;
    margin-right: auto;
    margin-left: auto;
    font-size: 20px;
}
</style>
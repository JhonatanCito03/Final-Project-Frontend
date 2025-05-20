<template>
  <div class="demo-progress">
    <el-progress type="circle" :percentage="100" />
    <el-progress type="circle" :percentage="25" />
    <el-progress type="circle" :percentage="20" status="success" />
    <el-progress type="circle" :percentage="30" status="success" />
    <el-progress type="circle" :percentage="50" status="exception" />
  </div>
</template>

<style scoped>
.demo-progress .el-progress--circle {
  margin-right: 15px;
}
</style>
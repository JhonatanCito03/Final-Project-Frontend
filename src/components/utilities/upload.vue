<template>
  <div class="container">
    <el-upload
  v-model:file-list="fileList"
  list-type="picture-card"
  :auto-upload="false"
  :limit="1"
  :on-change="handleFileChange"
  :on-exceed="handleExceed"
  >
      <el-icon><Plus /></el-icon>
  
      <template #file="{ file }">
        <div>
          <img class="el-upload-list__item-thumbnail" :src="file.url" alt="" />
          <span class="el-upload-list__item-actions">
            <span
              class="el-upload-list__item-preview"
              @click="handlePictureCardPreview(file)"
            >
              <el-icon><zoom-in /></el-icon>
            </span>
            <span
              v-if="!disabled"
              class="el-upload-list__item-delete"
              @click="handleDownload(file)"
            >
              <el-icon><Download /></el-icon>
            </span>
            <span
              v-if="!disabled"
              class="el-upload-list__item-delete"
              @click="handleRemove(file)"
            >
              <el-icon><Delete /></el-icon>
            </span>
          </span>
        </div>
      </template>
    </el-upload>
  
    <el-dialog class="preview-image1" v-model="dialogVisible">
      <img class="preview-image" :src="dialogImageUrl" alt="Preview Image" />
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
import type { UploadProps, UploadUserFile } from 'element-plus'
import { ref } from 'vue'
import { Delete, Download, Plus, ZoomIn } from '@element-plus/icons-vue'
import type { UploadFile } from 'element-plus'

const fileList = ref<UploadUserFile[]>([])


const dialogImageUrl = ref('')
const dialogVisible = ref(false)
const disabled = ref(false)

const handleRemove = (file: UploadFile) => {
  fileList.value = fileList.value.filter(f => f.uid !== file.uid)
}

const handlePictureCardPreview = (file: UploadFile) => {
  dialogImageUrl.value = file.url!
  dialogVisible.value = true
}

const handleFileChange = (file: UploadFile, fileListRaw: UploadFile[]) => {
  fileList.value = [fileListRaw[fileListRaw.length - 1]]
}

const handleExceed = (files: File[], fileListRaw: UploadUserFile[]) => {
  fileList.value = [] 
  const newFile: UploadUserFile = {
    name: files[0].name,
    url: URL.createObjectURL(files[0])
  }
  fileList.value.push(newFile)
}

const handleDownload = (file: UploadFile) => {
  if(!file.url) return

  const link = document.createElement('a')
  link.href = file.url
  link.download = file.name || `${file} descargado con exito`
  link.click()
}
</script>

<style scoped>
.container{
  display: flex;
  justify-content: center;
}

.preview-image{
  max-width: 500px;
  width: 100%;
  display: block;
  margin: 0 auto;
  border-radius: 8px;
}
</style>
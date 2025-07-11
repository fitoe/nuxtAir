<script setup lang='ts'>
import type { UploadProps, UploadUserFile } from 'element-plus'

const props = defineProps({
  action: {
    type: String,
    default: '/resource/oss/upload',
  },
  listType: {
    type: String,
    default: 'picture-card',
  },
  headers: {
    type: Object,
    default: () => ({}),
  },

  data: {
    type: Object,
    default: () => ({}),
  },
  showFileList: {
    type: Boolean,
    default: true,
  },
  limit: {
    type: Number,
    default: 1,
  },
  accept: {
    type: String,
    default: '',
  },
  autoUpload: {
    type: Boolean,
    default: true,
  },
  // 自定义属性
  maxSize: {
    type: Number,
    default: 5, // MB
  },
  fileType: {
    type: Array,
    default: () => ['jpg', 'png', 'jpeg', 'gif', 'bmp'],
  },
  // 新增属性：是否禁用上传
  disabled: {
    type: Boolean,
    default: false,
  },
})
const { apiBase } = useRuntimeConfig().public
const multiple = computed(() => props.limit > 1)
const fileList = defineModel<UploadUserFile[]>('filelist', { default: [] })
const result = defineModel<string>('ossid', { default: '' })
const dialogImageUrl = ref('')
const dialogVisible = ref(false)

const handleRemove: UploadProps['onRemove'] = (uploadFile, uploadFiles) => {
  // 更新ossId字符串
  const ossIds = uploadFiles
    .map(x => x.response?.data?.ossId || x.ossId)
    .filter(Boolean)

  result.value = ossIds.join(',')
}

const handlePictureCardPreview: UploadProps['onPreview'] = (uploadFile) => {
  dialogImageUrl.value = uploadFile.url!
  dialogVisible.value = true
}
const init_data = {
  clientid: '',
}
const init_headers = computed(() => ({ Authorization: `Bearer ${user().token}` }))
function handleSuccess(response: any, file: UploadUserFile) {
  // 确保文件对象有response数据
  if (!file.response) {
    file.response = response
  }

  // 更新ossId字符串
  const ossIds = fileList.value
    .map(x => x.response?.data?.ossId || x.ossId)
    .filter(Boolean)

  result.value = ossIds.join(',')
}
function reset() {
  fileList.value = []
  result.value = []
}
defineExpose({ reset })
</script>

<template>
  <div class="uploadlist">
    <el-upload
      v-model:file-list="fileList"
      :class="fileList.length >= limit ? 'upload-disabled' : 'upload-enabled'"
      :action="apiBase + props.action"
      :headers="{ ...headers, ...init_headers }"
      :limit="limit"
      :data="{ ...data, ...init_data }"
      :list-type="listType"
      :multiple="multiple"
      :show-file-list="true"
      :on-preview="handlePictureCardPreview"
      :accept="accept"
      :auto-upload="autoUpload"
      :on-remove="handleRemove"
      :on-success="handleSuccess"
      :disabled="disabled">
      <slot></slot>
      <template #trigger>
        <Icon name="i-ep-plus"/>
      </template>
    </el-upload>
    <el-dialog v-model="dialogVisible">
      <img w-full :src="dialogImageUrl" alt="Preview Image"/>
    </el-dialog>
  </div>
</template>

<style lang="scss" scoped>
:deep(.upload-disabled) {
  .el-upload--picture-card {
    display: none !important;
  }
}
</style>

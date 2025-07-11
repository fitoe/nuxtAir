<script setup lang='ts'>
useHead({
  title: '关于我们',
})

const breaditems = computed(() => [
  { label: '首页', to: '/' },
  { label: '关于我们', to: useRoute().path },
])
</script>

<template>
  <div class="bg-gray-50">
    <UContainer>
      <div class="flex items-center gap-x-4 py-6">
        <UIcon name="ep:location" class="text-2xl text-primary"/>
        <UBreadcrumb :items="breaditems" class="text-lg"/>
      </div>
      <div class="bg-white p-6 min-h-screen">
        内容
      </div>
    </UContainer>
  </div>
</template>

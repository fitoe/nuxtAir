<script setup lang="ts">
const route = useRoute()
useHead({
  titleTemplate: (titleChunk) => {
    return titleChunk ? `${titleChunk} - ${sitename}` : sitename
  },
  meta: [
    { name: 'description', content: 'desc' },
    { name: 'keywords', content: 'keywords' },
  ],
  link: [
    { rel: 'icon', type: 'image/x-icon', href: '/favicon.png' },
  ],
})
</script>

<template>
  <div class="">
    <UApp>
      <NuxtLayout>
        <NuxtPage :page-key="route => route.fullPath"/>
      </NuxtLayout>
    </UApp>
  </div>
</template>

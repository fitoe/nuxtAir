<script setup lang="ts">
const props = defineProps({
  flag: {
    type: Boolean,
    default: true,
  },
})
const route = useRoute()
const items = computed(() => [
  { label: '首  页', to: '/', value: 'index' },
  { label: '关于我们', to: '/about', active: route.path.startsWith('/about') },
])
const open = ref(false)
watch(route, () => {
  open.value = false
})
const menu = ref()
</script>

<template>
  <div class="top-0  w-full backdrop-blur z-100 bg-white/50 sticky ">
    <Topbar/>
    <UContainer class="flex-between">
      <nuxt-link to="/" class="flex gap-x-2 items-center">
        <span class="text-xl font-bold">网站名称</span>
      </nuxt-link>
      <div class="gap-x-8 flex-center">
        <UNavigationMenu v-model="menu" class="hidden lg:block" :items="items" highlight variant="link"/>
      </div>
      <div class="gap-x-4 flex-center">
        <UButton v-if="user().isLogin" color="success" variant="ghost" size="xl" link to="/user/info">用户名</UButton>
      </div>
      <USlideover v-model:open="open" title="标题" side="right" :ui="{ width: 'w-3/4' }" class="">
        <UButton icon="lucide:align-justify" class="lg:hidden" color="neutral" variant="ghost"/>
        <template #body>
          <UNavigationMenu class="items-center text-center" orientation="vertical" :items="items" highlight variant="link"/>
          <div class="gap-x-2 mt-10 flex-center">
            <div class="w-6 h-6 rounded-full bg-primary flex-center">
              <Icon name="ic:baseline-local-phone" class="text-base text-white"/>
            </div>
            <div class="">{{ phonenumber }}</div>
          </div>
        </template>
      </USlideover>
    </UContainer>
    <UContainer v-if="props.flag" class="flex-center"/>
  </div>
</template>

import { useCookie } from '#app'
import { useStorage } from '@vueuse/core'
import { createAlova } from 'alova'
import { createClientTokenAuthentication } from 'alova/client'
import adapterFetch from 'alova/fetch'
import NuxtHook from 'alova/nuxt'

// const token = useCookie('token')
// const token = useStorage('token', '')

const alova = createAlova({
  statesHook: NuxtHook({
    nuxtApp: useNuxtApp,
  }),
  cacheLogger: null,
  cacheFor: {
    GET: 0,
  },
  async beforeRequest(method) {
    if (!method.meta?.ignoreToken) {
      method.config.headers.Authorization = `Bearer ${user().token}`
    }
    method.config.headers.clientid = ''
  },
  requestAdapter: adapterFetch(),
  responded: {
    onSuccess: async (response) => {
      const json = await response.json()
      if (response.status !== 200) {
        throw new Error(json.msg || response.statusText)
      }
      try {
        if (json.code === 401) {
          // token.value = ''
          user().logout()
          return navigateTo('/?callback=error&message=未登录')
        }
        if (json.code !== 200) {
          throw new Error(json.msg)
        }
        if (json?.data) {
          return json.data
        }
        return json
      }
      catch (e) {
        return Promise.reject(e.message)
      }
    },
    onError: (error) => {
      console.error(error)
    },
  },
})

export default function useAlova() {
  const { apiBase } = useRuntimeConfig().public
  alova.options.baseURL = apiBase
  return alova
}

export const get = <T>(url: string, params?: object, config: object = { baseURL: useRuntimeConfig().public.apiHost }) => useAlova().Get(url, { params, ...config })

export const post = <T>(url: string, data?: object, config: object = { baseURL: useRuntimeConfig().public.apiHost }) => useAlova().Post(url, data, config)

export const del = <T>(url: string, data?: object, config: object = { baseURL }) => useAlova().Delete(url, data, config)

export const put = <T>(url: string, data?: object, config: object = { baseURL: useRuntimeConfig().public.apiHost }) => useAlova().Put(url, data, config)

export const upload = <T>(url: string, data: { name: string, filePath: string }, config: object = {}) => useAlova().Post(url, data, { ...config })

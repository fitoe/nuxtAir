import { useStorage } from '@vueuse/core'

const info_template = {
  id: '',
  companyName: '',
  companyTags: null,
  companyType: null,
  companyIntro: null,
  contactName: null,
  contactPhone: null,
  companyAddress: null,
  apprdate: '',
  uniscid: '',
  dom: '',
  empnum: 7,
  entname: '',
  enttypecn: null,
  estdate: '',
  industryco: '6560',
  industryphy: 'I',
  lerep: '',
  opfrom: '',
  opto: null,
  opscope: '',
  pripid: '',
  regcap: 900,
  regcapcurcn: null,
  regno: '',
  regorg: '',
  regorgcn: null,
  regstatecn: null,
  town: '否',
  companyStatus: '-1',
  refuseReason: null,
  approverId: null,
  approverName: null,
  approveTime: null,
  companyLogo: null,
  honorFiles: null,
  brandLogo: null,
  companyUrl: null,
  companyImg: null,
  companyImgUrl: null,
  comUsersUuid: null,
  isBrand: '0',
  brandLogoImgUrl: null,
  loginName: null,
}
export const useUserStore = defineStore('user', () => {
  // const token = useCookie('token')
  const token = ref('')
  const isLogin = computed(() => Boolean(token.value))
  const info = ref({ ...info_template })
  // 获取用户信息
  async function getUserInfo() {
    try {
      const res = await get('/business/company/getCurrentCompany')
      info.value = res
    }
    catch (e) {
      info.value = {}
      console.error(e)
    }
  }
  // 退出登录
  async function logout() {
    try {
      await post('/auth/logout')
      clear()
      return navigateTo('/?callback=success&message=退出成功')
    }
    catch (e) {
      console.log('退出失败')
      ElMessage.error('退出失败')
    }
  }

  // 清空
  function clear() {
    token.value = ''
    info.value = { ...info_template }
  }

  return { getUserInfo, clear, logout, isLogin, token, info }
}, { persist: true })

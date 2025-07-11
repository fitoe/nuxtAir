const isAuthenticated = () => Boolean(user().token)
export default defineNuxtRouteMiddleware((to, from) => {
  if (isAuthenticated() === false) {
    return navigateTo('/?callback=error&message=请登录')
  }
})

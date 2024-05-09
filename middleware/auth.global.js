export default defineNuxtRouteMiddleware((to, from) => {
	const { userInfo } = useUser();
	
	if (to.path !== '/login' && !userInfo.value) {
		return navigateTo('/login')
	}
})
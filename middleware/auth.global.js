export default defineNuxtRouteMiddleware((to, from) => {
	const user = useUser();
	
	if (to.path !== '/login' && !user.userInfo.value) {
		return navigateTo('/login')
	}
})
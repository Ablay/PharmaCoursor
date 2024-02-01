export default function () {
	const userInfo = useCookie('userInfo', { default: () => ref(null) });
	
	return { userInfo }
}
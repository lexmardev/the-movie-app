import { inject } from '@angular/core'
import { CanActivateFn, Router } from '@angular/router'

export const MainLayoutGuard: CanActivateFn = () => {
	const router = inject(Router)

	const apiKey = localStorage.getItem('api-key')

	if (apiKey) {
		return true
	}

	router.navigate(['/verify/api-key'])
	return false
}

export const APIKeyPageGuard: CanActivateFn = () => {
	const router = inject(Router)

	const apiKey = localStorage.getItem('api-key')

	if (apiKey) {
		router.navigate(['/movies'])
		return false
	}

	return true
}

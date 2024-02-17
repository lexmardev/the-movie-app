import { HttpHeaders, HttpInterceptorFn } from '@angular/common/http'
import { environment } from '@environments/environment'

export const apiKeyInterceptor: HttpInterceptorFn = (req, next) => {
	const apiKey = localStorage.getItem('api-key')

	if (apiKey) {
		const headers = new HttpHeaders({
			'X-RapidAPI-Key': apiKey,
			'X-RapidAPI-Host': environment.RAPID_API_HOST,
		})

		const reqCLone = req.clone({ headers })

		return next(reqCLone)
	}

	return next(req)
}

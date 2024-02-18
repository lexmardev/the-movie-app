import { Routes } from '@angular/router'

export const VerificationRoutes: Routes = [
	{
		path: 'api-key',
		loadComponent: () =>
			import('./pages/api-key-verification-page.component').then((m) => m.ApiKeyVerificationPageComponent),
	},
]

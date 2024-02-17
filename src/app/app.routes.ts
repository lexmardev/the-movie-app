import { Routes } from '@angular/router'
import { APIKeyPageGuard, MainLayoutGuard } from '@lib/guards/main.guard'

export const routes: Routes = [
	{
		path: '',
		loadComponent: () => import('./layouts/main-layout/main-layout.component').then((m) => m.MainLayoutComponent),
		loadChildren: () => import('./layouts/main-layout/main-layout.routes').then((m) => m.MainLayoutRoutes),
		canActivate: [MainLayoutGuard],
	},
	{
		path: 'verify',
		loadComponent: () =>
			import('./modules/verification/presentation/verification.component').then((m) => m.VerificationComponent),
		loadChildren: () =>
			import('./modules/verification/presentation/verification.routes').then((m) => m.VerificationRoutes),
		canActivate: [APIKeyPageGuard],
	},
	{
		path: '**',
		redirectTo: '',
	},
]

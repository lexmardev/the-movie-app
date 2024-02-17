import { Component } from '@angular/core'
import { Router, RouterLink, RouterLinkActive } from '@angular/router'
import { NotificationService } from '@lib/services/notification.service'

@Component({
	selector: 'app-header',
	standalone: true,
	imports: [RouterLink, RouterLinkActive],
	template: `
		<header class="bg-white">
			<nav class="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8" aria-label="Global">
				<div class="flex lg:flex-1">
					<a [routerLink]="['/movies']" class="-m-1.5 p-1.5">
						<h1 class="text-xl font-extrabold text-sky-600 drop-shadow-lg">The movie app</h1>
					</a>
				</div>
				<div class="flex lg:hidden">
					<button
						(click)="toggleMobileMenu()"
						type="button"
						class="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
					>
						<span class="sr-only">Open main menu</span>
						<i class="i-tabler-menu-2 h-6 w-6"></i>
					</button>
				</div>
				<div class="hidden lg:flex lg:gap-x-12">
					<a
						[routerLink]="['/movies']"
						routerLinkActive="border-b border-black"
						class="text-sm font-semibold leading-6 text-gray-900"
						>Movies</a
					>
					<a
						[routerLink]="['/movies/favorites']"
						routerLinkActive="border-b border-black"
						class="text-sm font-semibold leading-6 text-gray-900"
						>Favorites</a
					>
				</div>
				<div class="hidden lg:flex lg:flex-1 lg:justify-end">
					<a (click)="onExit()" class="w-40 cursor-pointer truncate text-sm font-semibold leading-6 text-gray-900"
						>Exit <span aria-hidden="true">&rarr;</span></a
					>
				</div>
			</nav>
			@if (canShowMobileMenu) {
				<!-- Mobile menu, show/hide based on menu open state. -->
				<div class="lg:hidden" role="dialog" aria-modal="true">
					<!-- Background backdrop, show/hide based on slide-over state. -->
					<div (click)="toggleMobileMenu()" class="fixed inset-0 z-10"></div>
					<div
						class="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10"
					>
						<div class="flex items-center justify-between">
							<a [routerLink]="['/movies']" class="-m-1.5 p-1.5">
								<span class="sr-only">Your Company</span>
								<h1 class="text-xl font-extrabold text-green-600 drop-shadow-lg">The movie app</h1>
							</a>
							<button (click)="toggleMobileMenu()" type="button" class="-m-2.5 rounded-md p-2.5 text-gray-700">
								<span class="sr-only">Close menu</span>
								<i class="i-tabler-x h-6 w-6"></i>
							</button>
						</div>
						<div class="mt-6 flow-root">
							<div class="-my-6 divide-y divide-gray-500/10">
								<div class="space-y-2 py-6">
									<a
										[routerLink]="['/movies']"
										routerLinkActive="bg-gray-800 text-white hover:bg-gray-800"
										class="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
										>Movies</a
									>
									<a
										[routerLink]="['/movies/favorites']"
										routerLinkActive="bg-gray-800 text-white hover:bg-gray-800"
										class="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
										>Favorites</a
									>
								</div>
								<div class="py-6">
									<a
										(click)="onExit()"
										class="-mx-3 block cursor-pointer rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
										>Exit</a
									>
								</div>
							</div>
						</div>
					</div>
				</div>
			}
		</header>
	`,
})
export class HeaderComponent {
	canShowMobileMenu = false

	constructor(
		private readonly router: Router,
		private readonly notificationService: NotificationService
	) {}

	toggleMobileMenu(): void {
		this.canShowMobileMenu = !this.canShowMobileMenu
	}

	onExit(): void {
		localStorage.removeItem('api-key')
		this.notificationService.showNotification({
			type: 'success',
			title: 'Thank you!',
			message: 'Please come back soon!',
		})
		this.router.navigate(['/verify/api-key'])
	}
}

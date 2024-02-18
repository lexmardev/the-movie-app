import { Component, OnInit } from '@angular/core'
import { Notification } from '@lib/definitions/notification.definition'
import { NotificationService } from '@lib/services/notification.service'

@Component({
	selector: 'app-notification',
	standalone: true,
	imports: [],
	template: `
		@if (notifications.length > 0) {
			<div
				aria-live="assertive"
				class="pointer-events-none fixed inset-0 flex items-end px-4 py-6 sm:items-start sm:p-6"
			>
				<div class="flex w-full flex-col items-center space-y-4 sm:items-end">
					@for (item of notifications; track $index) {
						<div
							class="pointer-events-auto w-full max-w-sm animate-slide-in-right overflow-hidden rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5"
						>
							<div class="p-4">
								<div class="flex items-start">
									<div class="flex-shrink-0">
										@if (item.type === 'success') {
											<i class="i-tabler-circle-check h-6 w-6 text-green-400"></i>
										}
										@if (item.type === 'error') {
											<i class="i-tabler-playstation-x h-6 w-6 text-red-400"></i>
										}
									</div>
									<div class="ml-3 w-0 flex-1 pt-0.5">
										<p class="text-sm font-medium text-gray-900">{{ item.title }}</p>
										<p class="mt-1 text-sm text-gray-500">{{ item.message }}</p>
									</div>
								</div>
							</div>
						</div>
					}
				</div>
			</div>
		}
	`,
})
export class NotificationComponent implements OnInit {
	notifications: Notification[] = []

	constructor(readonly notificationService: NotificationService) {}

	ngOnInit() {
		this.notificationService.getNotifications().subscribe((notification) => {
			this.notifications.push(notification)

			const timeout = setTimeout(() => {
				this.notifications.shift()
				clearTimeout(timeout)
			}, 5000)
		})
	}
}

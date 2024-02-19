import { NgClass } from '@angular/common'
import { Component } from '@angular/core'
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'
import { Router } from '@angular/router'
import { SubmitButtonComponent } from '@components/buttons/submit-button.component'
import { NotificationService } from '@lib/services/notification.service'
import { MovieControllerService } from '@modules/movie/infrastructure/movie.controller.service'

@Component({
	selector: 'app-verify-api-key-form',
	standalone: true,
	imports: [ReactiveFormsModule, NgClass, SubmitButtonComponent],
	template: `
		<div class="flex min-h-screen flex-col justify-center py-12 sm:px-6 lg:px-8">
			<div class="animate-fade-in-up sm:mx-auto sm:w-full sm:max-w-md">
				<h1 class="mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">The movie app</h1>
			</div>

			<div class="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
				<div class="animate-fade-in-down bg-white px-6 py-12 shadow-lg sm:rounded-lg sm:px-12">
					<form [formGroup]="form" class="space-y-6">
						<div>
							<label for="api-key" class="block text-sm font-medium leading-6 text-gray-900">Api Key</label>
							<div class="mt-4 flex flex-col">
								<input
									formControlName="apiKey"
									id="api-key"
									name="api-key"
									type="text"
									class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
								/>
								<span
									[ngClass]="{
										'!visible animate-shake':
											form.controls['apiKey'].hasError('required') && form.controls['apiKey'].touched
									}"
									class="invisible mt-2 text-red-500"
									>The API Key is required</span
								>
							</div>
						</div>
						<div>
							<app-submit-button
								title="Verify"
								titleDuringLoading="Verifying"
								[isLoading]="isLoading"
								(buttonClick)="onSubmit()"
							/>
						</div>
					</form>
				</div>
			</div>
		</div>
	`,
	styles: ``,
})
export class VerifyApiKeyFormComponent {
	form: FormGroup
	isLoading = false

	constructor(
		private readonly movieController: MovieControllerService,
		private readonly notificationService: NotificationService,
		private readonly router: Router
	) {
		this.form = new FormGroup({
			apiKey: new FormControl('', [Validators.required]),
		})
	}

	onSubmit(): void {
		this.form.markAllAsTouched()

		if (this.form.valid) {
			this.verifyApiKey()
		}
	}

	verifyApiKey(): void {
		this.isLoading = true
		const apiKey: string = this.form.controls['apiKey'].value
		localStorage.setItem('api-key', apiKey)

		this.movieController.getByPage(1).subscribe({
			next: () => {
				this.notificationService.showNotification({
					type: 'success',
					title: 'Yay!',
					message: 'You have the right API Key!',
				})
				this.router.navigate(['/movies'])
				this.isLoading = false
			},
			error: () => {
				this.isLoading = false
				localStorage.removeItem('api-key')
				this.notificationService.showNotification({
					type: 'error',
					title: 'Oh no!',
					message: "You don't have the right API Key :(",
				})
			},
		})
	}
}

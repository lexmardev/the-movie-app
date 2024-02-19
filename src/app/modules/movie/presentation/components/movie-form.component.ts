import { Component, Input, OnInit } from '@angular/core'
import { MovieControllerService } from '../../infrastructure/movie.controller.service'
import { IMovie } from '@modules/movie/domain/movie.interface'
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'
import { NgClass } from '@angular/common'
import { SubmitButtonComponent } from '@components/buttons/submit-button.component'
import { NotificationService } from '@lib/services/notification.service'
import { Router } from '@angular/router'
import { MoviePreviewComponent } from './movie-preview.component'

@Component({
	selector: 'app-movie-form',
	standalone: true,
	imports: [ReactiveFormsModule, NgClass, SubmitButtonComponent, MoviePreviewComponent],
	template: `
		<div class="flex flex-col justify-center py-12 sm:px-6 lg:px-8">
			<div class="animate-fade-in-up sm:mx-auto sm:w-full sm:max-w-md">
				<h1 class="mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">{{ formTitle }}</h1>
			</div>

			<div class="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
				<div class="animate-fade-in-down bg-white px-6 py-12 shadow-lg sm:rounded-lg sm:px-12">
					<form [formGroup]="form" class="space-y-6">
						<div>
							<label for="title" class="block text-sm font-medium leading-6 text-gray-900">Title</label>
							<div class="mt-4 flex flex-col">
								<input
									formControlName="title"
									id="title"
									name="title"
									type="text"
									class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
								/>
								<div class="flex flex-col">
									@if (form.controls['title'].hasError('required') && form.controls['title'].touched) {
										<span class="mt-2 text-red-500">Title is required</span>
									}

									@if (form.controls['title'].hasError('maxlength') && form.controls['title'].value) {
										<span class="mt-2 text-red-500">Title is too long</span>
									}
								</div>
							</div>
						</div>
						<div>
							<label for="imageUrl" class="block text-sm font-medium leading-6 text-gray-900">Image URL</label>
							<div class="mt-4 flex flex-col">
								<input
									formControlName="imageUrl"
									id="imageUrl"
									name="imageUrl"
									type="text"
									class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
								/>
								<div class="flex flex-col">
									@if (form.controls['imageUrl'].hasError('required') && form.controls['imageUrl'].touched) {
										<span class="mt-2 text-red-500">Image URL is required</span>
									}
								</div>
							</div>
						</div>
						<div>
							<app-submit-button
								title="Save"
								titleDuringLoading="Saving"
								[isLoading]="false"
								(buttonClick)="onSubmit()"
							/>
						</div>
					</form>
				</div>
			</div>
			<app-movie-preview [movie]="movie" />
		</div>
	`,
})
export class MovieFormComponent implements OnInit {
	@Input() formTitle: string = 'New Movie'
	@Input() movie!: IMovie
	form!: FormGroup
	isLoading = false

	constructor(
		private readonly movieControllerService: MovieControllerService,
		private readonly notificationService: NotificationService,
		private readonly router: Router
	) {}

	ngOnInit(): void {
		if (this.movie) {
			this.form = new FormGroup({
				title: new FormControl(this.movie.titleText?.text, [Validators.required, Validators.maxLength(50)]),
				imageUrl: new FormControl(this.movie.primaryImage?.url, [Validators.required]),
			})
		} else {
			this.form = new FormGroup({
				title: new FormControl('', [Validators.required, Validators.maxLength(50)]),
				imageUrl: new FormControl('', [Validators.required]),
			})
		}

		this.form.valueChanges.subscribe(() => this.setFormData())
	}

	onSubmit(): void {
		this.form.markAllAsTouched()

		if (this.form.valid) {
			this.setFormData()
			this.isLoading = true
			if (this.movie.id) {
				this.movieControllerService.update(this.movie)
				this.notificationService.showNotification({
					type: 'success',
					message: 'Your movie has been updated!',
					title: 'Yay',
				})
				this.isLoading = false
				this.router.navigate(['/movies'])
				return
			}

			this.movieControllerService.save(this.movie)
			this.notificationService.showNotification({
				type: 'success',
				message: 'Your movie has been saved!',
				title: 'Yay',
			})
			this.isLoading = false
			this.router.navigate(['/movies'])
		}
	}

	setFormData() {
		this.movie = {
			titleText: {
				text: this.form.controls['title'].value,
			},
			primaryImage: {
				url: this.form.controls['imageUrl'].value,
			},
		}
	}
}

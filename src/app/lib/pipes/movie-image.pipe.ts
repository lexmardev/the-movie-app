import { Pipe, PipeTransform } from '@angular/core'

@Pipe({
	name: 'movieImage',
	standalone: true,
})
export class MovieImagePipe implements PipeTransform {
	transform(value: string | null | undefined): string {
		if (value && value.length > 10) {
			return value
		}

		return 'https://images.unsplash.com/photo-1609743522653-52354461eb27?q=80&w=2187&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
	}
}

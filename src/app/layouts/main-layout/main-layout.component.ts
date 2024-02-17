import { Component } from '@angular/core'
import { RouterOutlet } from '@angular/router'
import { HeaderComponent } from './components/header.component'

@Component({
	selector: 'app-main-layout',
	standalone: true,
	imports: [RouterOutlet, HeaderComponent],
	template: `
		<div class="flex flex-col">
			<app-header />
			<div class="container flex">
				<router-outlet />
			</div>
		</div>
	`,
})
export class MainLayoutComponent {}

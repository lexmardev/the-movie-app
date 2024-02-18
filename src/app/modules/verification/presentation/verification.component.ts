import { Component } from '@angular/core'
import { RouterOutlet } from '@angular/router'

@Component({
	selector: 'app-verification',
	standalone: true,
	imports: [RouterOutlet],
	template: `<router-outlet />`,
})
export class VerificationComponent {}

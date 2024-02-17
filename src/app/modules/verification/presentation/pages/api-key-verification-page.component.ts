import { Component } from '@angular/core';
import { VerifyApiKeyFormComponent } from '@modules/verification/presentation/components/verify-api-key-form.component';

@Component({
  selector: 'app-api-key-verification-page',
  standalone: true,
  imports: [VerifyApiKeyFormComponent],
  template: `<app-verify-api-key-form />`,
})
export class ApiKeyVerificationPageComponent {}

import { NgClass } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-submit-button',
  standalone: true,
  imports: [NgClass],
  template: `
    <button
      (click)="onClick()"
      [ngClass]="{
        'bg-sky-600 text-white hover:bg-sky-500 focus-visible:outline-sky-600': !isLoading,
        'bg-gray-300 text-gray-500 cursor-not-allowed': isLoading,
      }"
      [disabled]="isLoading"
      type="submit"
      class="flex w-full items-center justify-center rounded-md px-3 py-1.5 text-sm font-semibold leading-6 shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
    >
      @if (isLoading) {
      <i
        class="i-tabler-loader-2 h-6 w-6 animate-spin-clockwise pr-8 animate-iteration-count-infinite"
      ></i>
      {{ titleDuringLoading }}
      } @else {
      {{ title }}
      }
    </button>
  `,
})
export class SubmitButtonComponent {
  @Input() title: string;
  @Input() titleDuringLoading: string;
  @Input() isLoading: boolean;
  @Output() buttonClick: EventEmitter<void> = new EventEmitter<void>();

  constructor() {
    this.title = 'default title';
    this.titleDuringLoading = 'default title during loading';
    this.isLoading = false;
  }

  onClick(): void {
    this.buttonClick.emit();
  }
}

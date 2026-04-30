import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-auth-input',
  templateUrl: './auth-input.html',
})
export class AuthInput {
  @Input() label = '';
  @Input() placeholder = '';
  @Input() type = 'text';
  @Input() control: AbstractControl | null = null;
  @Input() required = false;
  @Input() rightIcon = false;
  @Input() useContent = false;
  @Input() errorMap: Record<string, string> = {};
  @Output() rightIconClick = new EventEmitter<void>();

  get inputClasses(): string {
    const base = 'w-full border px-4 py-3 pr-10 focus:outline-none placeholder:text-gray-400';
    const isInvalid = this.control?.invalid && this.control?.touched;
    return isInvalid
      ? `${base} border-red-500 focus:border-red-500`
      : `${base} border-gray-200 focus:border-blue-600`;
  }

  get errorMessage(): string {
    const control = this.control;
    if (!control?.touched) return '';

    for (const key of Object.keys(this.errorMap)) {
      if (control.hasError(key)) return this.errorMap[key];
    }

    return '';
  }

  onRightIconClick(): void {
    this.rightIconClick.emit();
  }

  onInput(event: Event): void {
    const target = event.target as HTMLInputElement | null;
    this.control?.setValue(target?.value ?? '');
    this.control?.markAsDirty();
  }
}

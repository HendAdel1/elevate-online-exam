import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-auth-input',
  standalone: true,
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
  /** Disables the field (gray background). Also respected when the bound control is disabled. */
  @Input() disabled = false;
  @Input() readonly = false;
  @Input() errorMap: Record<string, string> = {};
  @Output() rightIconClick = new EventEmitter<void>();

  get isDisabled(): boolean {
    return this.disabled || this.control?.disabled === true;
  }

  get inputClasses(): string {
    const iconPad = this.rightIcon && !this.useContent ? ' pr-10' : '';
    const base = `w-full border px-4 py-3${iconPad} focus:outline-none placeholder:text-gray-400 font-geist`;
    const disabledCls = this.isDisabled
      ? ' bg-gray-100 text-gray-600 cursor-not-allowed border-gray-200'
      : '';
    const isInvalid = this.control?.invalid && this.control?.touched;
    if (this.isDisabled) {
      return `${base}${disabledCls}`;
    }
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
    if (this.readonly || this.isDisabled) return;
    const target = event.target as HTMLInputElement | null;
    this.control?.setValue(target?.value ?? '');
    this.control?.markAsDirty();
  }
}

import type { Iti } from 'intl-tel-input';

export type PhoneValue = Iti | null;

export interface InvalidPhoneError {
  message: string;
}

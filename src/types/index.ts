export interface PasswordSettings {
  length: number;
  includeNumbers: boolean;
  includeSymbols: boolean;
  includeUppercase: boolean;
  includeLowercase: boolean;
}

export interface SavedPassword {
  id: string;
  value: string;
  createdAt: string;
  note?: string;
}

export type PasswordAction = 
  | { type: 'GENERATE'; settings: PasswordSettings }
  | { type: 'SAVE_PASSWORD'; password: string }
  | { type: 'REMOVE_PASSWORD'; id: string }
  | { type: 'RESET_SETTINGS' };
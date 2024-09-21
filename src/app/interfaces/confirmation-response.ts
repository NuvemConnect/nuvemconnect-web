export interface ConfirmationResponse {
  message: string;
  success: boolean;
  token: string;
  UUID?: string;
  email?: string;
}

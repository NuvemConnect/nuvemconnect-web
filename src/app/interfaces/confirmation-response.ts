export interface ConfirmationResponse {
  UUID?: string;
  name?: string;
  email?: string;
  token: string;
  success: boolean;
  message: string;
}

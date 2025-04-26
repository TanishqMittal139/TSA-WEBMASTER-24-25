
export interface UserProfile {
  id: string;
  email?: string;
  name?: string;
  phone?: string;
  address?: string;
  bio?: string;
  birthdate?: string;
  avatar?: string;
  created_at?: string;
  updated_at?: string;
}

export interface AuthResult {
  success: boolean;
  message: string;
  user?: any;
}

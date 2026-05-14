// ===================== USER RESPONSE =====================
export type UserInfo = {
  id: string;
  name: string;
  email: string;
}

export interface UserResponse {
  id: string;
  name: string;
  email: string;
  active: boolean;
  createdAt: string; // ISO 8601
}

// ===================== REQUESTS =====================

export interface CreateUserRequest {
  name: string;
  email: string;
  password: string;
}

export interface UpdateUserRequest {
  name?: string;
  password?: string;
}

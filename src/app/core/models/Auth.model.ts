export interface AuthResponse {
    accessToken: string;
    tokenType: string;
    user: {
        id: string;
        name: string;
        email: string;
    };
}

export interface LoginRequest {
    email: string;
    password: string;
}

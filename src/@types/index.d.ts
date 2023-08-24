declare module 'user' {
    export interface User {
        email: string;
        username: string;
        password: string;
    }
    export interface AuthUser {
        id: string;
        email: string;
        username: string;
        password: string;
    }
}

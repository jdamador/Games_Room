export interface User {
   uid: string;
   email: string;
   displayName: string;
   photoURL: string;
   emailVerified: boolean;
   wins: number;
   defeats: number;
   draws: number;
   status: string;
}
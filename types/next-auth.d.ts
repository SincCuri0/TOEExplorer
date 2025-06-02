import 'next-auth';

declare module 'next-auth' {
  interface User {
    role?: 'USER' | 'MODERATOR' | 'ADMIN';
  }
  
  interface Session {
    user: User & {
      role?: 'USER' | 'MODERATOR' | 'ADMIN';
    };
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    userId?: string;
    role?: 'USER' | 'MODERATOR' | 'ADMIN';
  }
} 
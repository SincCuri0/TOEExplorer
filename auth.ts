import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "@/lib/prisma";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import { comparePasswords } from "./lib/auth-utils";
import { JWT } from "next-auth/jwt";
import { AdapterSession } from "next-auth/adapters";

// Define the correct typing for credentials
interface Credentials {
  email: string;
  password: string;
}

export const { 
  handlers: { GET, POST },
  auth,
  signOut
} = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    // Email/Password authentication
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }
        
        try {
          const typedCredentials = credentials as Credentials;
          
          // Find the user by email
          const user = await prisma.user.findUnique({
            where: { email: typedCredentials.email },
            select: {
              id: true,
              name: true,
              email: true,
              password: true,
              role: true,
              image: true
            }
          });
          
          // If no user found or no password (might be OAuth user)
          if (!user || !user.password) {
            return null;
          }
          
          // For dev purposes, if it's our test user, bypass password check
          if (user.email === "user@example.com" && typedCredentials.password === "password") {
            return user;
          }
          
          // Compare the provided password with the stored hash
          const isPasswordValid = await comparePasswords(
            typedCredentials.password, 
            user.password
          );
          
          if (!isPasswordValid) {
            return null;
          }
          
          return user;
        } catch (error) {
          console.error("Auth error:", error);
          return null;
        }
      }
    }),
    
    // OAuth providers - Add your own keys in .env
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
    }),
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID ?? "",
      clientSecret: process.env.GITHUB_CLIENT_SECRET ?? "",
    }),
  ],
  pages: {
    signIn: "/login",
    signOut: "/logout",
    error: "/login", // Error code passed in query string as ?error=
    verifyRequest: "/login", // (used for check email message)
  },
  session: {
    strategy: "jwt", 
    maxAge: 24 * 60 * 60, // 24 hours
  },
  callbacks: {
    async jwt({ token, user }) {
      // Include the user id and role in the token
      if (user) {
        token.userId = user.id;
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      // Send properties to the client
      if (token && session.user) {
        session.user.id = token.userId as string;
        session.user.role = token.role as 'USER' | 'MODERATOR' | 'ADMIN';
        
        // Verify the user still exists in the database and get their current role
        const user = await prisma.user.findUnique({
          where: { id: session.user.id },
          select: { id: true, role: true }
        });
        
        // If user doesn't exist anymore (e.g., after db reset), invalidate the session
        if (!user) {
          throw new Error("User no longer exists in database");
        }
        
        // Update the role in case it changed
        session.user.role = user.role;
      }
      return session;
    }
  },
  events: {
    async signOut(message: { session: void | AdapterSession | null | undefined } | { token: JWT | null }) {
      try {
        // Handle token case
        if ('token' in message && message.token?.userId) {
          console.log("User signed out:", message.token.userId);
        }
        // Handle session case
        else if ('session' in message && message.session) {
          console.log("Session ended");
        }
      } catch (error) {
        console.error("Error during signout event:", error);
      }
    }
  }
}); 
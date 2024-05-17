import { PrismaAdapter } from "@next-auth/prisma-adapter";
// import { Account, User as AuthUser, NextAuthOptions } from "next-auth";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import { db } from "./prisma";
import bcrypt from "bcrypt";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(db),
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/auth/login",
  },
  // secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "Enter Email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }
        const existingUser = await db.user.findUnique({
          where: { email: credentials?.email },
        });
        if (!existingUser) {
          return null;
        }

        // const salt = await bcrypt.genSalt(10);
        // const secPass = await bcrypt.hash(req.body.password, salt)
        const passwordMatch = await bcrypt.compare(
          credentials.password,
          existingUser.password
        );

        if (!passwordMatch) {
          return null;
        }

        return {
          // id: `${existingUser.id}`, // because it is number
          id: existingUser.id + "", // because it is number
          name: existingUser.name,
          email: existingUser.email,
          role: existingUser.role,
        };
      },
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_ID ?? "",
      clientSecret: process.env.GITHUB_SECRET ?? "",
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
      // authorization: {
      //   params: {
      //     prompt: "consent",
      //     access_type: "offline",
      //     response_type: "code",
      //   },
      // },
    }),
  ],
  callbacks: {
    // async signIn({ user, account }) {
    //   // let name: string = user.name!;
    //   // let email: string = user?.email; // async signIn({ user, account }: { user: AuthUser; account: Account }) {
    //   if (account?.provider === "credentials") {
    //     return true;
    //   }
    //   if (account?.provider === "github") {
    //     try {
    //       const existingUser = await db.user.findUnique({
    //         where: { email: user.email },
    //       });
    //       if (!existingUser) {
    //         // await db.user.create({
    //         //   data: { email },
    //         // });
    //         return true;
    //       }
    //     } catch (error) {
    //       console.log("Error saving user", error);
    //       return false;
    //     }
    //   }
    //   return true;
    // },
    async jwt({ token, user }) {
      console.log(token, user);
      if (user) {
        return {
          ...token,
          email: user.email,
          role: user.role,
        };
      }
      return token;
    },
    async session({ session, user, token }) {
      return {
        ...session,
        user: {
          ...session.user,
          email: token.email,
          role: token.role,
        },
      };
    },
  },
};

import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { Account, User as AuthUser } from "next-auth";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import { db } from "./prisma";
import bcrypt from "bcrypt";

export const authOptions: any = {
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
          credentials?.password,
          existingUser.password ?? ""
        );

        if (!passwordMatch) {
          return null;
        }
        // // check if email is activate after registration
        // if (!existingUser.active) {
        //   return null;
        // }

        return {
          // id: `${existingUser.id}`, // because it is number
          id: existingUser.id, // because it is number
          name: existingUser.name,
          email: existingUser.email,
          active: existingUser.active,
          role: existingUser.role,
          // image: existingUser.image,
        };
      },
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID as string,
      clientSecret: process.env.GOOGLE_SECRET as string,
    }),
  ],
  // callbacks: {
  //   async jwt({ token, user }: any) {
  //     console.log(token, user);
  //     if (user) {
  //       return {
  //         ...token,
  //         // email: user.email,
  //         active: user.active,
  //         role: user.role,
  //       };
  //     }
  //     return token;
  //   },
  //   async session({ session, user, token }: any) {
  //     return {
  //       ...session,
  //       user: {
  //         ...session.user,
  //         // email: token.email,
  //         active: user.active,
  //         role: token.role,
  //       },
  //     };
  //   },
  // },
};

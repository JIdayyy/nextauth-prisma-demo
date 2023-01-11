import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "../../../prisma/client";
import { decode } from "jsonwebtoken";
import jwt from "jsonwebtoken";

import { JWT } from "next-auth/jwt";

export default NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: "Credentials",

      credentials: {
        email: { label: "Email", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials, req) {
        const userFromDb = await prisma.user.findUnique({
          where: {
            email: credentials!.email,
          },
        });

        return userFromDb;
      },
    }),
  ],

  pages: {
    signIn: "/",
  },

  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
    updateAge: 24 * 60 * 60, // 24 hours
  },

  jwt: {
    secret: process.env.JWT_SECRET,
    encode: async ({ secret, token, maxAge }) => {
      if (!token) {
        return Promise.reject();
      }

      const newToken = jwt.sign(
        {
          picture: token.picture,
          id: token.id,
          name: token.name,
          state: token.state,
          email: token.email,
          nickname: token.nickname,
        },
        secret,
        {
          algorithm: "HS256",
          expiresIn: 30 * 24 * 60 * 60, // 30 days
        }
      );

      return newToken;
    },
    decode: async ({ secret, token }) => {
      const decoded = decode(token as string);
      return decoded as JWT;
    },
  },

  secret: process.env.JWT_SECRET,

  callbacks: {
    session({ session, user }) {
      return session;
    },
    signIn({ user, account, profile, email, credentials }) {
      return true;
    },
    async jwt({ token, account, profile }) {
      return token;
    },
  },
  debug: true,
});

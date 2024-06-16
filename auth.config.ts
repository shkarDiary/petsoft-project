import { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import prisma from "@/lib/db";
import bcrypt from "bcryptjs";
export const authConfig = {
  pages: {
    signIn: "/login",
  },

  providers: [
    Credentials({
      async authorize(credentials) {
        const { email, password } = credentials;

        const user = await prisma.user.findUnique({
          where: {
            email,
          },
          select: {
            id: true,
            hashedPassword: true,
            email: true,
          },
        });
        if (!user) {
          console.log("user not found");

          return null;
        }

        const isValidPassword = await bcrypt.compare(
          password as string,
          user.hashedPassword
        );

        if (!isValidPassword) {
          console.log("password is not valid");
          return null;
        }

        return user;
      },
    }),
  ],
  callbacks: {
    authorized: ({ auth, request }) => {
      const isTryingToAccessApp = request.nextUrl.pathname.includes("/app");

      if (isTryingToAccessApp && auth?.user) {
        return true;
      } else if (isTryingToAccessApp && !auth?.user) {
        return false;
      } else if (!isTryingToAccessApp && auth?.user) {
        return Response.redirect(new URL("/app/dashboard", request.nextUrl));
      } else if (!isTryingToAccessApp && !auth?.user) {
        return true;
      }
      return false;
    },
    jwt: ({ token, user }) => {
      if (user) {
        token.userId = user.id;
      }
      return token;
    },
    session: ({ session, token }) => {
      if (session.user) {
        session.user.id = token.userId;
      }
      return session;
    },
  },
} satisfies NextAuthConfig;

import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "../../../../server/db";
import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

import * as bcrypt from "bcryptjs";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === "development",
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        mobile: {
          label: "Mobile No.",
          type: "text",
          placeholder: "Mobile No.",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        if (!credentials || !credentials.mobile || !credentials.password) {
          return null;
        }
        const admin = await prisma.admin.findUnique({
          where: {
            mobile: credentials.mobile,
          },
          select: {
            id: true,
            mobile: true,
            email: true,
            firstname: true,
            lastname: true,
            password: true,
          },
        });
        if (!admin) {
          return null;
        }
        if (!admin.password) {
          return null;
        }
        const validPassword = await bcrypt.compare(
          credentials.password,
          admin.password.hash
        );
        if (!validPassword) {
          return null;
        }
        return {
          id: admin.id,
          mobile: admin.mobile,
          firstname: admin.firstname,
        };
      },
    }),
  ],
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.mobile = user.mobile;
        token.firstname = user.firstname;
      }
      return token;
    },
    session({ session, token }) {
      if (token.sub) session.user.id = token.sub;
      if (token.mobile) session.user.mobile = token.mobile as string;
      if (token.firstname) session.user.firstname = token.firstname as string;
      return session;
    },
  },
};
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };

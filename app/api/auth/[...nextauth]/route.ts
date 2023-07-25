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
        console.log(admin);
        const validPassword = await bcrypt.compare(credentials.password, admin.password.hash)
        console.log('Password Valid', validPassword)
        if (!validPassword) {
          return null;
        }
        return admin;
      },
    }),
  ],
}
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };

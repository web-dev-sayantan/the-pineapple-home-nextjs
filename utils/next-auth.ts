import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import * as bcrypt from "bcryptjs";
import { db } from "../drizzle";

export const authOptions: NextAuthOptions = {
  // @ts-ignore
  adapter: DrizzleAdapter(db),
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
        const admin = await db.query.admin.findFirst({
          where: (admin, { eq }) => eq(admin.mobile, credentials.mobile),
          columns: {
            id: true,
            mobile: true,
            email: true,
            firstname: true,
            lastname: true,
          },
          with: {
            password: {
              columns: {
                hash: true,
              },
            },
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
          admin.password[0].hash
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

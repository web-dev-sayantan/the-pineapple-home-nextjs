import NextAuth from "next-auth";

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      /** The user's postal address. */
      id: string;
      mobile: string;
      firstname: string;
      lastname: string;
      email: string;
    };
  }
  interface User {
    id: string;
    mobile: string;
    firstname: string;
  }
}

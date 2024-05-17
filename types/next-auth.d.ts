import NextAuth from "next-auth";

declare module "next-auth" {
  interface User {
    id: string;
    // name: string;
    // email: string;
    active: Boolean;
    role: string;
    // image: string;
  }

  interface Session {
    user: User & {
      id: string;
      // name: string;
      // email: string;
      active: Boolean;
      role: string;
      // image: string;
    };
    token: {
      id: string;
      // name: string;
      // email: string;
      active: Boolean;
      role: string;
      // image: string;
    };
  }
}

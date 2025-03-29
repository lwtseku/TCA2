import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import db from "./db";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { schema } from "./schema";
import { v4 as uuid } from "uuid";
import { encode } from "next-auth/jwt";
const adapter = PrismaAdapter(db);
export const { auth, handlers, signIn } = NextAuth({
  adapter,
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        const validatedCredentials = schema.parse(credentials);
        const user = await db.users.findFirst({
          where: {
            email: validatedCredentials.email,
            password: validatedCredentials.password,
          },
          select: {
            id: true,
            user_id: true,
            name: true,
            role: true, // Directly include role here
            school_year: true,
            email: true,
            createdAt: true,
            updatedAt: true,
          },
        });

        if (!user) {
          throw new Error("Invalid credentials.");
        }

        return user;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, account }) {
      if (account?.provider === "credentials") {
        token.credentials = true;
      }
      return token;
    },
  },
  jwt: {
    encode: async function (params) {
      if (params.token?.credentials) {
        const sessionToken = uuid();

        if (!params.token.sub) {
          throw new Error("No user ID found in token");
        }

        const createdSession = await adapter?.createSession?.({
          sessionToken: sessionToken,
          userId: params.token.sub,
          expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        });

        if (!createdSession) {
          throw new Error("Failed to create session");
        }

        return sessionToken;
      }
      return encode(params);
    },
  },
});

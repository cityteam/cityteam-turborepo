/**
 * Configuration for authjs (née next-auth) 5 beta.
 */

// External Modules ----------------------------------------------------------

import { SignInError } from "@auth/core/errors";
import { Profile } from "@repo/db-checkins";
import { serverLogger as logger } from "@repo/shared-utils/dist";
import NextAuth, { DefaultSession /*, User*/ } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

// Internal Modules ----------------------------------------------------------

import { dbCheckins } from "@repo/db-checkins";
import { verifyPassword } from "./lib/Encryption";
import { SignInSchemaType } from "@/zod-schemas/SignInSchema";

// Public Objects ------------------------------------------------------------

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      /** The user's Profile. */
      profile: Profile;
    } & DefaultSession["user"];
  }
  interface User {
    profile: Profile;
  }
}

/**
 * Authentication options for auth.js.
 */
export const { auth, handlers, signIn, signOut } = NextAuth({

  callbacks: {

    /**
     * Add our local Profile into the JWT token.
     */
    async jwt({token, user, account, profile}) {
      logger.trace({
        context: "auth.jwt.input",
        account: account,
        profile: profile,
        token: token,
        user: user,
      });
      if (user) {
        token.profile = user;
      }
      logger.trace({
        context: "auth.jwt.output",
        token: token,
      })
      return token;
    },

    /**
     * Note that the session is being requested, and add the Profile to the session.
     */
    async session({session, token, user}) {
      logger.trace({
        context: "auth.session.input",
        session: session,
        token: token,
        user: user,
      });
      if (token.profile && !session.user.profile) {
        session.user.profile = token.profile as Profile;
      }
      logger.trace({
        context: "auth.session.output",
        session: session,
      });
      return session;
    },

  },

  /**
   * Configure logging for auth.js.
   */
  logger: {
    debug(code, ...message) {
      logger.debug({
        context: "auth.debug",
        code: code,
        message: message,
      });
    },
    error(error: Error) {
      // Suppress CredentialsSignIn errors, since we are already
      // logging them in the authorize() function
      if ((error instanceof SignInError) && ((error as SignInError).name === "CredentialsSignin")) {
        return;
      }
      logger.error({
        context: "auth.error",
        error: error,
      });
    },
    warn(code, ...message) {
      logger.warn({
        context: "auth.warn",
        code: code,
        message: message,
      });
    },
  },

  /**
   * The pages to use for sign in and sign out.
   */
  pages: {
    signIn: "/auth/signIn",
    signOut: "/auth/signOut",
  },

  providers: [

    CredentialsProvider({

      /**
       * Authorize a user based on credentials.
       *
       * TODO: Maybe do not specify the return type?
       */
      // @ts-expect-error ESLint does not like the type of credentials
      async authorize(credentials: SignInSchemaType) {
        logger.trace({
          context: "auth.authorize.input",
          credentials: {
            ...credentials,
            password: "*REDACTED*",
          },
        });
        const profile = await dbCheckins.profile.findUnique({
          where: {
            email: credentials.email,
          },
        });
        if (profile) {
          if (verifyPassword(credentials.password, profile.password)) {
            profile.password = "*REDACTED*"; // Redact the hashed password
            logger.trace({
              context: "auth.authorize.success",
              email: profile.email,
            });
            return {
              email: profile.email,
              name: profile.name,
              profile: profile,
            };
          } else {
            logger.error({
              context: "auth.authorize.failure.password",
              email: credentials.email,
            });
            return null;
          }
        } else {
          logger.error({
            context: "auth.authorize.failure.email",
            email: credentials.email,
          });
          return null;
        }

      },

      credentials: {
        email: {label: "Email", type: "email"},
        password: {label: "Password", type: "password"},
      },

      name: "Credentials",

    }),

  ],

  session: {
    strategy: "jwt",
  },

});

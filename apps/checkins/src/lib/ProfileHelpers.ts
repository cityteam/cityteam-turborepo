// NOTE: *Not* a "use server" file to prevent methods from being server actions

/**
 * Helper functions for Profile models, NOT exposed as server actions.
 */

// External Modules ----------------------------------------------------------

import { Profile } from "@repo/db-checkins";
import { serverLogger as logger } from "@repo/shared-utils/ServerLogger";

// Internal Modules ----------------------------------------------------------

import { auth } from "@/auth";

const isTest = process.env.NODE_ENV === "test";
let testProfile: Profile | null = null;

// Public Objects ------------------------------------------------------------

/**
 * TEST MODE: Returns the Profile (if any) recorded by a test.
 *
 * PRODUCTION MODE: If a user is currently signed in, look up and return the
 * Profile associated with that user's email address.  Otherwise, return null.
 */
export async function findProfile(): Promise<Profile | null> {

  // TEST MODE: Return the test Profile (if any)
  if (isTest) {
    if (testProfile) {
      return {
        ...testProfile,
        password: "*REDACTED*",
      }
    } else {
      return testProfile;
    }
  }

  // PRODUCTION MODE: Returned the signed in Profile from the Session (if any)
  const session = await auth();
  if (!session || !session.user || !session.user.profile) {
    return null;
  }
  logger.trace({
    context: "findProfile",
    user: session.user,
  });

  // For some weird reason, profile is nested again inside the session.user.profile object
  // @ts-expect-error next-auth nested the profile object inside another "profile" property
  const profile = session.user.profile["profile"] as Profile;

  return profile;

}

/**
 * TEST MODE ONLY: Set the Profile to be returned by findProfile().
 */
export function setTestProfile(profile: Profile | null): void {
  if (isTest) {
    testProfile = profile;
  } else {
    throw new Error("Cannot call setTestProfile() outside of test mode");
  }
}

/**
 * General utilities for encrypting and verifying passwords.
 */

// External Modules ----------------------------------------------------------

import { compareSync, hashSync } from "bcrypt-ts";

// Internal Modules ----------------------------------------------------------

// Public Objects ------------------------------------------------------------

/**
 * Perform a one-way hash on the specified password, and return the result
 * as a string.
 *
 * @param password      Plain-text password to be hashed
 */
export const hashPassword = (password: string): string => {
  return hashSync(password, 10);
}

/**
 * Verify that the specified plain-text password hashes to the specified
 * hash value.
 *
 * @param password      Plain-text password to be checked
 * @param hash          Hashed password previously calculated by hashPassword()
 */
export const verifyPassword = (
  password: string,
  hash: string,
): boolean => {
  return compareSync(password, hash);
}

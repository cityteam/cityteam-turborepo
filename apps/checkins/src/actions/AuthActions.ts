"use server";

/**
 * Authentication actions.
 */

// External Modules ----------------------------------------------------------

import { dbCheckins, Profile } from "@repo/db-checkins";
import { hashPassword } from "@repo/shared-utils/Encryption";
import { Result, ValidationResult } from "@repo/shared-utils/Result";
import { serverLogger as logger } from "@repo/shared-utils/ServerLogger";
import { ZodError } from "zod";

// Internal Modules ----------------------------------------------------------

import { signIn, signOut } from "@/auth";
import { SignInSchema, type SignInSchemaType } from "@/zod-schemas/SignInSchema";
import { SignUpSchema, type SignUpSchemaType } from "@/zod-schemas/SignUpSchema";

// Public Objects ------------------------------------------------------------

/**
 * Perform the sign in action.
 */
export async function doSignInAction(formData: SignInSchemaType): Promise<Result<Profile>> {

  logger.info({
    context: "doSignInAction.input",
    email: formData.email,
    password: "*REDACTED*",
  });

  // Check authentication - not required for signin

  // Check authorization - not required for signin

  // Check data validity
  try {
    SignInSchema.parse(formData);
  } catch (error) {
    const result = ValidationResult<Profile>(error as ZodError);
    logger.error({
      context: "doSignInAction.validation",
      formData: {
        ...formData,
        password: "*REDACTED*",
      },
      result,
    });
    return (result);
  }

  // Perform the action
  try {

    const response = await signIn("credentials", {
      email: formData.email,
      password: formData.password,
      redirect: false,
    });

    logger.info({
      context: "doSignInAction.output",
      response: response,
    });

    // Return a dummy Profile (app needs to consult the session for the real Profile)
    const profile: Profile = {
      createdAt: new Date(),
      email: formData.email,
      id: "",
      name: "",
      password: "*REDACTED*",
      updatedAt: new Date(),
    };
    return ({ model: profile });

  } catch (error) {

    // Appropriate logging already happened in the authorize() method?
    logger.error({
      context: "doSignInAction.error",
      error: error,
      message: (error as Error).message,
    });
    return ({ message: (error as Error).message });

  }

}

/**
 * Perform the sign out action.
 */
export async function doSignOutAction(): Promise<Result<null>> {

  logger.trace({
    context: "doSignOutAction.input",
  });

  try {

    await signOut();
    logger.trace({
      context: "doSignOutAction.output",
    });
    return ({message: "Success"});

  } catch (error) {

    logger.error({
      context: "doSignOutAction.error",
      error: error,
      message: (error as Error).message,
    });
    return ({message: (error as Error).message});

  }

}

/**
 * Perform the AuthJS sign up action.
 */
export async function doSignUpAction(formData: SignUpSchemaType): Promise<Result<Profile>> {

  logger.info({
    context: "doSignUpAction.input",
    email: formData.email,
    name: formData.name,
    password: "*REDACTED*",
  });

  // Check authentication - not required for signup

  // Check authorization - not required for signup
  // TODO: disallow signup unless env variable ALLOW_SIGNUP is set

  // Check data validity
  try {
    SignUpSchema.parse(formData);
  } catch (error) {
    const result = ValidationResult<Profile>(error as ZodError);
    logger.error({
      context: "doSignUpAction.validation",
      formData: {
        ...formData,
        password: "*REDACTED*",
      },
      result,
    });
    return result;
  }

  // Check uniqueness constraint validation
  const existing = await dbCheckins.profile.findUnique({
    where: {
      email: formData.email
    }
  });
  if (existing) {
    return { message: "Email already exists" };
  }

  // Create and return the new Profile
  try {

    const created = await dbCheckins.profile.create({
      data: {
        email: formData.email,
        name: formData.name,
        password: hashPassword(formData.password),
      }
    });

    logger.info({
      context: "doSignUpAction.output",
      profile: {
        ...created,
        password: "*REDACTED*",
      }
    });

    return { model: { ...created, password: "*REDACTED*" } };

  } catch (error) {

    logger.error({
      context: "doSignUpAction.error",
      error,
      message: (error as Error).message,
    });
    return ({ message: (error as Error).message });

  }

}

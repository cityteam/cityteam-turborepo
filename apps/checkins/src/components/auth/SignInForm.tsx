"use client";

/**
 * Form for the Sign In page.
 */

// External Modules ----------------------------------------------------------

import { Result } from "@repo/shared-utils/Result";
import { ServerResult } from "@repo/shadcn-tanstack-form/ServerResult";
import { useAppForm } from "@repo/shadcn-tanstack-form/useAppForm";
import {
  Card,
//  CardAction,
  CardContent,
  CardDescription,
//  CardFooter,
  CardHeader,
  CardTitle,
} from "@repo/shadcn-ui/components/card";
import { Profile } from "@repo/db-checkins";
import { clientLogger as logger } from "@repo/shared-utils/ClientLogger";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

// Internal Modules ----------------------------------------------------------

import { doSignInAction } from "@/actions/AuthActions";
import { SignInSchema, type SignInSchemaType } from "@/zod-schemas/SignInSchema";

// Public Objects ------------------------------------------------------------

export function SignInForm() {

  const router = useRouter();
  const [result, setResult] = useState<Result<Profile> | null>(null);

  const defaultValues: SignInSchemaType = {
    email: "",
    password: "",
  }

  const form = useAppForm({
    defaultValues,
    onSubmit: async ({ value }) => {
      logger.info({
        context: "SignInForm.onSubmit.input",
        value: {
          ...value,
          password: "*REDACTED*",
        }
      });
      const result = await doSignInAction(value);
      if (result.model) {

        logger.info({
          context: "SignInForm.onSubmit.success",
          email: value.email,
        });
        setResult(null);
        toast.success("Welcome to the Checkins application!");
        router.refresh();
        router.push("/"); // TODO - choose a better landing page

      } else {

        logger.info({
          context: "SignInForm.onSubmit.error",
          error: result.message,
        });
        setResult({ message: "Invalid email or password, please try again" });

      }
    },
    validators: {
      onBlur: SignInSchema,
      onChange: SignInSchema,
      onSubmit: SignInSchema,
    },
  });

  return (
    <Card className="w-96 bg-secondary text-secondary-foreground border-2 rounded-2xl">
      <CardHeader>
        <CardTitle className="w-full text-center">Sign In</CardTitle>
        <CardDescription className="text-center">
          Enter your email and password to sign in.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ServerResult result={result}/>
        <form
          className="flex flex-col gap-4"
          name="SignInForm"
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
        >
          <form.AppField name="email">
            {(field) =>
              <field.InputField
                autoFocus
                label="Email"
                placeholder="Your email address"
              />}
          </form.AppField>
          <form.AppField name="password">
            {(field) =>
              <field.InputField
                label="Password"
                placeholder="Your Password"
                type="password"
              />}
          </form.AppField>
          <form.AppForm>
            <div className="flex flex-row justify-center pt-2 gap-4">
              <form.SubmitButton label="Sign In"/>
              <form.ResetButton/>
            </div>
          </form.AppForm>
        </form>
      </CardContent>
    </Card>
  )

}

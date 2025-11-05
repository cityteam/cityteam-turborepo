"use client";

/**
 * Form for the Sign Up page.
 */

// External Modules ----------------------------------------------------------

import { Profile } from "@repo/db-checkins";
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
import { clientLogger as logger } from "@repo/shared-utils/ClientLogger";
import { Result } from "@repo/shared-utils/Result";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

// Internal Modules ----------------------------------------------------------

import { doSignUpAction } from "@/actions/AuthActions";
import { SignUpSchema, type SignUpSchemaType } from "@/zod-schemas/SignUpSchema";

// Public Objects ------------------------------------------------------------

export function SignUpForm() {

  const [result, setResult] = useState<Result<Profile> | null>(null);
  const router = useRouter();

  const defaultValues: SignUpSchemaType = {
    confirmPassword: "",
    email: "",
    name: "",
    password: "",
  }

  const form = useAppForm({
    defaultValues,
    onSubmit: async ({ value }) => {
      await submitForm(value);
    },
    validators: {
      onBlur: SignUpSchema,
      onChange: SignUpSchema,
    },
  });

  async function submitForm(formData: SignUpSchemaType) {

    logger.trace({
      context: "SignUpForm.submitForm.input",
      formData: {
        ...formData,
        confirmPassword: "*REDACTED*",
        password:"*REDACTED*",
      }
    });

    const response = await doSignUpAction(formData);
    if (response.model) {
      setResult(null);
      toast.success(`Profile for '${formData.name}' was successfully created`);
      router.push("/auth/signIn");
    } else {
      setResult(response);
    }

  }

  return (
    <Card className="w-128 bg-secondary text-secondary-foreground border-2 rounded-2xl">
      <CardHeader>
        <CardTitle className="w-full text-center">Sign Up</CardTitle>
        <CardDescription className="text-center">
          Enter your details to create your account.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ServerResult result={result}/>
        <form
          className="flex flex-col gap-4"
          name="SignUpForm"
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
            <form.AppField name="name">
              {(field) =>
                <field.InputField
                  label="Name"
                  placeholder="Your Name"
                />}
            </form.AppField>
          <div className="flex flex-row gap-2">
            <form.AppField name="password">
              {(field) =>
                <field.InputField
                  label="Password"
                  placeholder="Your Password"
                  type="password"
                />}
            </form.AppField>
            <form.AppField name="confirmPassword">
              {(field) =>
                <field.InputField
                  label="Confirm Password"
                  placeholder="Confirm Your Password"
                  type="password"
                />}
            </form.AppField>
          </div>
          <form.AppForm>
            <div className="flex flex-row justify-center pt-2 gap-4">
              <form.SubmitButton label="Sign Up" />
              <form.ResetButton/>
            </div>
          </form.AppForm>
        </form>
      </CardContent>
    </Card>
  )

}

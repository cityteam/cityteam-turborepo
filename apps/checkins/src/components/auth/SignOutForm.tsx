"use client";

/**
 * Form for the Sign Out page.
 */

// External Modules ----------------------------------------------------------

import { Profile } from "@repo/db-checkins";
import { ServerResult } from "@repo/shadcn-tanstack-form/ServerResult";
import { Button } from "@repo/shadcn-ui/components/button";
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
import { LoaderCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

// Internal Modules ----------------------------------------------------------

import { doSignOutAction } from "@/actions/AuthActions";

// Public Objects ------------------------------------------------------------

export function SignOutForm() {

  const router = useRouter();
  const [isSigningOut, setIsSigningOut] = useState<boolean>(false);
  const [result, setResult] = useState<Result<Profile> | null>(null);

  async function performSignOut() {

    logger.trace({
      context: "SignOutForm.performSignOut.input",
      message: "Performing sign out",
    })

    try {

      setIsSigningOut(true);
      await doSignOutAction();
      logger.trace({
        context: "SignOutForm.submitForm.success",
        message: "Sign out successful",
      });

      toast.success("Sign out successful");
      router.refresh();
      router.push("/"); // TODO redirect to home page or login page

    } catch (error) {

      logger.trace({
        context: "SignOutForm.submitForm.error",
        error,
      });
      setResult({message: (error as Error).message})

    } finally {

      setIsSigningOut(false);

    }

  }

  return (
    <Card className="w-96 bg-secondary text-secondary-foreground border-2 rounded-2xl">
      <CardHeader>
        <CardTitle className="w-full text-center">Sign Out</CardTitle>
        <CardDescription className="w-full text-center">
          Are you sure you want to sign out?
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ServerResult result={result}/>
        <div className="flex flex-row justify-center">
          <Button
            className="justify-center"
            disabled={isSigningOut}
            onClick={performSignOut}
          >
            {isSigningOut ? (
              <>
                <LoaderCircle className="animate-spin"/>Signing Out
              </>
            ): "Sign Out" }
          </Button>
        </div>
      </CardContent>
    </Card>
  )

}

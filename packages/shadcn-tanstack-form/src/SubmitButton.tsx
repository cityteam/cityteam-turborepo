"use client";

/**
 * TanStack Form submit button (for ShadCN).
 */

// External Modules ----------------------------------------------------------

import { Button } from "@repo/shadcn-ui/components/button";
//import clsx from "clsx";
import { LoaderCircle } from "lucide-react";
import { ButtonHTMLAttributes } from "react";

// Internal Modules ----------------------------------------------------------

import { useFormContext } from "./useAppContexts";

// Public Objects ------------------------------------------------------------

type Props = {
  // Optional CSS classes to apply to the button.
  className?: string,
  // Optional label for the button.  [Save]
  label?: string,
} & ButtonHTMLAttributes<HTMLButtonElement>;

export function SubmitButton({ /*className,*/ label, ...props }: Props) {

  const form = useFormContext();
//  const { isSubmitting } = form.state;

  return (
    <form.Subscribe
      selector={(state) =>
        [state.canSubmit, state.isSubmitting]}
    >
      {([canSubmit, isSubmitting]) => (
        <Button
          disabled={!canSubmit || isSubmitting}
          role="button"
          type="submit"
          {...props}
        >
          {isSubmitting
            ? <LoaderCircle className="animate-spin"/>
            : <span>{label ? label : "Save"}</span>
          }
        </Button>
      )}
    </form.Subscribe>
  )

}

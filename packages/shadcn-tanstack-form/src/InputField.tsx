"use client";

/**
 * TanStack Form input field for a text field with a label (for ShadCN).
 * TODO: support horizontal layout as an option.
 */

// External Modules ----------------------------------------------------------

import { Input } from "@repo/shadcn-ui/components/input";
import { Label } from "@repo/shadcn-ui/components/label";
import clsx from "clsx";
import { InputHTMLAttributes } from "react";

// Internal Modules ----------------------------------------------------------

import { FieldErrors } from "./FieldErrors";
import { useFieldContext } from "./useAppContexts";

// Public Objects ------------------------------------------------------------

type Props = {
  // Optional CSS classes to apply to the input field.
  className?: string,
  // The label for the input field.
  label: string,
  // Optional placeholder text for the input field.
  placeholder?: string,
  // Optional HTML type for the input field. [text]
  type?: string,
} & InputHTMLAttributes<HTMLInputElement>;

export function InputField({ className, label, placeholder, type, ...props }: Props) {

  const field = useFieldContext<string>();


  return (
    <div className="grid grid-cols-1 w-full gap-2">
      <legend>
        <Label htmlFor={field.name}>{label}</Label>
      </legend>
      <Input
        className={clsx("w-full", className)}
        id={field.name}
        name={field.name}
        onBlur={() => field.handleBlur()}
        onChange={(e) => field.handleChange(e.target.value)}
        placeholder={placeholder ? placeholder : undefined}
        type={type ? type : "text"}
        value={field.state.value}
        {...props}
      />
      <FieldErrors field={field} />
    </div>
  );

}

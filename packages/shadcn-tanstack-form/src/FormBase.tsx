/**
 * Generic form control wrapper component.
 *
 * The child of this component is expected to be a form component that
 * uses Tanstack Form APIs and accepts properties listed in FormControlProps.
 */

// External Modules ----------------------------------------------------------

import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@repo/shadcn-ui/components/field";
import { ReactNode } from "react";

// Internal Modules ----------------------------------------------------------

import { useFieldContext } from "./useAppContexts";

// Public Objects ------------------------------------------------------------

export type FormControlProps = {
  // Visual label for this form control
  label: string
  // Optional description for this form control
  description?: string
}

type FormBaseProps = FormControlProps & {
  children: ReactNode
  horizontal?: boolean
  controlFirst?: boolean
}

export function FormBase({
  children,
  label,
  description,
  controlFirst,
  horizontal,
}: FormBaseProps) {
  const field = useFieldContext()
  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid
  const labelElement = (
    <>
      <FieldLabel htmlFor={field.name}>{label}</FieldLabel>
      {description && <FieldDescription>{description}</FieldDescription>}
    </>
  )
  const errorElem = isInvalid && <FieldError errors={field.state.meta.errors} />

  return (
    <Field
      data-invalid={isInvalid}
      orientation={horizontal ? "horizontal" : undefined}
    >
      {controlFirst ? (
        <>
          {children}
          <FieldContent>
            {labelElement}
            {errorElem}
          </FieldContent>
        </>
      ) : (
        <>
          <FieldContent className="w-full">
            {labelElement}
            {children}
            {errorElem}
          </FieldContent>
        </>
      )}
    </Field>
  )
}

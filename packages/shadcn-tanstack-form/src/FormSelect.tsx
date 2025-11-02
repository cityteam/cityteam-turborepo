/**
 * Select component using TanStack Form and Shadcn UI.
 *
 * The children of this component must acceptable as children
 * of a Shadcn SelectContent component.
 */

// External Modules ----------------------------------------------------------

import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue
} from "@repo/shadcn-ui/components/select";
import { ReactNode } from "react"

// Internal Modules ----------------------------------------------------------

// Public Objects ------------------------------------------------------------

import { FormBase, FormControlProps } from "./FormBase";
import { useFieldContext } from "./useAppContexts";

export function FormSelect({
  children,
  ...props
}: FormControlProps & { children: ReactNode }) {
  const field = useFieldContext<string>()
  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid

  return (
    <FormBase {...props}>
      <Select
        onValueChange={e => field.handleChange(e)}
        value={field.state.value}
      >
        <SelectTrigger
          aria-invalid={isInvalid}
          id={field.name}
          onBlur={field.handleBlur}
        >
          <SelectValue />
        </SelectTrigger>
        <SelectContent>{children}</SelectContent>
      </Select>
    </FormBase>
  )
}

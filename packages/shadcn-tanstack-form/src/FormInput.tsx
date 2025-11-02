/**
 * Input component using TanStack Form and Shadcn UI.
 */

// External Modules ----------------------------------------------------------

import { Input } from "@repo/shadcn-ui/components/input";

// Internal Modules ----------------------------------------------------------

import { FormBase, FormControlProps } from "./FormBase";
import { useFieldContext } from "./useAppContexts";

// Public Objects ------------------------------------------------------------

export function FormInput(props: FormControlProps) {
  const field = useFieldContext<string>()
  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid

  return (
    <FormBase {...props}>
      <Input
        id={field.name}
        name={field.name}
        value={field.state.value}
        onBlur={field.handleBlur}
        onChange={e => field.handleChange(e.target.value)}
        aria-invalid={isInvalid}
      />
    </FormBase>
  )
}

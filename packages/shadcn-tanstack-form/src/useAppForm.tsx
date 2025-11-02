"use client";

/**
 * Shared infrastructure for forms based on TanStack Form (for ShadCN).
 */

// External Modules ----------------------------------------------------------

import { createFormHook } from "@tanstack/react-form";

// Internal Modules ----------------------------------------------------------

import { FormCheckbox } from "./FormCheckbox";
import { FormInput } from "./FormInput";
import { FormSelect } from "./FormSelect";
import { FormTextarea } from "./FormTextarea";
import { InputField } from "./InputField";
import { ResetButton } from "./ResetButton";
import { SubmitButton } from "./SubmitButton";
import { fieldContext, formContext } from "./useAppContexts";

// Public Objects ------------------------------------------------------------

export const { useAppForm, withForm } = createFormHook({
  fieldComponents: {
    // Field based components
    Checkbox: FormCheckbox,
    Input : FormInput,
    Select: FormSelect,
    Textarea: FormTextarea,
    // Original components
    InputField,
  },
  fieldContext,
  formComponents: {
    // Original components
    ResetButton,
    SubmitButton,
  },
  formContext,
});

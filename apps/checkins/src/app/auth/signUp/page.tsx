/**
 * Sign up to create a new profile page.
 */

// Internal Modules ----------------------------------------------------------

import { SignUpForm } from "@/components/auth/SignUpForm";

// Public Objects ------------------------------------------------------------

export default function SignUpPage() {
  return (
    <main className="flex w-full items-center justify-center p-4">
      <SignUpForm />
    </main>
  )
}

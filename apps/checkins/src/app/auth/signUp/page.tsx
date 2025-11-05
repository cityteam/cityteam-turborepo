/**
 * Sign up to create a new profile page.
 *
 * @packageDocumentation
 */

// Internal Modules ----------------------------------------------------------

import { SignUpForm } from "@/components/auth/SignUpForm";

// Public Objects ------------------------------------------------------------

export default function SignUpPage() {
  return (
    <main className="flex w-full items-center justify-center h-[calc(100vh-80px)] p-4">
      <SignUpForm />
    </main>
  )
}

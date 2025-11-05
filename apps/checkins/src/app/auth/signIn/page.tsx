/**
 * Sign in with a registered email address and password.
 */

// Internal Modules ----------------------------------------------------------

import { SignInForm } from "@/components/auth/SignInForm";

// Public Objects ------------------------------------------------------------

export default function SignInPage() {
  return (
    <main className="flex w-full items-center justify-center h-[calc(100vh-80px)] p-4">
      <SignInForm/>
    </main>
  )
}

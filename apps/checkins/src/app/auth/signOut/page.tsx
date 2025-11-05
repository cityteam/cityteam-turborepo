/**
 * Sign out after confirmation.
 */

// Internal Modules ----------------------------------------------------------

import { SignOutForm } from "@/components/auth/SignOutForm";

// Public Objects ------------------------------------------------------------

export default function SignOutPage() {

  return (
    <main className="flex w-full items-center justify-center h-[calc(100vh-80px)] p-4">
      <SignOutForm/>
    </main>
  )
}

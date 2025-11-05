/**
 * Home Page for the Checkins application.
 */

// External Imports ----------------------------------------------------------

import { Button } from "@repo/shadcn-ui/components/button";
import Link from "next/link";

// Public Objects ------------------------------------------------------------

export default function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center pt-8 min-h-full">
      <h1 className="text-4xl pb-8">Welcome to Checkins</h1>
      <p className="text-2xl pb-8">
        Nightly Guest Checkins for CityTeam
      </p>
      <div className="flex flex-row justify-center gap-4">
        <Button  asChild>
          <Link href="/auth/signIn">Sign In</Link>
        </Button>
        <Button variant="secondary" asChild>
          <Link href="/auth/signUp">Sign Up</Link>
        </Button>
      </div>
    </div>
  );
}

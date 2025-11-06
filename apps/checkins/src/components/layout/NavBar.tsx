/**
 * Top-level menu bar component for the shadcn-ui-alone application.
 */

// External Imports ----------------------------------------------------------

import { CopyCheck } from "lucide-react";
import Link from "next/link";
import { Profile } from "@repo/db-checkins";
import { Button } from "@repo/shadcn-ui/components/button";

// Internal Imports ----------------------------------------------------------

import { SignedInMenu } from "@/components/layout/SignedInMenu";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import { findProfile } from "@/lib/ProfileHelpers";

// Public Objects ------------------------------------------------------------

export async function NavBar() {

  const profile = await findProfile();

  return (
    <div className="flex w-full h-[60px] bg-slate-200 items-center justify-between px-2">

      <div className="flex gap-2 justify-start">
        <CopyCheck size={24} />
        <Link className="font-semibold" href="/">Checkins</Link>
      </div>

      <div className="flex flex-row gap-4 justify-center">
        TODO (must be separate client component(s))
      </div>

      <div className="flex justify-end gap-2">
        {profile && <SignedInMenu profile={profile}/>}
        <ThemeToggle />
      </div>

    </div>
  )

}

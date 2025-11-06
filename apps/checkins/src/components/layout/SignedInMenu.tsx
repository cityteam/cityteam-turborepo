"use client";

/**
 * Dropdown menu for signed-in users.
 */

// External Module -----------------------------------------------------------

import { Profile } from "@repo/db-checkins";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@repo/shadcn-ui/components/dropdown-menu";
import Link from "next/link";

// Internal Modules ----------------------------------------------------------

import { ProfileAvatar } from "@/components/profiles/ProfileAvatar";

// Public Objects ------------------------------------------------------------

type Props = {
  // Profile for which to create a menu
  profile: Profile;
}

export function SignedInMenu ({ profile }: Props){

  const CHOICES = [
    { title: "Edit Profile", href: "/profile" },
    { title: "Edit Lists", href: "/lists" },
    { title: "Sign Out", href: "/auth/signOut" },
  ];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <ProfileAvatar profile={profile} />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {CHOICES.map((CHOICE) => (
          <DropdownMenuItem key={CHOICE.title}>
            <Link href={CHOICE.href}>
              {CHOICE.title}
            </Link>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

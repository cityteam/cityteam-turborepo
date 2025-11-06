/**
 * Avatar for a Profile.
 */

// External Modules ----------------------------------------------------------

import { Profile } from "@repo/db-checkins";
import Image from "next/image";

// Internal Modules ----------------------------------------------------------

import { initials } from "@repo/shared-utils/Strings";

// Public Objects ------------------------------------------------------------

type Props = {
  // Profile for which to create an avatar
  profile: Profile;
}

export function ProfileAvatar({ profile }: Props) {

  return (
    <div className="group relative mx-3 flex h-[48px] w-[48px] overflow-hidden rounded-[24px] transition-all group-hover:rounded-[16px]">
        <span className="flex h-[48px] w-[48px] items-center justify-center overflow-hidden rounded-[24px] bg-base-300 text-xs transition-all bg-secondary group-hover:rounded-[16px] group-hover:bg-accent">
          <span className="text-secondary-content">{initials(profile.name)}</span>
        </span>
    </div>
  );

}

"use server";

/**
 * Seed actions for the Checkins application.
 */

// External Imports ----------------------------------------------------------

import { dbCheckins, Facility, Member, Profile } from "@repo/db-checkins";
import { hashPassword } from "@repo/shared-utils/Encryption";
import { serverLogger as logger } from "@repo/shared-utils/ServerLogger";
import { exit } from "node:process";

// Public Actions ------------------------------------------------------------

/**
 * Seed the database with initial Facilities.
 */

const facilities: Partial<Facility>[] = [
  {
    active: true,
    address1: "634 Sprout Street",
    city: "Chester",
    email: "chester@cityteam.org",
    name: "Chester",
    phone: "610-872-6865",
    state: "PA",
    zipCode: "19013",
  },
  {
    active: true,
    address1: "722 Washington Street",
    city: "Oakland",
    email: "oakland@cityteam.org",
    name: "Oakland",
    phone: "510-452-3758",
    state: "CA",
    zipCode: "94607",
  },
  {
    active: true,
    address1: "526 SE Grand Avenue",
    city: "Portland",
    email: "portland@cityteam.org",
    name: "Portlaqnd",
    phone: "503-231-9334",
    state: "OR",
    zipCode: "97214",
  },
  {
    active: true,
    address1: "164 6th Street",
    city: "San Francisco",
    email: "sanfrancisco@cityteam.org",
    name: "San Francisco",
    phone: "415-861-8688",
    state: "CA",
    zipCode: "94103",
  },
  {
    active: true,
    address1: "634 Sprout Street",
    city: "Chester",
    email: "chester@cityteam.org",
    name: "Oakland",
    phone: "610-872-6865",
    state: "PA",
    zipCode: "19013",
  },
  {
    active: true,
    address1: "2306 Zanker Road",
    city: "San Jose",
    email: "sanjose@cityteam.org",
    name: "San Jose",
    phone: "408-232-5600",
    state: "CA",
    zipCode: "95131",
  },
  {
    active: true,
    address1: "1234 Test Ave",
    city: "Portland",
    email: "test@example.org",
    name: "Test Facility",
    state: "OR",
    zipCode: "12345",
  }
];

const seededFacilities: Facility[] = [];

const password = process.env.SUPERUSER_PASSWORD || undefined;
const profile: Partial<Profile> = {
  email: process.env.SUPERUSER_EMAIL || undefined,
  name: process.env.SUPERUSER_NAME || undefined,
  password: password ? hashPassword(password) : undefined,
}

async function main() {

  // Seed Facilities
  logger.info({
    context: `Seeding ${facilities.length} Facilities`,
  });
  for (const facility of facilities) {
    const seededFacility = await dbCheckins.facility.upsert({
      create: facility as Facility,
      update: facility as Facility,
      where: {name: facility.name!},
    });
    seededFacilities.push(seededFacility);
  }
  logger.info({
    context: `Seeding ${facilities.length} Facilities successful`,
  })

  // Seed Superuser Profile and Members
  if (profile.email && profile.name && profile.password) {
    logger.info({
      context: `Seeding superuser Profile and ${facilities.length} Members`
    });
    const superuserProfile = await dbCheckins.profile.upsert({
      create: profile as Profile,
      update: profile as Profile,
      where: {email: profile.email},
    });
    for (const facility of seededFacilities) {
      const proposedMember: Partial<Member> = {
        active: true,
        admin: true,
        facilityId: facility.id,
        profileId: superuserProfile.id,
      }
      const existingMember = await dbCheckins.member.findFirst({
        where: {
          facilityId: facility.id,
          profileId: superuserProfile.id,
        }
      });
      if (!existingMember) {
        await dbCheckins.member.create({
          data: proposedMember as Member,
        });
      } else {
        await dbCheckins.member.update({
          data: proposedMember as Member,
          where: {id: existingMember.id},
        });
      }
    }
  } else {
    logger.error({
      context: "Superuser Profile not created - missing environment variables",
    });
  }

}

main()
.then(() => {
  logger.info({
    context: "Seeding completed successfully",
  });
  exit(0);
})
.catch((error) => {
  console.error({
    context: "Seeding failed",
    error,
  });
  exit(1);
});

"use server";

/**
 * Seed actions for the Checkins application.
 */

// External Imports ----------------------------------------------------------

import { dbCheckins, Facility } from "@repo/db-checkins";
//import { hashPassword } from "@repo/shared-utils/Encryption";
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

async function main() {

  console.log(`Seeding ${facilities.length} Facilities...`);
  for (const facility of facilities) {
    await dbCheckins.facility.upsert({
      create: facility as Facility,
      update: facility as Facility,
      where: {name: facility.name!},
    });
  }
  console.log("Seeding Facilities successful.");

}

main()
.then(() => {
  console.log("Seeding completed successfully.");
  exit(0);
})
.catch((error) => {
  console.error(error);
  exit(1);
});

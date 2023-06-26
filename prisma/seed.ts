const bcrypt = require("bcryptjs");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function seed() {
  const email = "sayantandey23@gmail.com";

  // cleanup the existing database
  await prisma.user.delete({ where: { email } }).catch(() => {
    // no worries if it doesn't exist yet
  });

  const hashedPassword = await bcrypt.hash("sojapwd", 10);

  const user = await prisma.user.create({
    data: {
      email,
      password: {
        create: {
          hash: hashedPassword,
        },
      },
      dob: new Date("1992-03-28"),
      mobile: "9876543210",
      firstname: "Rachel",
      lastname: "Reynolds",
      nationality: "Indian",
      sex: "F",
      address: "23, Apartment Name, Road Name, City",
    },
  });

  await prisma.foodPlan.createMany({
    data: [
      {
        name: "CP",
        nonVeg: true,
        tariff: 150,
      },
      {
        name: "CP",
        nonVeg: false,
        tariff: 130,
      },
      {
        name: "AP",
        nonVeg: true,
        tariff: 400,
      },
      {
        name: "AP",
        nonVeg: false,
        tariff: 350,
      },
      {
        name: "EP",
        tariff: 0,
      },
      {
        name: "AMD",
        nonVeg: true,
        tariff: 500,
      },
      {
        name: "AMD",
        nonVeg: false,
        tariff: 450,
      },
    ],
  });

  await prisma.amenity.createMany({
    data: [
      { name: "WiFi", description: "Free high speed WiFi available" },
      { name: "Power Backup", description: "24/7 power" },
      {
        name: "Pickup/Drop",
        description: "Free pickup and drop to Private volvo stand",
      },
      {
        name: "Guided Tours",
        description: "Guided customised tours at extra cost",
      },
    ],
  });

  await prisma.feature.createMany({
    data: [
      {
        name: "Heater",
        description: "Room heater available at 100/- per night",
      },
      {
        name: "Work-Desk",
      },
      {
        name: "Mountain view",
      },
      {
        name: "24/7 Hot water",
      },
    ],
  });

  await prisma.location.create({
    data: {
      name: "Manali",
      altitude: 6530,
      lat: 23.5,
      long: 25.5,
      description:
        "A bustling Himachali town located at the northern half of Kullu Valley. It is also the gateway of Ladakh from the Himachal Side",
      state: "Himachal Pradesh",
    },
  });

  await prisma.homestay.create({
    data: {
      name: "Your Himalayan Home (Manali)",
      address: "123, Siyal Road, Upper Nasogi, Manali, Himachal: 175103",
      locationName: "Manali",
    },
  });
  console.log(`Database has been seeded. 🌱`);
}

seed()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

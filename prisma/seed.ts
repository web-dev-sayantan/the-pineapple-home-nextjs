const bcrypt = require("bcryptjs");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function seed() {
  const email = "sayantandey23@gmail.com";

  // cleanup the existing database
  await prisma.user.delete({ where: { email } }).catch(() => {
    // no worries if it doesn't exist yet
  });

  await prisma.admin.delete({ where: { email } }).catch(() => {
    // no worries if it doesn't exist yet
  });

  const hashedPassword = await bcrypt.hash("sojapwd", 10);

  await prisma.user.create({
    data: {
      email,
      password: {
        create: {
          hash: hashedPassword,
        },
      },
      dob: new Date("1992-03-28"),
      mobile: "9876543210",
      firstname: "Sayantan",
      lastname: "Dey",
      nationality: "Indian",
      sex: "M",
      address: "5G, Kalicharan Dutta Road, Kolkata - 700061",
    },
  });

  await prisma.admin.create({
    data: {
      email,
      password: {
        create: {
          hash: hashedPassword,
        },
      },
      dob: new Date("1992-01-10"),
      mobile: "9748365829",
      firstname: "Sayantan",
      lastname: "Dey",
      nationality: "Indian",
      sex: "M",
      address: "5G, Kalicharan Dutta Road, Kolkata - 700061",
    },
  });

  // await prisma.foodPlan.createMany({
  //   data: [
  //     {
  //       name: "CP",
  //       nonVeg: true,
  //       tariff: 150,
  //     },
  //     {
  //       name: "CP",
  //       nonVeg: false,
  //       tariff: 130,
  //     },
  //     {
  //       name: "AP",
  //       nonVeg: true,
  //       tariff: 400,
  //     },
  //     {
  //       name: "AP",
  //       nonVeg: false,
  //       tariff: 350,
  //     },
  //     {
  //       name: "EP",
  //       tariff: 0,
  //     },
  //     {
  //       name: "AMD",
  //       nonVeg: true,
  //       tariff: 500,
  //     },
  //     {
  //       name: "AMD",
  //       nonVeg: false,
  //       tariff: 450,
  //     },
  //   ],
  // });

  // await prisma.amenity.createMany({
  //   data: [
  //     { name: "WiFi", description: "Free high speed WiFi available" },
  //     { name: "Power Backup", description: "24/7 power" },
  //     {
  //       name: "Pickup/Drop",
  //       description: "Free pickup and drop to Private volvo stand",
  //     },
  //     {
  //       name: "Guided Tours",
  //       description: "Guided customised tours at extra cost",
  //     },
  //   ],
  // });

  // await prisma.feature.createMany({
  //   data: [
  //     {
  //       name: "Heater",
  //       description: "Room heater available at 100/- per night",
  //     },
  //     {
  //       name: "Work-Desk",
  //     },
  //     {
  //       name: "Mountain view",
  //     },
  //     {
  //       name: "24/7 Hot water",
  //     },
  //   ],
  // });

  await prisma.location.createMany({
    data: [
      {
        name: "Manali",
        altitude: 6530,
        lat: 32.24,
        long: 77.19,
        description:
          "A bustling Himachali town located at the northern half of Kullu Valley. It is also the gateway of Ladakh from the Himachal Side",
        state: "Himachal Pradesh",
        coverUrl:
          "https://res.cloudinary.com/dacarphbj/image/upload/f_auto,q_auto/v1/aashiyaana-webapp/manali-card-cover",
      },
      {
        name: "Jibhi",
        altitude: 5300,
        lat: 31.59,
        long: 77.36,
        description:
          "A quaint Himachali hamlet located in the lush green Parvati Valley.",
        state: "Himachal Pradesh",
        coverUrl:
          "https://res.cloudinary.com/dacarphbj/image/upload/f_auto,q_auto/v1/aashiyaana-webapp/jibhi-card-cover",
      },
    ],
  });

  await prisma.homestay.create({
    data: {
      name: "Aashiyaana (Manali)",
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

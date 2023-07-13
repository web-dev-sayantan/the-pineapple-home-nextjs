
> the-pineapple-home@0.1.0 prisma /Users/sayantan/Developer/webapps/aashiyaana-nextjs
> prisma "migrate" "diff" "--from-empty" "--to-schema-datamodel" "prisma/schema.prisma" "--script"

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "mobile" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "firstname" TEXT NOT NULL,
    "lastname" TEXT NOT NULL,
    "sex" TEXT NOT NULL,
    "dob" TIMESTAMP(3) NOT NULL,
    "nationality" TEXT NOT NULL,
    "address" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Password" (
    "hash" TEXT NOT NULL,
    "userId" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Admin" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "mobile" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "firstname" TEXT NOT NULL,
    "lastname" TEXT NOT NULL,
    "sex" TEXT,
    "dob" TIMESTAMP(3) NOT NULL,
    "nationality" TEXT,
    "address" TEXT,

    CONSTRAINT "Admin_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AdminPassword" (
    "hash" TEXT NOT NULL,
    "adminId" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Guest" (
    "id" TEXT NOT NULL,
    "firstname" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "mobile" TEXT,
    "email" TEXT,

    CONSTRAINT "Guest_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Location" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "lat" DOUBLE PRECISION NOT NULL,
    "long" DOUBLE PRECISION NOT NULL,
    "state" TEXT NOT NULL,
    "altitude" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "coverUrl" TEXT NOT NULL,

    CONSTRAINT "Location_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Homestay" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "locationName" TEXT NOT NULL,

    CONSTRAINT "Homestay_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Room" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "toiletAttached" BOOLEAN NOT NULL,
    "airConditioned" BOOLEAN NOT NULL,
    "kitchenAttached" BOOLEAN NOT NULL,
    "isDorm" BOOLEAN NOT NULL,
    "homestayId" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "occupancy" INTEGER NOT NULL,
    "houseRecommendation" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Room_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Category" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "roomId" TEXT,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Rate" (
    "id" TEXT NOT NULL,
    "headCount" INTEGER NOT NULL,
    "tariff" INTEGER NOT NULL,
    "refundable" BOOLEAN NOT NULL,
    "roomId" TEXT NOT NULL,

    CONSTRAINT "Rate_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FoodPlan" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "tariff" DECIMAL(65,30) NOT NULL,
    "nonVeg" BOOLEAN,

    CONSTRAINT "FoodPlan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Reservation" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "modifiedAt" TIMESTAMP(3) NOT NULL,
    "dateIn" TIMESTAMP(3) NOT NULL,
    "dateOut" TIMESTAMP(3) NOT NULL,
    "totalAmount" DECIMAL(65,30) NOT NULL,
    "dueAmount" DECIMAL(65,30) NOT NULL,
    "userId" TEXT NOT NULL,
    "homestayId" TEXT NOT NULL,

    CONSTRAINT "Reservation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RoomReserved" (
    "id" TEXT NOT NULL,
    "pax" INTEGER NOT NULL,
    "amount" DECIMAL(65,30) NOT NULL,
    "status" TEXT NOT NULL,
    "guestId" TEXT NOT NULL,
    "roomId" TEXT NOT NULL,
    "foodPlanId" TEXT NOT NULL,

    CONSTRAINT "RoomReserved_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Amenity" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,

    CONSTRAINT "Amenity_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Feature" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,

    CONSTRAINT "Feature_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "HomestayAmenities" (
    "homestayId" TEXT NOT NULL,
    "amenityId" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "RoomFeatures" (
    "roomId" TEXT NOT NULL,
    "featureId" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "HomestayGallery" (
    "url" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "description" TEXT,
    "homestayId" TEXT NOT NULL,

    CONSTRAINT "HomestayGallery_pkey" PRIMARY KEY ("url")
);

-- CreateTable
CREATE TABLE "RoomGallery" (
    "url" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "description" TEXT,
    "roomId" TEXT NOT NULL,

    CONSTRAINT "RoomGallery_pkey" PRIMARY KEY ("url")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_mobile_key" ON "User"("mobile");

-- CreateIndex
CREATE UNIQUE INDEX "Password_userId_key" ON "Password"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Admin_email_key" ON "Admin"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Admin_mobile_key" ON "Admin"("mobile");

-- CreateIndex
CREATE UNIQUE INDEX "AdminPassword_adminId_key" ON "AdminPassword"("adminId");

-- CreateIndex
CREATE UNIQUE INDEX "Guest_mobile_key" ON "Guest"("mobile");

-- CreateIndex
CREATE UNIQUE INDEX "Guest_email_key" ON "Guest"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Location_name_key" ON "Location"("name");

-- CreateIndex
CREATE INDEX "Homestay_locationName_idx" ON "Homestay"("locationName");

-- CreateIndex
CREATE INDEX "Room_homestayId_idx" ON "Room"("homestayId");

-- CreateIndex
CREATE INDEX "Rate_roomId_idx" ON "Rate"("roomId");

-- CreateIndex
CREATE UNIQUE INDEX "FoodPlan_name_nonVeg_key" ON "FoodPlan"("name", "nonVeg");

-- CreateIndex
CREATE INDEX "Reservation_userId_idx" ON "Reservation"("userId");

-- CreateIndex
CREATE INDEX "Reservation_homestayId_idx" ON "Reservation"("homestayId");

-- CreateIndex
CREATE INDEX "RoomReserved_guestId_idx" ON "RoomReserved"("guestId");

-- CreateIndex
CREATE INDEX "RoomReserved_roomId_idx" ON "RoomReserved"("roomId");

-- CreateIndex
CREATE INDEX "RoomReserved_foodPlanId_idx" ON "RoomReserved"("foodPlanId");

-- CreateIndex
CREATE UNIQUE INDEX "Amenity_name_key" ON "Amenity"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Feature_name_key" ON "Feature"("name");

-- CreateIndex
CREATE INDEX "HomestayAmenities_homestayId_idx" ON "HomestayAmenities"("homestayId");

-- CreateIndex
CREATE INDEX "HomestayAmenities_amenityId_idx" ON "HomestayAmenities"("amenityId");

-- CreateIndex
CREATE UNIQUE INDEX "HomestayAmenities_homestayId_amenityId_key" ON "HomestayAmenities"("homestayId", "amenityId");

-- CreateIndex
CREATE INDEX "RoomFeatures_roomId_idx" ON "RoomFeatures"("roomId");

-- CreateIndex
CREATE INDEX "RoomFeatures_featureId_idx" ON "RoomFeatures"("featureId");

-- CreateIndex
CREATE UNIQUE INDEX "RoomFeatures_roomId_featureId_key" ON "RoomFeatures"("roomId", "featureId");

-- CreateIndex
CREATE INDEX "HomestayGallery_homestayId_idx" ON "HomestayGallery"("homestayId");

-- CreateIndex
CREATE INDEX "RoomGallery_roomId_idx" ON "RoomGallery"("roomId");

-- AddForeignKey
ALTER TABLE "Password" ADD CONSTRAINT "Password_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AdminPassword" ADD CONSTRAINT "AdminPassword_adminId_fkey" FOREIGN KEY ("adminId") REFERENCES "Admin"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Homestay" ADD CONSTRAINT "Homestay_locationName_fkey" FOREIGN KEY ("locationName") REFERENCES "Location"("name") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Room" ADD CONSTRAINT "Room_homestayId_fkey" FOREIGN KEY ("homestayId") REFERENCES "Homestay"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Category" ADD CONSTRAINT "Category_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "Room"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Rate" ADD CONSTRAINT "Rate_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "Room"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reservation" ADD CONSTRAINT "Reservation_homestayId_fkey" FOREIGN KEY ("homestayId") REFERENCES "Homestay"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reservation" ADD CONSTRAINT "Reservation_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RoomReserved" ADD CONSTRAINT "RoomReserved_foodPlanId_fkey" FOREIGN KEY ("foodPlanId") REFERENCES "FoodPlan"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RoomReserved" ADD CONSTRAINT "RoomReserved_guestId_fkey" FOREIGN KEY ("guestId") REFERENCES "Guest"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RoomReserved" ADD CONSTRAINT "RoomReserved_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "Room"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HomestayAmenities" ADD CONSTRAINT "HomestayAmenities_amenityId_fkey" FOREIGN KEY ("amenityId") REFERENCES "Amenity"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HomestayAmenities" ADD CONSTRAINT "HomestayAmenities_homestayId_fkey" FOREIGN KEY ("homestayId") REFERENCES "Homestay"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RoomFeatures" ADD CONSTRAINT "RoomFeatures_featureId_fkey" FOREIGN KEY ("featureId") REFERENCES "Feature"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RoomFeatures" ADD CONSTRAINT "RoomFeatures_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "Room"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HomestayGallery" ADD CONSTRAINT "HomestayGallery_homestayId_fkey" FOREIGN KEY ("homestayId") REFERENCES "Homestay"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RoomGallery" ADD CONSTRAINT "RoomGallery_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "Room"("id") ON DELETE CASCADE ON UPDATE CASCADE;


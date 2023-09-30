CREATE TABLE IF NOT EXISTS "Admin" (
	"id" text PRIMARY KEY NOT NULL,
	"email" text NOT NULL,
	"mobile" text NOT NULL,
	"createdAt" timestamp(3) DEFAULT now() NOT NULL,
	"updatedAt" timestamp(3) NOT NULL,
	"firstname" text NOT NULL,
	"lastname" text NOT NULL,
	"sex" text,
	"dob" timestamp(3) NOT NULL,
	"nationality" text,
	"address" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "AdminPassword" (
	"hash" text NOT NULL,
	"adminId" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "Amenity" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"description" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "Category" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"description" text NOT NULL,
	"roomId" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "Feature" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"description" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "FoodPlan" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"tariff" numeric(65, 30) NOT NULL,
	"nonVeg" boolean
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "Guest" (
	"id" text PRIMARY KEY NOT NULL,
	"firstname" text NOT NULL,
	"lastName" text NOT NULL,
	"mobile" text,
	"email" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "Homestay" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"address" text NOT NULL,
	"locationName" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "HomestayAmenities" (
	"homestayId" text NOT NULL,
	"amenityId" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "HomestayGallery" (
	"url" text PRIMARY KEY NOT NULL,
	"category" text NOT NULL,
	"description" text,
	"homestayId" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "Location" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"lat" double precision NOT NULL,
	"long" double precision NOT NULL,
	"state" text NOT NULL,
	"altitude" integer NOT NULL,
	"description" text NOT NULL,
	"coverUrl" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "Password" (
	"hash" text NOT NULL,
	"userId" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "_prisma_migrations" (
	"id" varchar(36) PRIMARY KEY NOT NULL,
	"checksum" varchar(64) NOT NULL,
	"finished_at" timestamp with time zone,
	"migration_name" varchar(255) NOT NULL,
	"logs" text,
	"rolled_back_at" timestamp with time zone,
	"started_at" timestamp with time zone DEFAULT now() NOT NULL,
	"applied_steps_count" integer DEFAULT 0 NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "Rate" (
	"id" text PRIMARY KEY NOT NULL,
	"headCount" integer NOT NULL,
	"tariff" integer NOT NULL,
	"refundable" boolean NOT NULL,
	"roomId" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "Reservation" (
	"id" text PRIMARY KEY NOT NULL,
	"createdAt" timestamp(3) NOT NULL,
	"modifiedAt" timestamp(3) NOT NULL,
	"dateIn" timestamp(3) NOT NULL,
	"dateOut" timestamp(3) NOT NULL,
	"totalAmount" numeric(65, 30) NOT NULL,
	"dueAmount" numeric(65, 30) NOT NULL,
	"userId" text NOT NULL,
	"homestayId" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "Room" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"toiletAttached" boolean NOT NULL,
	"airConditioned" boolean NOT NULL,
	"kitchenAttached" boolean NOT NULL,
	"isDorm" boolean NOT NULL,
	"homestayId" text NOT NULL,
	"description" text NOT NULL,
	"occupancy" integer NOT NULL,
	"houseRecommendation" boolean DEFAULT false NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "RoomFeatures" (
	"roomId" text NOT NULL,
	"featureId" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "RoomGallery" (
	"url" text PRIMARY KEY NOT NULL,
	"category" text NOT NULL,
	"description" text,
	"roomId" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "RoomReserved" (
	"id" text PRIMARY KEY NOT NULL,
	"pax" integer NOT NULL,
	"amount" numeric(65, 30) NOT NULL,
	"status" text NOT NULL,
	"guestId" text NOT NULL,
	"roomId" text NOT NULL,
	"foodPlanId" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "User" (
	"id" text PRIMARY KEY NOT NULL,
	"email" text NOT NULL,
	"mobile" text NOT NULL,
	"createdAt" timestamp(3) DEFAULT now() NOT NULL,
	"updatedAt" timestamp(3) NOT NULL,
	"firstname" text NOT NULL,
	"lastname" text NOT NULL,
	"sex" text NOT NULL,
	"dob" timestamp(3) NOT NULL,
	"nationality" text NOT NULL,
	"address" text
);
--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "Admin_email_key" ON "Admin" ("email");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "Admin_mobile_key" ON "Admin" ("mobile");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "AdminPassword_adminId_key" ON "AdminPassword" ("adminId");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "Amenity_name_key" ON "Amenity" ("name");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "Feature_name_key" ON "Feature" ("name");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "FoodPlan_name_nonVeg_key" ON "FoodPlan" ("name","nonVeg");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "Guest_mobile_key" ON "Guest" ("mobile");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "Guest_email_key" ON "Guest" ("email");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "Homestay_locationName_idx" ON "Homestay" ("locationName");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "HomestayAmenities_homestayId_idx" ON "HomestayAmenities" ("homestayId");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "HomestayAmenities_amenityId_idx" ON "HomestayAmenities" ("amenityId");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "HomestayAmenities_homestayId_amenityId_key" ON "HomestayAmenities" ("homestayId","amenityId");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "HomestayGallery_homestayId_idx" ON "HomestayGallery" ("homestayId");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "Password_userId_key" ON "Password" ("userId");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "Rate_roomId_idx" ON "Rate" ("roomId");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "Reservation_userId_idx" ON "Reservation" ("userId");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "Reservation_homestayId_idx" ON "Reservation" ("homestayId");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "Room_homestayId_idx" ON "Room" ("homestayId");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "RoomFeatures_roomId_idx" ON "RoomFeatures" ("roomId");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "RoomFeatures_featureId_idx" ON "RoomFeatures" ("featureId");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "RoomFeatures_roomId_featureId_key" ON "RoomFeatures" ("roomId","featureId");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "RoomGallery_roomId_idx" ON "RoomGallery" ("roomId");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "RoomReserved_guestId_idx" ON "RoomReserved" ("guestId");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "RoomReserved_roomId_idx" ON "RoomReserved" ("roomId");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "RoomReserved_foodPlanId_idx" ON "RoomReserved" ("foodPlanId");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "User_email_key" ON "User" ("email");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "User_mobile_key" ON "User" ("mobile");--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "AdminPassword" ADD CONSTRAINT "AdminPassword_adminId_Admin_id_fk" FOREIGN KEY ("adminId") REFERENCES "Admin"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Category" ADD CONSTRAINT "Category_roomId_Room_id_fk" FOREIGN KEY ("roomId") REFERENCES "Room"("id") ON DELETE set null ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Homestay" ADD CONSTRAINT "Homestay_locationName_Location_name_fk" FOREIGN KEY ("locationName") REFERENCES "Location"("name") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "HomestayAmenities" ADD CONSTRAINT "HomestayAmenities_homestayId_Homestay_id_fk" FOREIGN KEY ("homestayId") REFERENCES "Homestay"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "HomestayAmenities" ADD CONSTRAINT "HomestayAmenities_amenityId_Amenity_id_fk" FOREIGN KEY ("amenityId") REFERENCES "Amenity"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "HomestayGallery" ADD CONSTRAINT "HomestayGallery_homestayId_Homestay_id_fk" FOREIGN KEY ("homestayId") REFERENCES "Homestay"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Password" ADD CONSTRAINT "Password_userId_User_id_fk" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Rate" ADD CONSTRAINT "Rate_roomId_Room_id_fk" FOREIGN KEY ("roomId") REFERENCES "Room"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Reservation" ADD CONSTRAINT "Reservation_userId_User_id_fk" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Reservation" ADD CONSTRAINT "Reservation_homestayId_Homestay_id_fk" FOREIGN KEY ("homestayId") REFERENCES "Homestay"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Room" ADD CONSTRAINT "Room_homestayId_Homestay_id_fk" FOREIGN KEY ("homestayId") REFERENCES "Homestay"("id") ON DELETE restrict ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "RoomFeatures" ADD CONSTRAINT "RoomFeatures_roomId_Room_id_fk" FOREIGN KEY ("roomId") REFERENCES "Room"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "RoomFeatures" ADD CONSTRAINT "RoomFeatures_featureId_Feature_id_fk" FOREIGN KEY ("featureId") REFERENCES "Feature"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "RoomGallery" ADD CONSTRAINT "RoomGallery_roomId_Room_id_fk" FOREIGN KEY ("roomId") REFERENCES "Room"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "RoomReserved" ADD CONSTRAINT "RoomReserved_guestId_Guest_id_fk" FOREIGN KEY ("guestId") REFERENCES "Guest"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "RoomReserved" ADD CONSTRAINT "RoomReserved_roomId_Room_id_fk" FOREIGN KEY ("roomId") REFERENCES "Room"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "RoomReserved" ADD CONSTRAINT "RoomReserved_foodPlanId_FoodPlan_id_fk" FOREIGN KEY ("foodPlanId") REFERENCES "FoodPlan"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

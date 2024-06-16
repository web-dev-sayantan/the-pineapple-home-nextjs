CREATE TABLE `Admin` (
	`id` text PRIMARY KEY NOT NULL,
	`email` text NOT NULL,
	`mobile` text NOT NULL,
	`createdAt` integer DEFAULT (CURRENT_TIMESTAMP) NOT NULL,
	`updatedAt` integer NOT NULL,
	`firstname` text NOT NULL,
	`lastname` text NOT NULL,
	`sex` text,
	`dob` integer NOT NULL,
	`nationality` text,
	`address` text
);
--> statement-breakpoint
CREATE TABLE `AdminPassword` (
	`hash` text NOT NULL,
	`adminId` text NOT NULL,
	FOREIGN KEY (`adminId`) REFERENCES `Admin`(`id`) ON UPDATE cascade ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `Amenity` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`description` text
);
--> statement-breakpoint
CREATE TABLE `Category` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`description` text NOT NULL,
	`roomId` text,
	FOREIGN KEY (`roomId`) REFERENCES `Room`(`id`) ON UPDATE cascade ON DELETE set null
);
--> statement-breakpoint
CREATE TABLE `Feature` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`description` text
);
--> statement-breakpoint
CREATE TABLE `FoodPlan` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`tariff` numeric NOT NULL,
	`nonVeg` integer
);
--> statement-breakpoint
CREATE TABLE `Guest` (
	`id` text PRIMARY KEY NOT NULL,
	`firstname` text NOT NULL,
	`lastName` text NOT NULL,
	`mobile` text,
	`email` text
);
--> statement-breakpoint
CREATE TABLE `Homestay` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`address` text NOT NULL,
	`locationName` text NOT NULL,
	FOREIGN KEY (`locationName`) REFERENCES `Location`(`name`) ON UPDATE cascade ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `HomestayAmenities` (
	`homestayId` text NOT NULL,
	`amenityId` text NOT NULL,
	FOREIGN KEY (`homestayId`) REFERENCES `Homestay`(`id`) ON UPDATE cascade ON DELETE cascade,
	FOREIGN KEY (`amenityId`) REFERENCES `Amenity`(`id`) ON UPDATE cascade ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `HomestayGallery` (
	`url` text PRIMARY KEY NOT NULL,
	`category` text NOT NULL,
	`description` text,
	`isPrimary` integer DEFAULT false NOT NULL,
	`homestayId` text NOT NULL,
	FOREIGN KEY (`homestayId`) REFERENCES `Homestay`(`id`) ON UPDATE cascade ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `Invoice` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`guestName` text NOT NULL,
	`invoiceDate` integer NOT NULL,
	`checkinDate` integer NOT NULL,
	`checkoutDate` integer NOT NULL,
	`isDeleted` integer DEFAULT false NOT NULL,
	`advanceAmount` integer DEFAULT 0,
	`homestayId` text NOT NULL,
	FOREIGN KEY (`homestayId`) REFERENCES `Homestay`(`id`) ON UPDATE cascade ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `InvoiceAccomodation` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`quantity` integer NOT NULL,
	`rate` integer NOT NULL,
	`invoiceId` integer NOT NULL,
	FOREIGN KEY (`invoiceId`) REFERENCES `Invoice`(`id`) ON UPDATE cascade ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `InvoiceAmenities` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`quantity` integer NOT NULL,
	`rate` integer NOT NULL,
	`deleted` integer DEFAULT false,
	`invoiceId` integer NOT NULL,
	FOREIGN KEY (`invoiceId`) REFERENCES `Invoice`(`id`) ON UPDATE cascade ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `InvoiceFood` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`type` text NOT NULL,
	`name` text NOT NULL,
	`quantity` integer NOT NULL,
	`rate` integer NOT NULL,
	`deleted` integer DEFAULT false,
	`invoiceId` integer NOT NULL,
	FOREIGN KEY (`invoiceId`) REFERENCES `Invoice`(`id`) ON UPDATE cascade ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `Location` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`lat` real NOT NULL,
	`long` real NOT NULL,
	`state` text NOT NULL,
	`altitude` integer NOT NULL,
	`description` text NOT NULL,
	`coverUrl` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `Password` (
	`hash` text NOT NULL,
	`userId` text NOT NULL,
	FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON UPDATE cascade ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `Rate` (
	`id` text PRIMARY KEY NOT NULL,
	`type` text DEFAULT 'B2B' NOT NULL,
	`headCount` integer NOT NULL,
	`tariff` integer NOT NULL,
	`refundable` integer NOT NULL,
	`roomId` text NOT NULL,
	FOREIGN KEY (`roomId`) REFERENCES `Room`(`id`) ON UPDATE cascade ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `Reservation` (
	`id` text PRIMARY KEY NOT NULL,
	`createdAt` integer NOT NULL,
	`modifiedAt` integer NOT NULL,
	`dateIn` integer NOT NULL,
	`dateOut` integer NOT NULL,
	`totalAmount` numeric NOT NULL,
	`dueAmount` numeric NOT NULL,
	`userId` text NOT NULL,
	`homestayId` text NOT NULL,
	FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON UPDATE cascade ON DELETE cascade,
	FOREIGN KEY (`homestayId`) REFERENCES `Homestay`(`id`) ON UPDATE cascade ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `Room` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`toiletAttached` integer NOT NULL,
	`airConditioned` integer NOT NULL,
	`kitchenAttached` integer NOT NULL,
	`isDorm` integer NOT NULL,
	`description` text NOT NULL,
	`occupancy` integer NOT NULL,
	`houseRecommendation` integer DEFAULT false NOT NULL,
	`homestayId` text NOT NULL,
	FOREIGN KEY (`homestayId`) REFERENCES `Homestay`(`id`) ON UPDATE cascade ON DELETE restrict
);
--> statement-breakpoint
CREATE TABLE `RoomFeatures` (
	`roomId` text NOT NULL,
	`featureId` text NOT NULL,
	FOREIGN KEY (`roomId`) REFERENCES `Room`(`id`) ON UPDATE cascade ON DELETE cascade,
	FOREIGN KEY (`featureId`) REFERENCES `Feature`(`id`) ON UPDATE cascade ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `RoomGallery` (
	`url` text PRIMARY KEY NOT NULL,
	`category` text NOT NULL,
	`description` text,
	`isPrimary` integer DEFAULT false NOT NULL,
	`roomId` text NOT NULL,
	FOREIGN KEY (`roomId`) REFERENCES `Room`(`id`) ON UPDATE cascade ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `RoomReserved` (
	`id` text PRIMARY KEY NOT NULL,
	`pax` integer NOT NULL,
	`amount` numeric NOT NULL,
	`status` text NOT NULL,
	`guestId` text NOT NULL,
	`roomId` text NOT NULL,
	`foodPlanId` text NOT NULL,
	FOREIGN KEY (`guestId`) REFERENCES `Guest`(`id`) ON UPDATE cascade ON DELETE cascade,
	FOREIGN KEY (`roomId`) REFERENCES `Room`(`id`) ON UPDATE cascade ON DELETE cascade,
	FOREIGN KEY (`foodPlanId`) REFERENCES `FoodPlan`(`id`) ON UPDATE cascade ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `User` (
	`id` text PRIMARY KEY NOT NULL,
	`email` text NOT NULL,
	`mobile` text NOT NULL,
	`createdAt` integer DEFAULT (CURRENT_TIMESTAMP) NOT NULL,
	`updatedAt` integer NOT NULL,
	`firstname` text NOT NULL,
	`lastname` text NOT NULL,
	`sex` text NOT NULL,
	`dob` integer NOT NULL,
	`nationality` text NOT NULL,
	`address` text
);
--> statement-breakpoint
CREATE UNIQUE INDEX `Admin_email_key` ON `Admin` (`email`);--> statement-breakpoint
CREATE UNIQUE INDEX `Admin_mobile_key` ON `Admin` (`mobile`);--> statement-breakpoint
CREATE UNIQUE INDEX `AdminPassword_adminId_key` ON `AdminPassword` (`adminId`);--> statement-breakpoint
CREATE UNIQUE INDEX `Amenity_name_key` ON `Amenity` (`name`);--> statement-breakpoint
CREATE UNIQUE INDEX `Feature_name_key` ON `Feature` (`name`);--> statement-breakpoint
CREATE UNIQUE INDEX `FoodPlan_name_nonVeg_key` ON `FoodPlan` (`name`,`nonVeg`);--> statement-breakpoint
CREATE UNIQUE INDEX `Guest_mobile_key` ON `Guest` (`mobile`);--> statement-breakpoint
CREATE UNIQUE INDEX `Guest_email_key` ON `Guest` (`email`);--> statement-breakpoint
CREATE INDEX `Homestay_locationName_idx` ON `Homestay` (`locationName`);--> statement-breakpoint
CREATE INDEX `HomestayAmenities_homestayId_idx` ON `HomestayAmenities` (`homestayId`);--> statement-breakpoint
CREATE INDEX `HomestayAmenities_amenityId_idx` ON `HomestayAmenities` (`amenityId`);--> statement-breakpoint
CREATE UNIQUE INDEX `HomestayAmenities_homestayId_amenityId_key` ON `HomestayAmenities` (`homestayId`,`amenityId`);--> statement-breakpoint
CREATE INDEX `HomestayGallery_homestayId_idx` ON `HomestayGallery` (`homestayId`);--> statement-breakpoint
CREATE INDEX `InvoiceAccomodation_invoiceId_idx` ON `InvoiceAccomodation` (`invoiceId`);--> statement-breakpoint
CREATE INDEX `InvoiceAmenities_invoiceId_idx` ON `InvoiceAmenities` (`invoiceId`);--> statement-breakpoint
CREATE INDEX `InvoiceFood_invoiceId_idx` ON `InvoiceFood` (`invoiceId`);--> statement-breakpoint
CREATE UNIQUE INDEX `Location_name_unique` ON `Location` (`name`);--> statement-breakpoint
CREATE UNIQUE INDEX `Password_userId_key` ON `Password` (`userId`);--> statement-breakpoint
CREATE INDEX `Rate_roomId_idx` ON `Rate` (`roomId`);--> statement-breakpoint
CREATE INDEX `Reservation_userId_idx` ON `Reservation` (`userId`);--> statement-breakpoint
CREATE INDEX `Reservation_homestayId_idx` ON `Reservation` (`homestayId`);--> statement-breakpoint
CREATE INDEX `Room_homestayId_idx` ON `Room` (`homestayId`);--> statement-breakpoint
CREATE INDEX `RoomFeatures_roomId_idx` ON `RoomFeatures` (`roomId`);--> statement-breakpoint
CREATE INDEX `RoomFeatures_featureId_idx` ON `RoomFeatures` (`featureId`);--> statement-breakpoint
CREATE UNIQUE INDEX `RoomFeatures_roomId_featureId_key` ON `RoomFeatures` (`roomId`,`featureId`);--> statement-breakpoint
CREATE INDEX `RoomGallery_roomId_idx` ON `RoomGallery` (`roomId`);--> statement-breakpoint
CREATE INDEX `RoomReserved_guestId_idx` ON `RoomReserved` (`guestId`);--> statement-breakpoint
CREATE INDEX `RoomReserved_roomId_idx` ON `RoomReserved` (`roomId`);--> statement-breakpoint
CREATE INDEX `RoomReserved_foodPlanId_idx` ON `RoomReserved` (`foodPlanId`);--> statement-breakpoint
CREATE UNIQUE INDEX `User_email_key` ON `User` (`email`);--> statement-breakpoint
CREATE UNIQUE INDEX `User_mobile_key` ON `User` (`mobile`);
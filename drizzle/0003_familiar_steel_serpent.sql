CREATE TABLE `RatesToAvailability` (
	`rateId` text NOT NULL,
	`availabilityId` integer NOT NULL,
	PRIMARY KEY(`availabilityId`, `rateId`),
	FOREIGN KEY (`rateId`) REFERENCES `Rate`(`id`) ON UPDATE cascade ON DELETE cascade,
	FOREIGN KEY (`availabilityId`) REFERENCES `Availability`(`id`) ON UPDATE cascade ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `RoomsToAvailability` (
	`roomId` text NOT NULL,
	`availabilityId` integer NOT NULL,
	PRIMARY KEY(`availabilityId`, `roomId`),
	FOREIGN KEY (`roomId`) REFERENCES `Room`(`id`) ON UPDATE cascade ON DELETE cascade,
	FOREIGN KEY (`availabilityId`) REFERENCES `Availability`(`id`) ON UPDATE cascade ON DELETE cascade
);

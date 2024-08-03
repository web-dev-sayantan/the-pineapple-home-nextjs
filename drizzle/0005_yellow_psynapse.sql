CREATE TABLE `RatesToAvailability` (
	`rateId` text NOT NULL,
	`availabilityId` integer NOT NULL,
	PRIMARY KEY(`availabilityId`, `rateId`),
	FOREIGN KEY (`rateId`) REFERENCES `Rate`(`id`) ON UPDATE cascade ON DELETE cascade,
	FOREIGN KEY (`availabilityId`) REFERENCES `Availability`(`id`) ON UPDATE cascade ON DELETE cascade
);
--> statement-breakpoint
DROP TABLE `RoomsToAvailability`;--> statement-breakpoint
/*
 SQLite does not support "Dropping foreign key" out of the box, we do not generate automatic migration for that, so it has to be done manually
 Please refer to: https://www.techonthenet.com/sqlite/tables/alter_table.php
                  https://www.sqlite.org/lang_altertable.html

 Due to that we don't generate migration automatically and it has to be done manually
*/--> statement-breakpoint
DROP INDEX IF EXISTS `Availability_roomId_idx`;--> statement-breakpoint
DROP INDEX IF EXISTS `Availability_stayDate_roomId_key`;--> statement-breakpoint
CREATE UNIQUE INDEX `Availability_stayDate_roomId_key` ON `Availability` (`stayDate`,`rateId`);--> statement-breakpoint
ALTER TABLE `Availability` DROP COLUMN `roomId`;
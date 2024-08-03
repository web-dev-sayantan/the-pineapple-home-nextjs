DROP INDEX IF EXISTS `Availability_stayDate_roomId_key`;--> statement-breakpoint
ALTER TABLE `Availability` ADD `rate` integer DEFAULT 999 NOT NULL;--> statement-breakpoint
ALTER TABLE `Availability` ADD `rateId` text NOT NULL REFERENCES Rate(id);--> statement-breakpoint
CREATE INDEX `Availability_rateId_idx` ON `Availability` (`rateId`);--> statement-breakpoint
CREATE UNIQUE INDEX `Availability_stayDate_roomId_key` ON `Availability` (`stayDate`,`roomId`,`rateId`);--> statement-breakpoint
/*
 SQLite does not support "Creating foreign key on existing column" out of the box, we do not generate automatic migration for that, so it has to be done manually
 Please refer to: https://www.techonthenet.com/sqlite/tables/alter_table.php
                  https://www.sqlite.org/lang_altertable.html

 Due to that we don't generate migration automatically and it has to be done manually
*/
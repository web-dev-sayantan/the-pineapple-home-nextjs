CREATE TABLE IF NOT EXISTS "Invoice" (
	"id" serial PRIMARY KEY NOT NULL,
	"guestName" text NOT NULL,
	"invoiceDate" timestamp NOT NULL,
	"checkinDate" timestamp NOT NULL,
	"checkoutDate" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "InvoiceAccomodation" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"quantity" integer NOT NULL,
	"rate" integer NOT NULL,
	"invoiceId" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "InvoiceAmenities" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"quantity" integer NOT NULL,
	"rate" integer NOT NULL,
	"invoiceId" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "InvoiceFood" (
	"id" serial PRIMARY KEY NOT NULL,
	"type" text NOT NULL,
	"name" text NOT NULL,
	"quantity" integer NOT NULL,
	"rate" integer NOT NULL,
	"invoiceId" text NOT NULL
);
--> statement-breakpoint
DROP TABLE "_prisma_migrations";--> statement-breakpoint
ALTER TABLE "HomestayGallery" ADD COLUMN "isPrimary" boolean DEFAULT false NOT NULL;--> statement-breakpoint
ALTER TABLE "Rate" ADD COLUMN "type" text DEFAULT 'B2B' NOT NULL;--> statement-breakpoint
ALTER TABLE "RoomGallery" ADD COLUMN "isPrimary" boolean DEFAULT false NOT NULL;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "InvoiceAccomodation" ADD CONSTRAINT "InvoiceAccomodation_invoiceId_Invoice_id_fk" FOREIGN KEY ("invoiceId") REFERENCES "Invoice"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "InvoiceAmenities" ADD CONSTRAINT "InvoiceAmenities_invoiceId_Invoice_id_fk" FOREIGN KEY ("invoiceId") REFERENCES "Invoice"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "InvoiceFood" ADD CONSTRAINT "InvoiceFood_invoiceId_Invoice_id_fk" FOREIGN KEY ("invoiceId") REFERENCES "Invoice"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

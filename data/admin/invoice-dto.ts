import { Invoice } from "@/app/business/[homestay]/invoice/shared/shared-code";
import { db } from "@/drizzle";
import { invoice, invoiceAccomodation, invoiceFood } from "@/drizzle/schema";
import { eq } from "drizzle-orm";

export async function getAllInvoices() {
  return await db
    .select({
      id: invoice.id,
      guestName: invoice.guestName,
      invoiceDate: invoice.invoiceDate,
      checkinDate: invoice.checkinDate,
      checkoutDate: invoice.checkoutDate,
      accName: invoiceAccomodation.name,
      accQuantity: invoiceAccomodation.quantity,
      accRate: invoiceAccomodation.rate,
    })
    .from(invoice)
    .innerJoin(
      invoiceAccomodation,
      eq(invoice.id, invoiceAccomodation.invoiceId)
    );
}

export async function getInvoiceById(invoiceId: number) {
  return await db
    .select({
      id: invoice.id,
      guestName: invoice.guestName,
      invoiceDate: invoice.invoiceDate,
      checkinDate: invoice.checkinDate,
      checkoutDate: invoice.checkoutDate,
      accName: invoiceAccomodation.name,
      accQuantity: invoiceAccomodation.quantity,
      accRate: invoiceAccomodation.rate,
    })
    .from(invoice)
    .innerJoin(
      invoiceAccomodation,
      eq(invoice.id, invoiceAccomodation.invoiceId)
    )
    .where(eq(invoice.id, invoiceId));
}

export async function createInvoice(invoiceData: Invoice) {
  const newInvoice = await db
    .insert(invoice)
    .values({
      guestName: invoiceData.guestName,
      invoiceDate: invoiceData.invoiceDate,
      checkinDate: invoiceData.checkinDate,
      checkoutDate: invoiceData.checkoutDate,
    })
    .returning();

  for (const item of invoiceData.accomodation) {
    await db
      .insert(invoiceAccomodation)
      .values({
        name: item.name,
        quantity: item.quantity,
        rate: item.rate,
        invoiceId: newInvoice[0].id,
      })
      .returning();
  }

  for (const item of invoiceData.food.breakfast) {
    await db
      .insert(invoiceFood)
      .values({
        type: "breakfast",
        name: item.name,
        quantity: item.quantity,
        rate: item.rate,
        invoiceId: newInvoice[0].id,
      })
      .returning();
  }

  for (const item of invoiceData.food.lunch) {
    await db
      .insert(invoiceFood)
      .values({
        type: "lunch",
        name: item.name,
        quantity: item.quantity,
        rate: item.rate,
        invoiceId: newInvoice[0].id,
      })
      .returning();
  }

  for (const item of invoiceData.food.snacks) {
    await db
      .insert(invoiceFood)
      .values({
        type: "snacks",
        name: item.name,
        quantity: item.quantity,
        rate: item.rate,
        invoiceId: newInvoice[0].id,
      })
      .returning();
  }

  for (const item of invoiceData.food.dinner) {
    await db
      .insert(invoiceFood)
      .values({
        type: "dinner",
        name: item.name,
        quantity: item.quantity,
        rate: item.rate,
        invoiceId: newInvoice[0].id,
      })
      .returning();
  }

  for (const item of invoiceData.amenities) {
    await db
      .insert(invoiceAccomodation)
      .values({
        name: item.name,
        quantity: item.quantity,
        rate: item.rate,
        invoiceId: newInvoice[0].id,
      })
      .returning();
  }
}

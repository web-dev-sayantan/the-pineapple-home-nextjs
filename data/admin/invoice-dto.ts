import { Invoice } from "@/app/business/[homestay]/invoice/shared/shared-code";
import { db } from "@/drizzle";
import {
  FoodTypesEnum,
  invoice,
  invoiceAccomodation,
  invoiceAmenities,
  invoiceFood,
} from "@/drizzle/schema";
import { and, eq } from "drizzle-orm";

export async function getAllInvoices(homestayId: string) {
  return await db.query.invoice.findMany({
    where: and(
      eq(invoice.homestayId, homestayId),
      eq(invoice.isDeleted, false)
    ),
  });
}

export async function getInvoiceById(invoiceId: number, homestayId: string) {
  try {
    return await db.query.invoice.findFirst({
      where: and(eq(invoice.id, invoiceId), eq(invoice.homestayId, homestayId)),
      with: {
        accomodation: {
          columns: {
            id: true,
            name: true,
            quantity: true,
            rate: true,
          },
        },
        food: {
          columns: {
            id: true,
            type: true,
            name: true,
            quantity: true,
            rate: true,
          },
        },
        amenities: {
          columns: {
            id: true,
            name: true,
            quantity: true,
            rate: true,
          },
        },
      },
    });
    // if (invoiceData) {
    //   const [food, amenities] = await Promise.all([
    //     // db.query.invoiceAccomodation.findMany({
    //     //   where: eq(invoiceAccomodation.invoiceId, invoiceData.id),
    //     //   columns: {
    //     //     id: true,
    //     //     name: true,
    //     //     quantity: true,
    //     //     rate: true,
    //     //   },
    //     // }),
    //     db.query.invoiceFood.findMany({
    //       where: eq(invoiceFood.invoiceId, invoiceData.id),
    //       columns: {
    //         id: true,
    //         type: true,
    //         name: true,
    //         quantity: true,
    //         rate: true,
    //       },
    //     }),
    //     db.query.invoiceAmenities.findMany({
    //       where: eq(invoiceAmenities.invoiceId, invoiceData.id),
    //       columns: {
    //         id: true,
    //         name: true,
    //         quantity: true,
    //         rate: true,
    //       },
    //     }),
    //   ]);
    //   return {
    //     ...invoiceData,
    //     food,
    //     amenities,
    //   };
    // }
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function createInvoice(invoiceData: Invoice, homestayId: string) {
  const newInvoice = await db
    .insert(invoice)
    .values({
      guestName: invoiceData.guestName,
      invoiceDate: invoiceData.invoiceDate,
      checkinDate: invoiceData.checkinDate,
      checkoutDate: invoiceData.checkoutDate,
      homestayId,
      isDeleted: false,
    })
    .returning();

  for (const item of invoiceData.accomodation) {
    await db
      .insert(invoiceAccomodation)
      .values({
        name: item.name,
        quantity: +item.quantity,
        rate: +item.rate,
        invoiceId: +newInvoice[0].id,
      })
      .returning();
  }

  for (const item of invoiceData.food.breakfast) {
    await db
      .insert(invoiceFood)
      .values({
        type: FoodTypesEnum.enumValues[0],
        name: item.name,
        quantity: +item.quantity,
        rate: +item.rate,
        invoiceId: +newInvoice[0].id,
      })
      .returning();
  }

  for (const item of invoiceData.food.lunch) {
    await db
      .insert(invoiceFood)
      .values({
        type: FoodTypesEnum.enumValues[1],
        name: item.name,
        quantity: +item.quantity,
        rate: +item.rate,
        invoiceId: +newInvoice[0].id,
      })
      .returning();
  }

  for (const item of invoiceData.food.snacks) {
    await db
      .insert(invoiceFood)
      .values({
        type: FoodTypesEnum.enumValues[3],
        name: item.name,
        quantity: +item.quantity,
        rate: +item.rate,
        invoiceId: +newInvoice[0].id,
      })
      .returning();
  }

  for (const item of invoiceData.food.dinner) {
    await db
      .insert(invoiceFood)
      .values({
        type: FoodTypesEnum.enumValues[2],
        name: item.name,
        quantity: +item.quantity,
        rate: +item.rate,
        invoiceId: +newInvoice[0].id,
      })
      .returning();
  }

  for (const item of invoiceData.amenities) {
    await db
      .insert(invoiceAmenities)
      .values({
        name: item.name,
        quantity: +item.quantity,
        rate: +item.rate,
        invoiceId: +newInvoice[0].id,
      })
      .returning();
  }

  return newInvoice;
}

import {
  Invoice,
  Item,
} from "@/app/business/[homestay]/invoices/shared/shared-code";
import { db } from "@/drizzle";
import {
  FoodTypesEnum,
  invoice,
  invoiceAccomodation,
  invoiceAmenities,
  invoiceFood,
} from "@/drizzle/schema";
import { and, eq } from "drizzle-orm";

export const getAllInvoices = async (homestayId: string) => {
  return await db.query.invoice.findMany({
    where: and(
      eq(invoice.homestayId, homestayId),
      eq(invoice.isDeleted, false)
    ),
  });
};
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
  await Promise.all([
    ...invoiceData.accomodation.map(async (item) => {
      return await db
        .insert(invoiceAccomodation)
        .values({
          name: item.name,
          quantity: +item.quantity,
          rate: +item.rate,
          invoiceId: +newInvoice[0].id,
        })
        .returning();
    }),
    ...invoiceData.food.breakfast.map(async (item) => {
      return await db
        .insert(invoiceFood)
        .values({
          type: FoodTypesEnum.enumValues[0],
          name: item.name,
          quantity: +item.quantity,
          rate: +item.rate,
          invoiceId: +newInvoice[0].id,
        })
        .returning();
    }),
    ...invoiceData.food.lunch.map(async (item) => {
      return await db
        .insert(invoiceFood)
        .values({
          type: FoodTypesEnum.enumValues[1],
          name: item.name,
          quantity: +item.quantity,
          rate: +item.rate,
          invoiceId: +newInvoice[0].id,
        })
        .returning();
    }),
    ...invoiceData.food.dinner.map(async (item) => {
      return await db
        .insert(invoiceFood)
        .values({
          type: FoodTypesEnum.enumValues[2],
          name: item.name,
          quantity: +item.quantity,
          rate: +item.rate,
          invoiceId: +newInvoice[0].id,
        })
        .returning();
    }),
    ...invoiceData.food.snacks.map(async (item) => {
      return await db
        .insert(invoiceFood)
        .values({
          type: FoodTypesEnum.enumValues[3],
          name: item.name,
          quantity: +item.quantity,
          rate: +item.rate,
          invoiceId: +newInvoice[0].id,
        })
        .returning();
    }),
    ...invoiceData.amenities.map(async (item) => {
      return await db
        .insert(invoiceAmenities)
        .values({
          name: item.name,
          quantity: +item.quantity,
          rate: +item.rate,
          invoiceId: +newInvoice[0].id,
        })
        .returning();
    }),
  ]);
  return newInvoice;
}

export async function updateInvoice(invoiceData: Invoice) {
  if (!invoiceData.id) {
    return;
  }
  const updatedInvoice = await db
    .update(invoice)
    .set({
      id: invoiceData.id,
      guestName: invoiceData.guestName,
      invoiceDate: invoiceData.invoiceDate,
      checkinDate: invoiceData.checkinDate,
      checkoutDate: invoiceData.checkoutDate,
      homestayId: invoiceData.homestayId,
      isDeleted: false,
    })
    .where(eq(invoice.id, invoiceData.id))
    .returning();

  function updateItem(
    table:
      | typeof invoiceAccomodation
      | typeof invoiceFood
      | typeof invoiceAmenities
  ) {
    return async (item: Item) => {
      if (invoiceData.id) {
        if (item.id) {
          return await db
            .update(table)
            .set({
              id: item.id,
              name: item.name,
              quantity: +item.quantity,
              rate: +item.rate,
            })
            .where(
              and(eq(table.invoiceId, invoiceData.id), eq(table.id, item.id))
            )
            .returning();
          // biome-ignore lint/style/noUselessElse: <explanation>
        } else {
          return await db
            .insert(table)
            .values({
              name: item.name,
              quantity: +item.quantity,
              rate: +item.rate,
              invoiceId: +invoiceData.id,
            })
            .returning();
        }
      }
    };
  }

  function updateFoodItem(
    table: typeof invoiceFood,
    type: (typeof FoodTypesEnum.enumValues)[number]
  ) {
    return async (item: Item) => {
      if (invoiceData.id) {
        if (item.id) {
          return await db
            .update(table)
            .set({
              id: item.id,
              type,
              name: item.name,
              quantity: +item.quantity,
              rate: +item.rate,
            })
            .where(
              and(eq(table.invoiceId, invoiceData.id), eq(table.id, item.id))
            )
            .returning();
          // biome-ignore lint/style/noUselessElse: <explanation>
        } else {
          return await db
            .insert(table)
            .values({
              type,
              name: item.name,
              quantity: +item.quantity,
              rate: +item.rate,
              invoiceId: +invoiceData.id,
            })
            .returning();
        }
      }
    };
  }

  await Promise.all([
    ...invoiceData.accomodation.map(updateItem(invoiceAccomodation)),
    ...invoiceData.amenities.map(updateItem(invoiceAmenities)),
    ...invoiceData.food.breakfast.map(
      updateFoodItem(invoiceFood, FoodTypesEnum.enumValues[0])
    ),
    ...invoiceData.food.lunch.map(
      updateFoodItem(invoiceFood, FoodTypesEnum.enumValues[1])
    ),
    ...invoiceData.food.snacks.map(
      updateFoodItem(invoiceFood, FoodTypesEnum.enumValues[3])
    ),
    ...invoiceData.food.dinner.map(
      updateFoodItem(invoiceFood, FoodTypesEnum.enumValues[2])
    ),
  ]);

  return updatedInvoice;
}

export async function deleteInvoice(invoiceId: number) {
  return await db
    .update(invoice)
    .set({ isDeleted: true })
    .where(eq(invoice.id, invoiceId))
    .returning();
}

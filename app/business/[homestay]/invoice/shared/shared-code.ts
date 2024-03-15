import { z } from "zod";

export type Invoice = {
  guestName: string;
  invoiceDate: Date;
  checkinDate: Date;
  checkoutDate: Date;
  accomodation: Item[];
  food: Food;
  amenities: Item[];
};

export type Food = {
  breakfast: Item[];
  lunch: Item[];
  snacks: Item[];
  dinner: Item[];
};

export type Item = {
  name: string;
  quantity: number;
  rate: number;
};

export const invoiceSchema = z.object({
  guestName: z.string().trim().min(1, "Guest name is required"),
  invoiceDate: z.date(),
  checkinDate: z.date(),
  checkoutDate: z.date(),
  accomodation: z.array(
    z.object({
      name: z.string(),
      quantity: z.number(),
      rate: z.number(),
    })
  ),
  food: z.object({
    breakfast: z.array(
      z.object({
        name: z.string(),
        quantity: z.number(),
        rate: z.number(),
      })
    ),
    lunch: z.array(
      z.object({
        name: z.string(),
        quantity: z.number(),
        rate: z.number(),
      })
    ),
    snacks: z.array(
      z.object({
        name: z.string(),
        quantity: z.number(),
        rate: z.number(),
      })
    ),
    dinner: z.array(
      z.object({
        name: z.string(),
        quantity: z.number(),
        rate: z.number(),
      })
    ),
  }),
  amenities: z.array(
    z.object({
      name: z.string(),
      quantity: z.number(),
      rate: z.number(),
    })
  ),
});

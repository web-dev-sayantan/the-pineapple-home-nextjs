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

const itemSchema = z.object({
  name: z.string(),
  quantity: z.coerce.number(),
  rate: z.coerce.number(),
});

export const invoiceSchema = z.object({
  guestName: z.string().trim().min(1, "Guest name is required"),
  invoiceDate: z.date(),
  checkinDate: z.date(),
  checkoutDate: z.date(),
  accomodation: z.array(itemSchema),
  food: z.object({
    breakfast: z.array(itemSchema),
    lunch: z.array(itemSchema),
    snacks: z.array(itemSchema),
    dinner: z.array(itemSchema),
  }),
  amenities: z.array(itemSchema),
});

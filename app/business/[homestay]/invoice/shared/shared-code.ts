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
  name: z.string().min(1, "Item name is required"),
  quantity: z.coerce.number().min(0, "Quantity cannot be negative"),
  rate: z.coerce.number().min(1, "Rate cannot be negative"),
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

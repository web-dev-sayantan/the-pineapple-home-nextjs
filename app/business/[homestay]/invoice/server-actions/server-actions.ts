"use server";

import { z } from "zod";
import { Invoice, invoiceSchema } from "../shared/shared-code";
import { createInvoice, updateInvoice } from "@/data/admin/invoice-dto";
export type InvoiceFormState = {
  success: boolean;
  error?: z.ZodError<z.infer<typeof invoiceSchema>>;
  message?: string;
  fields?: Record<string, string>;
  issues?: string[];
};
export async function generateInvoice(
  action: "create" | "update",
  prevState: InvoiceFormState,
  data: FormData
): Promise<InvoiceFormState> {
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  const rawFormData = Object.fromEntries(data) as any;
  if (action === "update") {
    rawFormData.id = +rawFormData.id;
  }
  rawFormData.invoiceDate = new Date(rawFormData.invoiceDate as string);
  rawFormData.checkinDate = new Date(rawFormData.checkinDate as string);
  rawFormData.checkoutDate = new Date(rawFormData.checkoutDate as string);
  rawFormData.accomodation = JSON.parse(rawFormData.accomodation as string);
  rawFormData.food = JSON.parse(rawFormData.food as string);
  rawFormData.amenities = JSON.parse(rawFormData.amenities as string);
  const parsedFormData = await invoiceSchema.safeParseAsync(rawFormData, {
    async: true,
  });
  if (!parsedFormData.success) {
    const fields: Record<string, string> = {};
    for (const key of Object.keys(rawFormData)) {
      fields[key] = rawFormData[key].toString();
    }
    return {
      success: false,
      message: "Invalid form data",
      fields,
      issues: parsedFormData.error?.issues.map((issue) => {
        return issue.message;
      }),
    };
  }
  parsedFormData.data.homestayId = rawFormData.homestayId;
  if (action === "update") {
    parsedFormData.data.accomodation = parsedFormData.data.accomodation.map(
      (acc, index) => ({
        ...acc,
        id: rawFormData.accomodation[index].id,
      })
    );
    parsedFormData.data.food.breakfast = parsedFormData.data.food.breakfast.map(
      (food, index) => ({
        ...food,
        id: rawFormData.food.breakfast[index].id,
      })
    );
    parsedFormData.data.food.lunch = parsedFormData.data.food.lunch.map(
      (food, index) => ({
        ...food,
        id: rawFormData.food.lunch[index].id,
      })
    );
    parsedFormData.data.food.snacks = parsedFormData.data.food.snacks.map(
      (food, index) => ({
        ...food,
        id: rawFormData.food.snacks[index].id,
      })
    );
    parsedFormData.data.food.dinner = parsedFormData.data.food.dinner.map(
      (food, index) => ({
        ...food,
        id: rawFormData.food.dinner[index].id,
      })
    );
    parsedFormData.data.amenities = parsedFormData.data.amenities.map(
      (amenity, index) => ({
        ...amenity,
        id: rawFormData.amenities[index].id,
      })
    );
  }
  const result =
    action === "create"
      ? await createInvoice(parsedFormData.data, rawFormData.homestayId)
      : await updateInvoice(parsedFormData.data);
  return {
    fields: {
      id: result ? result[0].id.toString() : "",
    },
    success: true,
    message: "Invoice generated successfully",
  };
}

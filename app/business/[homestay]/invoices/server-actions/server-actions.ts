"use server";

import { z } from "zod";
import { Invoice, invoiceSchema } from "../shared/shared-code";
import {
  createInvoice,
  deleteInvoice,
  updateInvoice,
} from "@/data/admin/invoice-dto";
import { revalidatePath } from "next/cache";
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
  rawFormData.stayDuration = {
    from: new Date(rawFormData.checkinDate as string),
    to: new Date(rawFormData.checkoutDate as string),
  };
  rawFormData.checkoutDate = new Date(rawFormData.checkoutDate as string);
  rawFormData.advanceAmount = +rawFormData.advanceAmount;
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
  revalidatePath(`/business/${rawFormData.homestayId}/invoices`);
  return {
    fields: {
      id: result ? result[0].id.toString() : "",
    },
    success: true,
    message: `Invoice ${result ? result[0].id.toString() : ""} ${
      action === "create" ? "generated" : "updated"
    } successfully`,
  };
}

export async function deleteInvoiceAction(invoiceId: number) {
  const deleted = await deleteInvoice(invoiceId);
  if (deleted.length) {
    revalidatePath(`/business/${deleted[0].homestayId}/invoices`);
  }
  return deleted.length > 0 ? deleted[0].id : null;
}

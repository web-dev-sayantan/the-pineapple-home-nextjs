"use server";

import { z } from "zod";
import { Invoice, invoiceSchema } from "../shared/shared-code";
import { createInvoice } from "@/data/admin/invoice-dto";
export type InvoiceFormState = {
  success: boolean;
  error?: z.ZodError<z.infer<typeof invoiceSchema>>;
  message?: string;
  fields?: Record<string, string>;
  issues?: string[];
};
export async function generateInvoice(
  prevState: InvoiceFormState,
  data: FormData
): Promise<InvoiceFormState> {
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  const rawFormData = Object.fromEntries(data) as any;
  rawFormData.invoiceDate = new Date(rawFormData.invoiceDate as string);
  rawFormData.checkinDate = new Date(rawFormData.checkinDate as string);
  rawFormData.checkoutDate = new Date(rawFormData.checkoutDate as string);
  rawFormData.accomodation = JSON.parse(rawFormData.accomodation as string);
  rawFormData.food = JSON.parse(rawFormData.food as string);
  rawFormData.amenities = JSON.parse(rawFormData.amenities as string);
  const parsedFormData = await invoiceSchema.safeParseAsync(rawFormData, {
    async: true,
  });
  console.log("parsedFormData", parsedFormData);
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
        console.log(issue.path);
        return issue.message;
      }),
    };
  }
  const result = await createInvoice(parsedFormData.data);
  return {
    fields: {
      id: result[0].id.toString(),
    },
    success: true,
    message: "Invoice generated successfully",
  };
}

import { db } from "@/drizzle";
import { eq } from "drizzle-orm";
import { homestay } from "../drizzle/schema";

export async function getHomestayById(homestayId: string) {
  return await db.query.homestay.findFirst({
    where: eq(homestay.id, homestayId),
  });
}

export async function getAllHomestaysByLocation(locationName: string) {
  return await db.query.homestay.findMany({
    where: eq(homestay.locationName, locationName),
    columns: {
      id: true,
      name: true,
    },
    with: {
      homestayGallery: {
        columns: {
          url: true,
          category: true,
        },
      },
    },
  });
}

export async function getAllHomestays() {
  return await db.query.homestay.findMany({
    columns: {
      id: true,
      name: true,
    },
    with: {
      homestayGallery: {
        columns: {
          url: true,
          category: true,
        },
      },
    },
  });
}

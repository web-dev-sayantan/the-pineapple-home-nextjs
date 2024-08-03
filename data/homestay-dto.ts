import "server-only";
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

export async function getHomestayWithRoomDataById(id: string) {
  if (typeof id !== "string" || id.trim() === "") {
    throw new Error("Invalid id parameter");
  }
  const homestayData = await db.query.homestay.findFirst({
    where: eq(homestay.id, id),
    columns: {
      name: true,
    },
    with: {
      location: {
        columns: {
          name: true,
          state: true,
          lat: true,
          long: true,
        },
      },
      rooms: {
        with: {
          rates: {
            columns: {
              id: true,
              type: true,
              tariff: true,
              headCount: true,
              refundable: true,
              name: true,
              description: true,
            },
          },
          roomGallery: {
            columns: {
              url: true,
              category: true,
              description: true,
              isPrimary: true,
            },
          },
        },
      },
      homestayGallery: {
        columns: {
          url: true,
          category: true,
        },
      },
    },
  });
  if (!homestayData) {
    throw new Error(`Homestay with id ${id} not found`);
  }

  return homestayData;
}

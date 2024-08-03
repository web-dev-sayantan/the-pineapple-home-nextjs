import "server-only";
import { db } from "@/drizzle";
import { foodPlan } from "@/drizzle/schema";
import { eq } from "drizzle-orm";

export async function getFoodPlans(homestayId: string) {
	return await db
		.select({
			id: foodPlan.id,
			name: foodPlan.name,
			title: foodPlan.title,
			tariff: foodPlan.tariff,
			nonVeg: foodPlan.nonVeg,
			homestayId: foodPlan.homestayId,
		})
		.from(foodPlan)
		.where(eq(foodPlan.homestayId, homestayId))
		.orderBy(foodPlan.tariff);
}

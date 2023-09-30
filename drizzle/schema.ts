import {
  pgTable,
  text,
  doublePrecision,
  integer,
  uniqueIndex,
  timestamp,
  foreignKey,
  index,
  numeric,
  boolean,
  varchar,
} from "drizzle-orm/pg-core";

import { InferSelectModel, relations } from "drizzle-orm";

export const location = pgTable("Location", {
  id: text("id").primaryKey().notNull(),
  name: text("name").notNull(),
  lat: doublePrecision("lat").notNull(),
  long: doublePrecision("long").notNull(),
  state: text("state").notNull(),
  altitude: integer("altitude").notNull(),
  description: text("description").notNull(),
  coverUrl: text("coverUrl").notNull(),
});

export type Location = typeof location.$inferSelect;
export type NewLocation = typeof location.$inferInsert;

export const admin = pgTable(
  "Admin",
  {
    id: text("id").primaryKey().notNull(),
    email: text("email").notNull(),
    mobile: text("mobile").notNull(),
    createdAt: timestamp("createdAt", { precision: 3, mode: "string" })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp("updatedAt", {
      precision: 3,
      mode: "string",
    }).notNull(),
    firstname: text("firstname").notNull(),
    lastname: text("lastname").notNull(),
    sex: text("sex"),
    dob: timestamp("dob", { precision: 3, mode: "string" }).notNull(),
    nationality: text("nationality"),
    address: text("address"),
  },
  (table) => {
    return {
      emailKey: uniqueIndex("Admin_email_key").on(table.email),
      mobileKey: uniqueIndex("Admin_mobile_key").on(table.mobile),
    };
  }
);

export const adminPassword = pgTable(
  "AdminPassword",
  {
    hash: text("hash").notNull(),
    adminId: text("adminId")
      .notNull()
      .references(() => admin.id, { onDelete: "cascade", onUpdate: "cascade" }),
  },
  (table) => {
    return {
      adminIdKey: uniqueIndex("AdminPassword_adminId_key").on(table.adminId),
    };
  }
);

export const homestay = pgTable(
  "Homestay",
  {
    id: text("id").primaryKey().notNull(),
    name: text("name").notNull(),
    address: text("address").notNull(),
    locationName: text("locationName")
      .notNull()
      .references(() => location.name, {
        onDelete: "cascade",
        onUpdate: "cascade",
      }),
  },
  (table) => {
    return {
      locationNameIdx: index("Homestay_locationName_idx").on(
        table.locationName
      ),
    };
  }
);

export const guest = pgTable(
  "Guest",
  {
    id: text("id").primaryKey().notNull(),
    firstname: text("firstname").notNull(),
    lastName: text("lastName").notNull(),
    mobile: text("mobile"),
    email: text("email"),
  },
  (table) => {
    return {
      mobileKey: uniqueIndex("Guest_mobile_key").on(table.mobile),
      emailKey: uniqueIndex("Guest_email_key").on(table.email),
    };
  }
);

export const user = pgTable(
  "User",
  {
    id: text("id").primaryKey().notNull(),
    email: text("email").notNull(),
    mobile: text("mobile").notNull(),
    createdAt: timestamp("createdAt", { precision: 3, mode: "string" })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp("updatedAt", {
      precision: 3,
      mode: "string",
    }).notNull(),
    firstname: text("firstname").notNull(),
    lastname: text("lastname").notNull(),
    sex: text("sex").notNull(),
    dob: timestamp("dob", { precision: 3, mode: "string" }).notNull(),
    nationality: text("nationality").notNull(),
    address: text("address"),
  },
  (table) => {
    return {
      emailKey: uniqueIndex("User_email_key").on(table.email),
      mobileKey: uniqueIndex("User_mobile_key").on(table.mobile),
    };
  }
);

export const reservation = pgTable(
  "Reservation",
  {
    id: text("id").primaryKey().notNull(),
    createdAt: timestamp("createdAt", {
      precision: 3,
      mode: "string",
    }).notNull(),
    modifiedAt: timestamp("modifiedAt", {
      precision: 3,
      mode: "string",
    }).notNull(),
    dateIn: timestamp("dateIn", { precision: 3, mode: "string" }).notNull(),
    dateOut: timestamp("dateOut", { precision: 3, mode: "string" }).notNull(),
    totalAmount: numeric("totalAmount", { precision: 65, scale: 30 }).notNull(),
    dueAmount: numeric("dueAmount", { precision: 65, scale: 30 }).notNull(),
    userId: text("userId")
      .notNull()
      .references(() => user.id, { onDelete: "cascade", onUpdate: "cascade" }),
    homestayId: text("homestayId")
      .notNull()
      .references(() => homestay.id, {
        onDelete: "cascade",
        onUpdate: "cascade",
      }),
  },
  (table) => {
    return {
      userIdIdx: index("Reservation_userId_idx").on(table.userId),
      homestayIdIdx: index("Reservation_homestayId_idx").on(table.homestayId),
    };
  }
);

export const homestayAmenities = pgTable(
  "HomestayAmenities",
  {
    homestayId: text("homestayId")
      .notNull()
      .references(() => homestay.id, {
        onDelete: "cascade",
        onUpdate: "cascade",
      }),
    amenityId: text("amenityId")
      .notNull()
      .references(() => amenity.id, {
        onDelete: "cascade",
        onUpdate: "cascade",
      }),
  },
  (table) => {
    return {
      homestayIdIdx: index("HomestayAmenities_homestayId_idx").on(
        table.homestayId
      ),
      amenityIdIdx: index("HomestayAmenities_amenityId_idx").on(
        table.amenityId
      ),
      homestayIdAmenityIdKey: uniqueIndex(
        "HomestayAmenities_homestayId_amenityId_key"
      ).on(table.homestayId, table.amenityId),
    };
  }
);

export const roomReserved = pgTable(
  "RoomReserved",
  {
    id: text("id").primaryKey().notNull(),
    pax: integer("pax").notNull(),
    amount: numeric("amount", { precision: 65, scale: 30 }).notNull(),
    status: text("status").notNull(),
    guestId: text("guestId")
      .notNull()
      .references(() => guest.id, { onDelete: "cascade", onUpdate: "cascade" }),
    roomId: text("roomId")
      .notNull()
      .references(() => room.id, { onDelete: "cascade", onUpdate: "cascade" }),
    foodPlanId: text("foodPlanId")
      .notNull()
      .references(() => foodPlan.id, {
        onDelete: "cascade",
        onUpdate: "cascade",
      }),
  },
  (table) => {
    return {
      guestIdIdx: index("RoomReserved_guestId_idx").on(table.guestId),
      roomIdIdx: index("RoomReserved_roomId_idx").on(table.roomId),
      foodPlanIdIdx: index("RoomReserved_foodPlanId_idx").on(table.foodPlanId),
    };
  }
);

export const foodPlan = pgTable(
  "FoodPlan",
  {
    id: text("id").primaryKey().notNull(),
    name: text("name").notNull(),
    tariff: numeric("tariff", { precision: 65, scale: 30 }).notNull(),
    nonVeg: boolean("nonVeg"),
  },
  (table) => {
    return {
      nameNonVegKey: uniqueIndex("FoodPlan_name_nonVeg_key").on(
        table.name,
        table.nonVeg
      ),
    };
  }
);

export const room = pgTable(
  "Room",
  {
    id: text("id").primaryKey().notNull(),
    name: text("name").notNull(),
    toiletAttached: boolean("toiletAttached").notNull(),
    airConditioned: boolean("airConditioned").notNull(),
    kitchenAttached: boolean("kitchenAttached").notNull(),
    isDorm: boolean("isDorm").notNull(),
    description: text("description").notNull(),
    occupancy: integer("occupancy").notNull(),
    houseRecommendation: boolean("houseRecommendation")
      .default(false)
      .notNull(),
    homestayId: text("homestayId")
      .notNull()
      .references(() => homestay.id, {
        onDelete: "restrict",
        onUpdate: "cascade",
      }),
  },
  (table) => {
    return {
      homestayIdIdx: index("Room_homestayId_idx").on(table.homestayId),
    };
  }
);

export const roomFeatures = pgTable(
  "RoomFeatures",
  {
    roomId: text("roomId")
      .notNull()
      .references(() => room.id, { onDelete: "cascade", onUpdate: "cascade" }),
    featureId: text("featureId")
      .notNull()
      .references(() => feature.id, {
        onDelete: "cascade",
        onUpdate: "cascade",
      }),
  },
  (table) => {
    return {
      roomIdIdx: index("RoomFeatures_roomId_idx").on(table.roomId),
      featureIdIdx: index("RoomFeatures_featureId_idx").on(table.featureId),
      roomIdFeatureIdKey: uniqueIndex("RoomFeatures_roomId_featureId_key").on(
        table.roomId,
        table.featureId
      ),
    };
  }
);

export const homestayGallery = pgTable(
  "HomestayGallery",
  {
    url: text("url").primaryKey().notNull(),
    category: text("category").notNull(),
    description: text("description"),
    homestayId: text("homestayId")
      .notNull()
      .references(() => homestay.id, {
        onDelete: "cascade",
        onUpdate: "cascade",
      }),
  },
  (table) => {
    return {
      homestayIdIdx: index("HomestayGallery_homestayId_idx").on(
        table.homestayId
      ),
    };
  }
);

export const amenity = pgTable(
  "Amenity",
  {
    id: text("id").primaryKey().notNull(),
    name: text("name").notNull(),
    description: text("description"),
  },
  (table) => {
    return {
      nameKey: uniqueIndex("Amenity_name_key").on(table.name),
    };
  }
);

export const feature = pgTable(
  "Feature",
  {
    id: text("id").primaryKey().notNull(),
    name: text("name").notNull(),
    description: text("description"),
  },
  (table) => {
    return {
      nameKey: uniqueIndex("Feature_name_key").on(table.name),
    };
  }
);

export const roomGallery = pgTable(
  "RoomGallery",
  {
    url: text("url").primaryKey().notNull(),
    category: text("category").notNull(),
    description: text("description"),
    roomId: text("roomId")
      .notNull()
      .references(() => room.id, { onDelete: "cascade", onUpdate: "cascade" }),
  },
  (table) => {
    return {
      roomIdIdx: index("RoomGallery_roomId_idx").on(table.roomId),
    };
  }
);

export const password = pgTable(
  "Password",
  {
    hash: text("hash").notNull(),
    userId: text("userId")
      .notNull()
      .references(() => user.id, { onDelete: "cascade", onUpdate: "cascade" }),
  },
  (table) => {
    return {
      userIdKey: uniqueIndex("Password_userId_key").on(table.userId),
    };
  }
);

export const rate = pgTable(
  "Rate",
  {
    id: text("id").primaryKey().notNull(),
    headCount: integer("headCount").notNull(),
    tariff: integer("tariff").notNull(),
    refundable: boolean("refundable").notNull(),
    roomId: text("roomId")
      .notNull()
      .references(() => room.id, { onDelete: "cascade", onUpdate: "cascade" }),
  },
  (table) => {
    return {
      roomIdIdx: index("Rate_roomId_idx").on(table.roomId),
    };
  }
);

export type RateSelect = InferSelectModel<typeof rate>;

export const prismaMigrations = pgTable("_prisma_migrations", {
  id: varchar("id", { length: 36 }).primaryKey().notNull(),
  checksum: varchar("checksum", { length: 64 }).notNull(),
  finishedAt: timestamp("finished_at", { withTimezone: true, mode: "string" }),
  migrationName: varchar("migration_name", { length: 255 }).notNull(),
  logs: text("logs"),
  rolledBackAt: timestamp("rolled_back_at", {
    withTimezone: true,
    mode: "string",
  }),
  startedAt: timestamp("started_at", { withTimezone: true, mode: "string" })
    .defaultNow()
    .notNull(),
  appliedStepsCount: integer("applied_steps_count").default(0).notNull(),
});

export const category = pgTable("Category", {
  id: text("id").primaryKey().notNull(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  roomId: text("roomId").references(() => room.id, {
    onDelete: "set null",
    onUpdate: "cascade",
  }),
});

export const categoryRelations = relations(category, ({ one, many }) => ({
  rooms: one(room, {
    fields: [category.roomId],
    references: [room.id],
  }),
}));

export const roomRelations = relations(room, ({ one, many }) => ({
  homestay: one(homestay, {
    fields: [room.homestayId],
    references: [homestay.id],
  }),
  categories: many(category),
  rates: many(rate),
}));

export const rateRelations = relations(rate, ({ one, many }) => ({
  room: one(room, {
    fields: [rate.roomId],
    references: [room.id],
  }),
}));

export const homestayRelations = relations(homestay, ({ one, many }) => ({
  homestayGallery: many(homestayGallery),
  homestayAmenities: many(homestayAmenities),
  location: one(location, {
    fields: [homestay.locationName],
    references: [location.name],
  }),
  rooms: many(room),
}));

export const homestayGalleryRelations = relations(
  homestayGallery,
  ({ one }) => ({
    homestay: one(homestay, {
      fields: [homestayGallery.homestayId],
      references: [homestay.id],
    }),
  })
);

export const homestayAmenitiesRelations = relations(
  homestayAmenities,
  ({ many }) => ({
    homestay: many(homestay),
  })
);

export const AdminPasswordRelations = relations(adminPassword, ({ one }) => ({
  password: one(admin, {
    fields: [adminPassword.adminId],
    references: [admin.id],
  }),
}));

export const AdminRelations = relations(admin, ({ many }) => ({
  password: many(adminPassword),
}));

// export const adminPass

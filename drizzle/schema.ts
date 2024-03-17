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
  serial,
  pgEnum,
} from "drizzle-orm/pg-core";

import { InferSelectModel, relations } from "drizzle-orm";

export const location = pgTable("Location", {
  id: text("id").primaryKey().notNull(),
  name: text("name").unique().notNull(),
  lat: doublePrecision("lat").notNull(),
  long: doublePrecision("long").notNull(),
  state: text("state").notNull(),
  altitude: integer("altitude").notNull(),
  description: text("description").notNull(),
  coverUrl: text("coverUrl").notNull(),
});

export type Location = typeof location.$inferSelect;
export type NewLocation = typeof location.$inferInsert;

// Admin Table
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

// Admin Password Table
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

// Homestay Table
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

// Guest Table
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

// User Table
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

// Reservation Table
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

// Homestay Amenities Table
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

// Room Reserved Table
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

// Food Plan Table
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

// Room Table
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

// Room Features Table
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

// Homestay Gallery
export const homestayGallery = pgTable(
  "HomestayGallery",
  {
    url: text("url").primaryKey().notNull(),
    category: text("category").notNull(),
    description: text("description"),
    isPrimary: boolean("isPrimary").notNull().default(false),
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

// Amenity Table
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

// Feature Table
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

// Room Gallery Table
export const roomGallery = pgTable(
  "RoomGallery",
  {
    url: text("url").primaryKey().notNull(),
    category: text("category").notNull(),
    description: text("description"),
    isPrimary: boolean("isPrimary").notNull().default(false),
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

// Password Table
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

// Rate Table
export const rate = pgTable(
  "Rate",
  {
    id: text("id").primaryKey().notNull(),
    type: text("type").notNull().default("B2B"),
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

// Category Table
export const category = pgTable("Category", {
  id: text("id").primaryKey().notNull(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  roomId: text("roomId").references(() => room.id, {
    onDelete: "set null",
    onUpdate: "cascade",
  }),
});

// Invoice Table
export const invoice = pgTable("Invoice", {
  id: serial("id").primaryKey().notNull(),
  guestName: text("guestName").notNull(),
  invoiceDate: timestamp("invoiceDate").notNull(),
  checkinDate: timestamp("checkinDate").notNull(),
  checkoutDate: timestamp("checkoutDate").notNull(),
  isDeleted: boolean("isDeleted").notNull().default(false),
  homestayId: text("homestayId")
    .notNull()
    .references(() => homestay.id, {
      onDelete: "cascade",
      onUpdate: "cascade",
    }),
});

// Invoice Accomodation Table
export const invoiceAccomodation = pgTable(
  "InvoiceAccomodation",
  {
    id: serial("id").$type<number>().primaryKey().notNull(),
    name: text("name").notNull(),
    quantity: integer("quantity").notNull(),
    rate: integer("rate").notNull(),
    invoiceId: integer("invoiceId")
      .notNull()
      .references(() => invoice.id, {
        onDelete: "cascade",
        onUpdate: "cascade",
      }),
  },
  (table) => {
    return {
      invoiceIdIdx: index("InvoiceAccomodation_invoiceId_idx").on(
        table.invoiceId
      ),
    };
  }
);

// Food Types Enum
export const FoodTypesEnum = pgEnum("type", [
  "breakfast",
  "lunch",
  "dinner",
  "snacks",
]);

// Invoice Food Table
export const invoiceFood = pgTable(
  "InvoiceFood",
  {
    id: serial("id").primaryKey().notNull(),
    type: FoodTypesEnum("type").notNull(),
    name: text("name").notNull(),
    quantity: integer("quantity").notNull(),
    rate: integer("rate").notNull(),
    invoiceId: integer("invoiceId")
      .notNull()
      .references(() => invoice.id, {
        onDelete: "cascade",
        onUpdate: "cascade",
      }),
  },
  (table) => {
    return {
      invoiceIdIdx: index("InvoiceFood_invoiceId_idx").on(table.invoiceId),
    };
  }
);

// Invoice Amenities Table
export const invoiceAmenities = pgTable(
  "InvoiceAmenities",
  {
    id: serial("id").primaryKey().notNull(),
    name: text("name").notNull(),
    quantity: integer("quantity").notNull(),
    rate: integer("rate").notNull(),
    invoiceId: integer("invoiceId")
      .notNull()
      .references(() => invoice.id, {
        onDelete: "cascade",
        onUpdate: "cascade",
      }),
  },
  (table) => {
    return {
      invoiceIdIdx: index("InvoiceAmenities_invoiceId_idx").on(table.invoiceId),
    };
  }
);

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
  roomGallery: many(roomGallery),
}));

export const rateRelations = relations(rate, ({ one, many }) => ({
  room: one(room, {
    fields: [rate.roomId],
    references: [room.id],
  }),
}));

export const roomGalleryRelations = relations(roomGallery, ({ one, many }) => ({
  room: one(room, {
    fields: [roomGallery.roomId],
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

export const adminPasswordRelations = relations(adminPassword, ({ one }) => ({
  password: one(admin, {
    fields: [adminPassword.adminId],
    references: [admin.id],
  }),
}));

export const adminRelations = relations(admin, ({ many }) => ({
  password: many(adminPassword),
}));

export const invoiceRelations = relations(invoice, ({ many }) => ({
  accomodation: many(invoiceAccomodation),
  food: many(invoiceFood),
  amenities: many(invoiceAmenities),
}));

export const accomodationRelations = relations(
  invoiceAccomodation,
  ({ one }) => ({
    invoice: one(invoice, {
      fields: [invoiceAccomodation.invoiceId],
      references: [invoice.id],
    }),
  })
);

export const foodRelations = relations(invoiceFood, ({ one }) => ({
  invoice: one(invoice, {
    fields: [invoiceFood.invoiceId],
    references: [invoice.id],
  }),
}));

export const amenitiesRelations = relations(invoiceAmenities, ({ one }) => ({
  invoice: one(invoice, {
    fields: [invoiceAmenities.invoiceId],
    references: [invoice.id],
  }),
}));

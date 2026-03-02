import { pgTable, integer, text, timestamp, boolean } from "drizzle-orm/pg-core";

export const messages = pgTable("messages", {
    id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
    name: text("name").notNull(),
    email: text("email").notNull(),
    subject: text("subject").notNull(),
    message: text("message").notNull(),
    isRead: boolean("is_read").default(false).notNull(),
    isArchived: boolean("is_archived").default(false).notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
});

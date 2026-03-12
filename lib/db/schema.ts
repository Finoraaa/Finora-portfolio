import { pgTable, integer, text, timestamp, boolean, json } from "drizzle-orm/pg-core";

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

export const projects = pgTable("projects", {
    id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
    slug: text("slug").notNull().unique(),
    title: text("title").notNull(),
    link: text("link"),
    
    // Brief description for project cards
    descriptionEn: text("description_en").notNull(),
    descriptionTr: text("description_tr").notNull(),
    
    // Detail page content
    challengeEn: text("challenge_en").notNull(),
    challengeTr: text("challenge_tr").notNull(),
    solutionEn: text("solution_en").notNull(),
    solutionTr: text("solution_tr").notNull(),
    
    // JSON arrays for features and tags
    featuresEn: json("features_en").$type<string[]>().default([]).notNull(),
    featuresTr: json("features_tr").$type<string[]>().default([]).notNull(),
    tags: json("tags").$type<string[]>().default([]).notNull(),
    
    // Order in the list
    sortOrder: integer("sort_order").default(0).notNull(),
    
    createdAt: timestamp("created_at").defaultNow().notNull(),
});

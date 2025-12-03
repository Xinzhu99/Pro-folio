
import { integer, timestamp } from "drizzle-orm/pg-core";
import { pgTable, serial, text } from "drizzle-orm/pg-core"

export const categories = pgTable("categories", {
    id: serial("id").primaryKey(),
    name: text("name").notNull(),
});
export const classes = pgTable("classes", {
    id:serial("id").primaryKey(),
    name: text("name").notNull(),
    date:timestamp("date").notNull(),
})
export const projects = pgTable("projects", {
    id:serial("id").primaryKey(),
    title: text("title").notNull(),
    gitHub_link: text("gitHub_link").notNull(),
    demo_link:text("demo_link").notNull(),
    thumbnail:text("thumbnail"),
    created_at: timestamp("created_at").defaultNow().notNull(),
    published_at: timestamp("published_at"),
    category_id: integer("category_id").references(()=>categories.id, {onDelete:"cascade"}),
    class_id:integer("class_id").references(()=> classes.id, {onDelete:"cascade"})
})
import knex from "knex";
import { z } from "zod";

export const pg = knex({
  client: "pg",
  connection: {
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT || "5432"),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  },
  searchPath: ["public"]
})

// ==== USER LINK ====

export const UserLinkSchema = z.object({
  logto_id: z.string().min(1),
  platform: z.string().min(1),
  platform_id: z.string().min(1),
})

export type UserLink = z.infer<typeof UserLinkSchema>;

await pg.schema.createTableIfNotExists("user_link", (table) => {
  table.text("logto_id").primary();
  table.text("platform");
  table.text("platform_id");
})

// ==== USER ====

export const UserSchema = z.object({
  logto_id: z.string().min(1),
  avatar: z.string().min(1),
  name: z.string().min(1),
})

export type User = z.infer<typeof UserSchema>;

await pg.schema.createTableIfNotExists("user", (table) => {
  table.text("logto_id").primary();
  table.text("avatar");
  table.text("name");
})

export const BookStack_BooksSchema = z.object({
  id: z.number(),
  slug: z.string().min(1),
  name: z.string().min(1),
  description: z.string().min(1),
  created_at: z.date(),
  updated_at: z.date(),
  owned_by: z.number(),
  created_by: z.number(),
  updated_by: z.number(),
  cover_url: z.string().min(1),
})

export type BookStack_Books = z.infer<typeof BookStack_BooksSchema>;

await pg.schema.createTableIfNotExists("bookstack_books", (table) => {
  table.integer("id").primary();
  table.text("slug");
  table.text("name");
  table.text("description");
  table.date("created_at");
  table.date("updated_at");
  table.integer("owned_by");
  table.integer("created_by");
  table.integer("updated_by");
  table.text("cover_url");
})

export const BookStack_PagesSchema = z.object({
  name: z.string().min(1),
  id: z.number(),
  slug: z.string().min(1),
  book_id: z.number(),
  chapter_id: z.number(),
  draft: z.boolean(),
  template: z.boolean(),
  created_at: z.date(),
  updated_at: z.date(),
  priority: z.number(),
  owned_by: z.number(),
  book_slug: z.string().min(1),
  created_by: z.number(),
  updated_by: z.number(),
  revision_count: z.number(),
  editor: z.string().min(1),
  chars: z.number()
})

export type BookStack_Pages = z.infer<typeof BookStack_PagesSchema>;

await pg.schema.createTableIfNotExists("bookstack_pages", (table) => {
  table.text("name");
  table.integer("id").primary();
  table.text("slug");
  table.integer("book_id");
  table.integer("chapter_id");
  table.boolean("draft");
  table.boolean("template");
  table.date("created_at");
  table.date("updated_at");
  table.integer("priority");
  table.integer("owned_by");
  table.text("book_slug");
  table.integer("created_by");
  table.integer("updated_by");
  table.integer("revision_count");
  table.text("editor");
  table.integer("chars");
})

export const db = {
  get UserLink() {
    return pg<UserLink>("user_link");
  },
  
  get User() {
    return pg<User>("user");
  },

  get BookStack_Books() {
    return pg<BookStack_Books>("bookstack_books");
  },

  get BookStack_Pages() {
    return pg<BookStack_Pages>("bookstack_pages");
  }
}
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

if (!await pg.schema.hasTable("user_link")) {
  await pg.schema.createTable("user_link", (table) => {
    table.text("logto_id").primary();
    table.text("platform");
    table.text("platform_id");
  });
  
  // 为 platform 和 platform_id 创建联合索引，因为经常一起查询
  await pg.schema.alterTable("user_link", (table) => {
    table.index(["platform", "platform_id"]);
  });
}

// ==== USER ====

export const UserSchema = z.object({
  logto_id: z.string().min(1),
  avatar: z.string().min(1),
  name: z.string().min(1),
  custom_data: z.string(),
})

export type User = z.infer<typeof UserSchema>;

if (!await pg.schema.hasTable("user")) {
  await pg.schema.createTable("user", (table) => {
    table.text("logto_id").primary();
    table.text("avatar");
    table.text("name");
    table.text("custom_data");
  });

  // 为 name 创建索引，因为可能会按名字搜索
  await pg.schema.alterTable("user", (table) => {
    table.index(["name"]);
    table.index(["logto_id"]);
  });
}

// ==== BOOKSTACK BOOKS ====

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

if (!await pg.schema.hasTable("bookstack_books")) {
  await pg.schema.createTable("bookstack_books", (table) => {
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
  });

  // 为常用查询字段创建索引
  await pg.schema.alterTable("bookstack_books", (table) => {
    table.index(["slug"]); // 用于URL路由
    table.index(["name"]); // 用于搜索
    table.index(["owned_by"]); // 用于查询用户的书籍
    table.index(["created_by"]); // 用于查询用户创建的书籍
    table.index(["created_at"]); // 用于时间排序
  });
}

// ==== BOOKSTACK PAGES ====

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

if (!await pg.schema.hasTable("bookstack_pages")) {
  await pg.schema.createTable("bookstack_pages", (table) => {
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
  });

  // 为常用查询字段创建索引
  await pg.schema.alterTable("bookstack_pages", (table) => {
    table.index(["slug"]); // 用于URL路由
    table.index(["book_id"]); // 用于查询书籍的页面
    table.index(["chapter_id"]); // 用于查询章节的页面
    table.index(["created_by"]); // 用于查询用户创建的页面
    table.index(["book_slug"]); // 用于URL路由和关联查询
    table.index(["created_at"]); // 用于时间排序
    table.index(["draft", "template"]); // 用于筛选草稿和模板
  });
}

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
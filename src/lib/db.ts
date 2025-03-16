import knex from "knex";

export const db = knex({
  client: "better-sqlite3",
  connection: {
    filename: "./db.sqlite"
  }
})

export interface UserStore {
  uid: string;
  store: string;
  store_int: number;
  store_float: number;
  store_string: string;
}

await db.schema.createTableIfNotExists("user_store", (table) => {
  table.string("uid").primary();
  table.string("store");
  table.integer("store_int");
  table.float("store_float");
  table.string("store_string");
})

export interface UserLink {
  logto_id: string;
  platform: string;
  platform_id: string;
}

await db.schema.createTableIfNotExists("user_link", (table) => {
  table.string("logto_id").primary();
  table.string("platform");
  table.string("platform_id");
})

export interface User {
  logto_id: string;
  avatar: string;
  name: string;
}

await db.schema.createTableIfNotExists("user", (table) => {
  table.string("logto_id").primary();
  table.string("avatar");
  table.string("name");
})
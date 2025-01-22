// These data structures define your client-side schema.
// They must be equal to or a subset of the server-side schema.
// Note the "relationships" field, which defines first-class
// relationships between tables.
// See https://github.com/rocicorp/mono/blob/main/apps/zbugs/src/domain/schema.ts
// for more complex examples, including many-to-many.

import {
  createSchema,
  createTableSchema,
  definePermissions,
  Row,
} from "@rocicorp/zero";

const salesSchema = createTableSchema({
  tableName: "sales",
  columns: {
    id: "number",
    first_name: "string",
    last_name: "string",
    email: "string",
    administrator: "boolean",
    user_id: "string", // uuid
    avatar: "json",
    disabled: "boolean",
  },
  primaryKey: "id",
});

const contactsSchema = createTableSchema({
  tableName: "contacts",
  columns: {
    id: "number",
    first_name: "string",
    last_name: "string",
    gender: "string",
    title: "string",
    email: "string",
    avatar: "json",
    has_newsletter: "boolean",
    status: "string",
    company_id: "number",
    sales_id: "number",
    linkedin_url: "string",
  },
  primaryKey: "id",
});

export const schema = createSchema({
  version: 1,
  tables: {
    sales: salesSchema,
    contacts: contactsSchema,
  },
});

export type Schema = typeof schema;
export type Sale = Row<typeof salesSchema>;
export type Contact = Row<typeof contactsSchema>;

export const permissions = definePermissions<string, Schema>(schema, () => {
  return {};
});

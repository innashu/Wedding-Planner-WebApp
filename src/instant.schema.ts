// Docs: https://www.instantdb.com/docs/modeling-data

import { i } from "@instantdb/react";

const _schema = i.schema({
  entities: {
    $files: i.entity({
      path: i.string().unique().indexed(),
      url: i.string(),
    }),
    $users: i.entity({
      email: i.string().unique().indexed().optional(),
      imageURL: i.string().optional(),
      type: i.string().optional(),
    }),
    todos: i.entity({
      text: i.string(),
      done: i.boolean(),
      createdAt: i.number(),
    }),
    items: i.entity({
      name: i.string(),
      category: i.string().indexed(),
      section: i.string().indexed().optional(),
      order: i.number().indexed(),
      createdAt: i.number().indexed(),
      dueDate: i.number().indexed().optional(),
      notes: i.string().optional(),
      // For table sections: JSON string of column values e.g. {"col1": "value1", "col2": "value2"}
      columnValues: i.string().optional(),
    }),
    sections: i.entity({
      name: i.string(),
      category: i.string().indexed(),
      order: i.number().indexed(),
      createdAt: i.number().indexed(),
      // JSON string array of column definitions e.g. [{"id": "col1", "name": "Venue"}, {"id": "col2", "name": "Price"}]
      columns: i.string().optional(),
    }),
  },
  links: {
    $usersLinkedPrimaryUser: {
      forward: {
        on: "$users",
        has: "one",
        label: "linkedPrimaryUser",
        onDelete: "cascade",
      },
      reverse: {
        on: "$users",
        has: "many",
        label: "linkedGuestUsers",
      },
    },
  },
  rooms: {
    todos: {
      presence: i.entity({}),
    },
  },
});

// This helps TypeScript display nicer intellisense
type _AppSchema = typeof _schema;
interface AppSchema extends _AppSchema {}
const schema: AppSchema = _schema;

export type { AppSchema };
export default schema;

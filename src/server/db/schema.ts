import {
	boolean,
	pgTable,
	serial,
	timestamp,
	varchar,
} from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";

export const tasks = pgTable("tasks", {
	id: serial("id").primaryKey(),
	name: varchar("name", { length: 256 }).notNull(),
	done: boolean("done").default(false).notNull(),
	createdAt: timestamp("created_at").defaultNow().notNull(),
	updatedAt: timestamp("updatedAt").defaultNow().notNull().$onUpdate(() => new Date()),
});

export const selectTasksSchema = createSelectSchema(tasks);
export const insertTasksSchema = createInsertSchema(tasks, {
	name: (schema) => schema.name.min(3).max(256),
})
	.required({
		done: true,
	})
	.omit({
		id: true,
		createdAt: true,
		updatedAt: true,
	});

export const updateTasksSchema = insertTasksSchema.partial();
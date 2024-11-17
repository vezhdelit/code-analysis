import {
	GetTasksRoute,
	CreateTaskRoute,
	GetOneTaskRoute,
	UpdateTaskRoute,
	DeleteTaskRoute,
} from "./tasks.routes";
import { RouteHandler } from "@hono/zod-openapi";
import db from "@/server/db";
import { tasks } from "@/server/db/schema";
import { HTTP_STATUS_CODES, HTTP_STATUS_MESSAGES } from "@/enums/server";
import { eq } from "drizzle-orm";

export const createTask: RouteHandler<CreateTaskRoute> = async (c) => {
	const task = c.req.valid("json");
	const [inserted] = await db.insert(tasks).values(task).returning();
	return c.json(inserted, HTTP_STATUS_CODES.OK);
};

export const getTasks: RouteHandler<GetTasksRoute> = async (c) => {
	const tasks = await db.query.tasks.findMany({
		orderBy: (t, { desc }) => [desc(t.id)],
	});
	return c.json(tasks);
};

export const getOneTask: RouteHandler<GetOneTaskRoute> = async (c) => {
	const { id } = c.req.valid("param");
	const task = await db.query.tasks.findFirst({
		where(fields, operators) {
			return operators.eq(fields.id, id);
		},
	});
	if (!task) {
		return c.json(
			{
				message: HTTP_STATUS_MESSAGES.NOT_FOUND,
			},
			HTTP_STATUS_CODES.NOT_FOUND
		);
	}
	return c.json(task, HTTP_STATUS_CODES.OK);
};

export const updateTask: RouteHandler<UpdateTaskRoute> = async (c) => {
	const { id } = c.req.valid("param");
	const updates = c.req.valid("json");

	const [updated] = await db
		.update(tasks)
		.set(updates)
		.where(eq(tasks.id, id))
		.returning();

	if (!updated) {
		return c.json(
			{
				message: HTTP_STATUS_MESSAGES.NOT_FOUND,
			},
			HTTP_STATUS_CODES.NOT_FOUND
		);
	}
	return c.json(updated, HTTP_STATUS_CODES.OK);
};

export const deleteTask: RouteHandler<DeleteTaskRoute> = async (c) => {
	const { id } = c.req.valid("param");
	const [deleted] = await db
		.delete(tasks)
		.where(eq(tasks.id, id))
		.returning();
	if (!deleted) {
		return c.json(
			{
				message: HTTP_STATUS_MESSAGES.NOT_FOUND,
			},
			HTTP_STATUS_CODES.NOT_FOUND
		);
	}
	return c.body(null, HTTP_STATUS_CODES.NO_CONTENT);
};

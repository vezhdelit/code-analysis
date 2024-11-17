import { createRoute, z } from "@hono/zod-openapi";
import {
	createErrorSchema,
	IdParamsSchema,
	jsonContent,
	jsonContentOneOf,
	jsonContentRequired,
	notFoundSchema,
} from "@/helpers/route-define";
import { HTTP_STATUS_CODES } from "@/enums/server";
import { insertTasksSchema, selectTasksSchema, updateTasksSchema } from "@/server/db/schema";

const tags = ["Tasks"];

export const getTasks = createRoute({
	tags,
	path: "/tasks",
	method: "get",
	responses: {
		[HTTP_STATUS_CODES.OK]: jsonContent(
			z.array(selectTasksSchema),
			"The list of tasks"
		),
	},
});

export const createTask = createRoute({
	tags,
	path: "/tasks",
	method: "post",
	request: {
		body: jsonContentRequired(insertTasksSchema, "Task to create"),
	},
	responses: {
		[HTTP_STATUS_CODES.OK]: jsonContent(selectTasksSchema, "Created task"),
		[HTTP_STATUS_CODES.UNPROCESSABLE_ENTITY]: jsonContent(
			createErrorSchema(insertTasksSchema),
			"Validation error"
		),
	},
});

export const getOneTask = createRoute({
	tags,
	path: "/tasks/{id}",
	method: "get",
	request: {
		params: IdParamsSchema,
	},
	responses: {
		[HTTP_STATUS_CODES.OK]: jsonContent(
			selectTasksSchema,
			"The requested task"
		),
		[HTTP_STATUS_CODES.NOT_FOUND]: jsonContent(
			notFoundSchema,
			"Task not found"
		),
		[HTTP_STATUS_CODES.UNPROCESSABLE_ENTITY]: jsonContent(
			createErrorSchema(IdParamsSchema),
			"Invalid ID error"
		),
	},
});

export const updateTask = createRoute({
	tags,
	path: "/tasks/{id}",
	method: "patch",
	request: {
		params: IdParamsSchema,
		body: jsonContentRequired(updateTasksSchema, "The task updates"),
	},
	responses: {
		[HTTP_STATUS_CODES.OK]: jsonContent(selectTasksSchema, "Created task"),
		[HTTP_STATUS_CODES.NOT_FOUND]: jsonContent(
			notFoundSchema,
			"Task not found"
		),
		[HTTP_STATUS_CODES.UNPROCESSABLE_ENTITY]: jsonContentOneOf(
			[
				createErrorSchema(IdParamsSchema),
				createErrorSchema(updateTasksSchema),
			],
			"The validation error(s)"
		),
	},
});

export const deleteTask = createRoute({
	tags,
	path: "/tasks/{id}",
	method: "delete",
	request: {
		params: IdParamsSchema,
	},
	responses: {
		[HTTP_STATUS_CODES.NO_CONTENT]: {
			description: "Task deleted",
		},
		[HTTP_STATUS_CODES.NOT_FOUND]: jsonContent(
			notFoundSchema,
			"Task not found"
		),
		[HTTP_STATUS_CODES.UNPROCESSABLE_ENTITY]: jsonContent(
			createErrorSchema(IdParamsSchema),
			"Invalid ID error"
		),
	},
});

export type GetTasksRoute = typeof getTasks;
export type CreateTaskRoute = typeof createTask;
export type GetOneTaskRoute = typeof getOneTask;
export type UpdateTaskRoute = typeof updateTask;
export type DeleteTaskRoute = typeof deleteTask;
import { createRoute, z } from "@hono/zod-openapi";
import {
	createErrorSchema,
	jsonContent,
	jsonContentRequired,
} from "@/helpers/route-define";
import { HTTP_STATUS_CODES } from "@/enums/server";

const tags = ["Linter"];

const tokenizeSchema = z.object({
	code: z.string().min(1),
	config: z.object({
		tolerant: z.boolean().optional(),
		comment: z.boolean().optional(),
		range: z.boolean().optional(),
		loc: z.boolean().optional(),
	}).optional(),
});

const tokenizeResponseSchema = z.object({
	tokens: z.array(
		z.object({
			type: z.string(),
			value: z.string(),
		})
	),
});

export const tokenizeCode = createRoute({
	tags,
	path: "/linter/tokenize",
	method: "post",
	request: {
		body: jsonContentRequired(tokenizeSchema, "Code to tokenize"),
	},
	responses: {
		[HTTP_STATUS_CODES.OK]: jsonContent(
			tokenizeResponseSchema,
			"Tokenized code"
		),
		[HTTP_STATUS_CODES.UNPROCESSABLE_ENTITY]: jsonContent(
			createErrorSchema(tokenizeSchema),
			"Validation error"
		),
	},
});

const parseSchema = z.object({
	code: z.string().min(1),
});

const parseResponseSchema = z.object({
	tokens: z.object({
		type: z.string(),
		sourceType: z.string(),
		body: z.array(
			z.object({
				type: z.string(),
				kind: z.string(),
				declaration: z.array(
					z.object({
						type: z.string(),
						id: z.object({
							type: z.string(),
							name: z.string(),
						}),
						init: z.object({
							type: z.string(),
							value: z.string(),
							raw: z.string(),
						}),
					})
				),
			})
		),
	}),
});

export const parseCode = createRoute({
	tags,
	path: "/linter/parse",
	method: "post",
	request: {
		body: jsonContentRequired(parseSchema, "Code to parse"),
	},
	responses: {
		[HTTP_STATUS_CODES.OK]: jsonContent(
			parseResponseSchema,
			"Parsed code"
		),
		[HTTP_STATUS_CODES.UNPROCESSABLE_ENTITY]: jsonContent(
			createErrorSchema(parseSchema),
			"Validation error"
		),
	},
});

export type TokenizeCodeRoute = typeof tokenizeCode;
export type ParseCodeRoute = typeof parseCode;

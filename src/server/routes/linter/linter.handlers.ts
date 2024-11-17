import { RouteHandler } from "@hono/zod-openapi";
import { HTTP_STATUS_CODES } from "@/enums/server";
import { ParseCodeRoute, TokenizeCodeRoute } from "./linter.routes";
import { parse, tokenize } from "@/lib/linter";

export const tokenizeCode: RouteHandler<TokenizeCodeRoute> = async (c) => {
	const { code } = c.req.valid("json");
	const tokens = tokenize(code, {}, {});

	return c.json({ tokens }, HTTP_STATUS_CODES.OK);
};

export const parseCode: RouteHandler<ParseCodeRoute> = async (c) => {
	const { code } = c.req.valid("json");
	const tokens = parse(code, { tolerant: true }, {});

	return c.json({ tokens }, HTTP_STATUS_CODES.OK);
};

import { clientEnvs } from "@/env/client";
import { HonoAppType } from "@/server";
import { hc } from "hono/client";

export const client = hc<HonoAppType>(clientEnvs.NEXT_PUBLIC_BASE_URL ?? "");

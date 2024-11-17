import createHonoApp from "./app";
import configureOpenAPI from "./open-api";
import linterRouter from "./routes/linter/linter.index";
import tasksRouter from "./routes/tasks/tasks.index";

const app = createHonoApp();
configureOpenAPI(app);

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const routes = app.route("/api", linterRouter).route("/api", tasksRouter);

export type HonoAppType = typeof routes;
export default app;

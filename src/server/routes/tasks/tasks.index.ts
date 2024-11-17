import { createRouter } from "../../app";
import * as handlers from "./tasks.handlers";
import * as routes from "./tasks.routes";

const tasksRouter = createRouter()
	.openapi(routes.createTask, handlers.createTask)
	.openapi(routes.getTasks, handlers.getTasks)
	.openapi(routes.getOneTask, handlers.getOneTask)
	.openapi(routes.updateTask, handlers.updateTask)
	.openapi(routes.deleteTask, handlers.deleteTask);

export default tasksRouter;

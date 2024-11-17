"use client";

import { useGetTasks } from "@/hooks/use-tasks";
import React from "react";
import TaskItem from "./task-item";

const TaskList = () => {
	const { data: tasks, isLoading } = useGetTasks();

	if (isLoading) {
		return <span>Loading...</span>;
	}
	return (
		<ul className="flex flex-col gap-3">
			{tasks.map((task) => (
				<TaskItem key={task.id} task={task} />
			))}
		</ul>
	);
};

export default TaskList;

"use client";
import { Checkbox } from "@/components/ui/checkbox";
import { useDeleteTask, useUpdateTask } from "@/hooks/use-tasks";
import React from "react";
import dayjs from "dayjs";
import { Button } from "@/components/ui/button";
import { MdOutlineDelete } from "react-icons/md";

type Props = {
	task: {
		id: number;
		name: string;
		done: boolean;
		createdAt: string;
	};
};

const TaskItem = ({ task }: Props) => {
	const updateTask = useUpdateTask();
	const deleteTask = useDeleteTask();

	return (
		<li className="flex items-center justify-between bg-white rounded-xl gap-3 px-5 py-2">
			<div className="flex items-center gap-3">
				<div className="flex items-center justify-center rounded-full bg-primary text-primary-foreground h-6 min-w-6">
					<span className="text-sm font-medium">{task.id}</span>
				</div>

				<div className="flex flex-col">
					<p className=" break-all">{task.name}</p>
					<span className=" text-neutral-500 text-xs leading-3">
						{dayjs(task.createdAt).format("DD/MM HH:mm")}
					</span>
				</div>
			</div>

			<div className="flex items-center gap-3">
				<Checkbox
					checked={task.done}
					onCheckedChange={(checked: boolean) => {
						updateTask.mutate({
							json: {
								done: checked,
							},
							param: {
								id: task.id.toString(),
							},
						});
					}}
				/>
				<Button
					size={"icon"}
					variant={"destructive"}
					className="size-6"
					onClick={() => {
						deleteTask.mutate({
							param: {
								id: task.id.toString(),
							},
						});
					}}
				>
					<MdOutlineDelete />
				</Button>
			</div>
		</li>
	);
};

export default TaskItem;

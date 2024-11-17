"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCreateTask } from "@/hooks/use-tasks";
import { useState } from "react";

const NewTaskItem = () => {
	const [name, setName] = useState("");

	const createTask = useCreateTask();

	return (
		<div className="flex items-center justify-center bg-white rounded-xl px-3 py-3 w-full gap-3 ">
			<Input value={name} onChange={(e) => setName(e.target.value)} />

			<Button
				onClick={() =>
					createTask.mutate({
						json: {
							name: name,
							done: false,
						},
					})
				}
			>
				Create Task
			</Button>
		</div>
	);
};

export default NewTaskItem;

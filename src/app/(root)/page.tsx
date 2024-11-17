import NewTaskItem from "@/components/features/tasks/new-task-item";
import TaskList from "@/components/features/tasks/task-list";

export default async function Home() {
	return (
		<main className="container flex justify-center">
			<div className="flex flex-col gap-3 w-full  max-w-[520px]">
				<NewTaskItem />
				<TaskList />
			</div>
		</main>
	);
}

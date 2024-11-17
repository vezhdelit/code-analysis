import { client } from "@/lib/rpc";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";
import { toast } from "./use-toast";

export const useGetTasks = () => {
	const query = useQuery({
		queryKey: ["tasks"],
		queryFn: async () => {
			const response = await client.api.tasks.$get();

			if (!response.ok) {
				return [];
			}
			const data = await response.json();
			return data;
		},
		initialData: [],
	});

	return query;
};

type CreateResponseType = InferResponseType<
	(typeof client.api.tasks)["$post"],
	200
>;
type CreateRequestType = InferRequestType<(typeof client.api.tasks)["$post"]>;

export const useCreateTask = () => {
	const queryClient = useQueryClient();

	const mutation = useMutation<CreateResponseType, Error, CreateRequestType>({
		mutationFn: async (task) => {
			const response = await client.api.tasks.$post(task);

			if (!response.ok) {
				throw new Error("Failed to create task");
			}

			return await response.json();
		},
		onSuccess: () => {
			toast({
				title: "Success",
				description: "Task created successfully!",
			});
			queryClient.invalidateQueries({ queryKey: ["tasks"] });
		},
		onError: () => {
			toast({
				variant: "destructive",
				title: "Error",
				description: "Fill fields with valid data!",
			});
		},
	});

	return mutation;
};

type UpdateResponseType = InferResponseType<
	(typeof client.api.tasks)[":id"]["$patch"],
	200
>;
type UpdateRequestType = InferRequestType<
	(typeof client.api.tasks)[":id"]["$patch"]
>;

export const useUpdateTask = () => {
	const queryClient = useQueryClient();

	const mutation = useMutation<UpdateResponseType, Error, UpdateRequestType>({
		mutationFn: async (task) => {
			const response = await client.api.tasks[":id"].$patch(task);

			if (!response.ok) {
				throw new Error("Failed to update task");
			}

			return await response.json();
		},
		onSuccess: () => {
			toast({
				title: "Success",
				description: "Task updated successfully!",
			});
			queryClient.invalidateQueries({ queryKey: ["tasks"] });
		},
		onError: () => {
			toast({
				variant: "destructive",
				title: "Error",
				description: "Fill fields with valid data!",
			});
		},
	});

	return mutation;
};

type DeleteRequestType = InferRequestType<
	(typeof client.api.tasks)[":id"]["$delete"]
>;

export const useDeleteTask = () => {
	const queryClient = useQueryClient();

	const mutation = useMutation<void, Error, DeleteRequestType>({
		mutationFn: async (task) => {
			const response = await client.api.tasks[":id"].$delete(task);

			if (!response.ok) {
				throw new Error("Failed to delete task");
			}

			return;
		},
		onSuccess: () => {
			toast({
				title: "Success",
				description: "Task deleted successfully!",
			});
			queryClient.invalidateQueries({ queryKey: ["tasks"] });
		},
		onError: () => {
			toast({
				variant: "destructive",
				title: "Error",
				description: "Failed to delete task!",
			});
		},
	});

	return mutation;
};

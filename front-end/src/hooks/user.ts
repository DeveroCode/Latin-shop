import { getUser } from "@/api/AuthAPI";
import { useQuery, useQueryClient } from "@tanstack/react-query";

export const useUser = () => {
    const queryClient = useQueryClient();

    return useQuery({
        queryKey: ["user"],
        queryFn: getUser,
        refetchOnWindowFocus: false,
        initialData: () => queryClient.getQueryData(["user"]),
        retry: false,
        refetchOnReconnect: false,
        refetchOnMount: false,
        staleTime: 1000 * 60 * 10,
    })
}
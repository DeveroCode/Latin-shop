import { getCategories } from "@/api/ProductsAPI";
import { useQuery, useQueryClient } from "@tanstack/react-query";

export const useCategories = () => {
    const queryClient = useQueryClient();

    return useQuery({
        queryKey: ["categories"],
        queryFn: getCategories,
        refetchOnWindowFocus: false,
        initialData: () => queryClient.getQueryData(["categories"]),
        retry: false,
        refetchOnReconnect: false,
        refetchOnMount: false,
        staleTime: 1000 * 60 * 10,
    })
}
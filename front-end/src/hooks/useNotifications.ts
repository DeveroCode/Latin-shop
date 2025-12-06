import { getNotifications } from "@/api/ShopAPI";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { socketClient } from "../socket/socket";
import type { Notification, Notifications } from "../types";

export function useNotifications(userId: string) {
    const queryClient = useQueryClient();

    const { data: notifications, isLoading, isError } = useQuery<Notifications>({
        queryKey: ["notifications"],
        queryFn: getNotifications,
        staleTime: Infinity,
        refetchOnWindowFocus: false,
        retry: false,
    });

    useEffect(() => {
        if (!userId) return;

        socketClient.connect(userId);

        socketClient.onNotification((newNotification: Notification) => {
            console.log("📩 Recibida notificación:", newNotification);
            queryClient.setQueryData<Notifications>(
                ["notifications"],
                (old = []) => [newNotification, ...old]
            );
        });

        return () => socketClient.offNotification();
    }, [userId, queryClient]);

    return { notifications, isLoading, isError };
}

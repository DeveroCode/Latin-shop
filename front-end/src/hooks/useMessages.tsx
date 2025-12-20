import { useEffect } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { socketClient } from "../socket/socket";
import { getMessagesByChat } from "@/api/ChatAndMessageAPI";
import type { Message, Messages } from "@/types/index";

export function useMessages(chatId: string, userId: string) {
  const queryClient = useQueryClient();

  const { data: messages, isLoading } = useQuery<Messages>({
    queryKey: ["messages", chatId],
    queryFn: () => getMessagesByChat(chatId),
    enabled: !!chatId,
    staleTime: Infinity,
  });

  useEffect(() => {
    if (!chatId || !userId) return;

    socketClient.connect(userId);

    socketClient.getSocket()?.emit("join-room", chatId);

    socketClient.onNewMessage((newMessage: Message) => {
      queryClient.setQueryData<Messages>(["messages", chatId], (old = []) => [
        ...old,
        newMessage,
      ]);
    });

    return () => socketClient.offNewMessage();
  }, [chatId, userId, queryClient]);

  return { messages, isLoading };
}

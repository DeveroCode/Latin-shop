import { sendMessage } from "@/api/ChatAndMessageAPI";
import ChatForm from "@/components/forms/ChatForm";
import { useUser } from "@/hooks/user";
import { useMessages } from "@/hooks/useMessages";
import type { Chat, MessageFormData } from "@/types/index";
import { useMutation } from "@tanstack/react-query";
import {
  Paperclip,
  Phone,
  SendHorizonal,
  Smile,
  Video,
  X,
} from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

type ChatBoxProps = {
  chat: Chat;
  onClose: () => void;
};

export default function ChatBox({ onClose, chat }: ChatBoxProps) {
  const { data: user } = useUser();
  const otherUser = user?.role === "buyer" ? chat.seller : chat.buyer;
  const { messages } = useMessages(chat._id, user!._id);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      content: "",
    },
  });

  const { mutate } = useMutation({
    mutationFn: sendMessage,
    onSuccess: () => {
      reset();
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const onSubmit = (data: { content: string }) => {
    const formData: MessageFormData = {
      chat: chat._id,
      sender: user!._id,
      senderRole: user!.role,
      content: data.content,
      isRead: false,
    };

    mutate(formData);
  };

  return (
    <div className="flex-1 border border-gray-200 rounded-md h-[560px] flex flex-col bg-white">
      {/* HEADER */}
      <header className="border-b border-gray-200 w-full py-4 flex items-center justify-between px-4 bg-white">
        <div className="px-4 flex items-center gap-3">
          <img
            src={otherUser.image}
            alt="profile user"
            className="w-10 h-10 rounded-full object-cover"
          />
          <div>
            <legend className="font-montserrat font-bold">
              {otherUser.name} {otherUser.last_name}
            </legend>
            <span className="text-sm text-gray-500">Active now</span>
          </div>
        </div>

        <ul className="flex items-center gap-2">
          <li className="cursor-pointer p-2 bg-gray-100 hover:bg-gray-200 rounded-full">
            <Video className="w-5 h-5 text-gray-500" />
          </li>
          <li className="cursor-pointer p-2 bg-gray-100 hover:bg-gray-200 rounded-full">
            <Phone className="w-5 h-5 text-gray-500" />
          </li>
          <li
            className="cursor-pointer p-2 bg-gray-100 hover:bg-gray-200 rounded-full"
            onClick={onClose}
          >
            <X className="w-5 h-5 text-gray-500" />
          </li>
        </ul>
      </header>

      {/* MESSAGES */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50/30">
        {messages?.length === 0 && (
          <p className="text-center text-xs text-gray-400 uppercase tracking-widest py-4">
            Chat started
          </p>
        )}

        {messages?.map((msg) => {
          const senderUser = msg.sender;
          const isMe = msg.senderRole === user?.role;

          return (
            <div
              key={msg._id}
              className={`flex items-end gap-2 ${
                isMe ? "justify-end" : "justify-start"
              }`}
            >
              {!isMe && (
                <img
                  src={senderUser.image}
                  alt="sender avatar"
                  className="w-8 h-8 rounded-full object-cover"
                />
              )}

              <div
                className={`max-w-[70%] px-4 py-2 rounded-2xl text-sm break-words ${
                  isMe
                    ? "bg-blue-900 text-white rounded-br-none"
                    : "bg-white text-gray-700 border border-gray-200 rounded-bl-none"
                }`}
              >
                {msg.content}
              </div>

              {isMe && user?.image && (
                <img
                  src={user.image}
                  alt="my avatar"
                  className="w-8 h-8 rounded-full object-cover"
                />
              )}
            </div>
          );
        })}
      </div>

      {/* INPUT */}
      <footer className="p-4 border-t border-gray-100">
        <form
          className="w-full max-w-3xl mx-auto"
          onSubmit={handleSubmit(onSubmit)}
          noValidate
        >
          <div className="relative flex items-center bg-white rounded-xl border border-gray-200 shadow-sm px-4 py-2">
            <ChatForm register={register} errors={errors} />
            <div className="flex items-center gap-3 ml-2">
              <Smile className="w-5 h-5 text-gray-400" />
              <Paperclip className="w-5 h-5 text-gray-400" />
              <button
                type="submit"
                className="flex items-center gap-2 bg-blue-900 text-white px-4 py-2 rounded-lg"
              >
                Send
                <SendHorizonal className="w-4 h-4" />
              </button>
            </div>
          </div>
        </form>
      </footer>
    </div>
  );
}

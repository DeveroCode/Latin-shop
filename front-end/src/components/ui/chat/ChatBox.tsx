import { sendMessage } from "@/api/ChatAndMessageAPI";
import ChatForm from "@/components/forms/ChatForm";
import { useUser } from "@/hooks/user";
import type { Chat, MessageFormData } from "@/types/index";
import { useMutation } from "@tanstack/react-query";
import { Paperclip, Phone, SendHorizonal, Smile, Video, X } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

type ChatBoxProps = {
  chat: Chat;
  onClose: () => void;
};

export default function ChatBox({ onClose, chat }: ChatBoxProps) {
  const { data: user } = useUser();

  const otherUser = user?.role === "buyer" ? chat.seller : chat.buyer;
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
    onSuccess: (data) => {
      toast.success(data);
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
      <header className="border-b border-gray-200 w-full py-4 flex items-center justify-between px-4 bg-white">
        <div className="px-4 flex items-center gap-3">
          <img
            src={`${otherUser.image}`}
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
          <li className="cursor-pointer p-2 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors">
            <Video className="w-5 h-5 text-gray-500" />
          </li>
          <li className="cursor-pointer p-2 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors">
            <Phone className="w-5 h-5 text-gray-500" />
          </li>
          <li
            className="cursor-pointer p-2 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors"
            onClick={onClose}
          >
            <X className="w-5 h-5 text-gray-500" />
          </li>
        </ul>
      </header>

      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50/30">
        <p className="text-center text-xs text-gray-400 uppercase tracking-widest py-4">
          Chat started
        </p>
      </div>

      <footer className="p-4 border-t border-gray-100">
        <form
          className="w-full max-w-3xl mx-auto"
          onSubmit={handleSubmit(onSubmit)}
          noValidate
        >
          <div className="relative flex items-center bg-white rounded-xl border border-gray-200 shadow-sm px-4 py-2 focus-within:border-blue-300 transition-all">
            <ChatForm register={register} errors={errors} />
            <div className="flex items-center gap-3 ml-2">
              <button
                type="button"
                className="text-gray-400 hover:text-gray-600 cursor-pointer"
              >
                <Smile className="w-5 h-5" />
              </button>
              <button
                type="button"
                className="text-gray-400 hover:text-gray-600 cursor-pointer"
              >
                <Paperclip className="w-5 h-5" />
              </button>
              <button
                type="submit"
                className="flex items-center gap-2 bg-blue-900 hover:bg-blue-800 text-white cursor-pointer px-4 py-2 rounded-lg font-medium text-sm transition-all shadow-sm active:scale-95"
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

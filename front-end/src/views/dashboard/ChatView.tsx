import Title from "@/components/ui/Title";
import Subtitle from "@/components/ui/Subtitle";
import { MessageCircle } from "lucide-react";
import { useUser } from "@/hooks/user";
import AllChat from "@/components/ui/chat/AllChat";
import ChatBox from "@/components/ui/chat/ChatBox";
import { useState } from "react";

export default function ChatView() {
  const [isEenabledChat, setIsEenabledChat] = useState(false);
  const { data: user } = useUser();
  return (
    <>
      <section className="flex flex-col pt-7">
        <div className="flex items-center justify-between">
          <span className="text-blue-900 font-bold capitalize flex items-center gap-2">
            {" "}
            <MessageCircle className="w-5 h-5" /> /{" "}
            {user?.role === "buyer" ? "Buyer" : "Seller"} list
          </span>
        </div>
        <Title>{user?.role === "buyer" ? "Buyer" : "Seller"} Chat</Title>
        <Subtitle>
          Here you can find all of your{" "}
          {user?.role === "buyer" ? "Buyer" : "Seller"} Chats
        </Subtitle>
      </section>

      {/* Start section Chat */}
      <section className="flex justify-between gap-5">
        <div className="border border-gray-200 p-4 rounded-md w-82 mt-5">
          <legend className="text-lg font-montserrat capitalize flex items-center gap-2">
            All messages{" "}
            <p className="py-2 px-3 rounded-full bg-gray-200 text-xs">232</p>
          </legend>

          <AllChat setIsEenabledChat={setIsEenabledChat} />
        </div>
        {isEenabledChat ? (
          <ChatBox setIsEenabledChat={setIsEenabledChat} />
        ) : (
          <div className="flex-1 h-[560px] flex flex-col items-center justify-center gap-4">
            <MessageCircle className="w-16 h-16 text-gray-400" />
            <Title>No chat selected</Title>
            <Subtitle>Select a chat to start messaging</Subtitle>
          </div>
        )}
      </section>
    </>
  );
}

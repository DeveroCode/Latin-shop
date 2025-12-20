import { useUser } from "@/hooks/user";
import type { Chat } from "@/types/index";
import { shortHoursAndMinutes } from "@/utils/index";
import type { Dispatch, SetStateAction } from "react";

type AllChatProps = {
  setIsEenabledChat: Dispatch<SetStateAction<boolean>>;
  chat: Chat;
};

export default function AllChat({ setIsEenabledChat, chat }: AllChatProps) {
  const {data: user} = useUser();
  return (
    <div className="border-b border-gray-200 last-of-type:border-0 pb-4 cursor-pointer flex items-center gap-3 w-full" onClick={() => setIsEenabledChat(true)}>
      <div className="mt-5 flex items-center gap-3">
        <img
          src={`${user?.role === "buyer" ? chat.seller.image : chat.buyer.image}`}
          alt="profile user"
          className="w-10 h-10 rounded-full object-cover"
        />

        <div>
           <div className="flex justify-between items-center w-full gap-3">
             <p className="text-md font-montserrat">{user?.role === "buyer" ? `${chat.seller.name} ${chat.seller.last_name}` : `${chat.buyer.name} ${chat.buyer.last_name}`}</p>
             <span className="text-xs text-gray-500">{shortHoursAndMinutes(chat.lastMessageAt)}</span>
           </div>
            <span className="capitalize text-sm text-gray-500">{chat.lastMessage}</span>
        </div>
      </div>
    </div>
  );
}

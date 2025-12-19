import { Phone, Video, X } from "lucide-react";

type ChatBoxProps = {
  setIsEenabledChat: (value: boolean) => void;
};

export default function ChatBox({ setIsEenabledChat }: ChatBoxProps) {
  return (
    <div className="flex-1 border border-gray-200 rounded-md h-[560px] overflow-y-scroll">
            <header className="border-b border-gray-200 w-full py-4 flex items-center justify-between px-4">
                <div className="px-4 flex items-center gap-3">
                    <img src="/profile.jpg" alt="profile user" className="w-10 h-10 rounded-full object-cover" />

                    <div>
                        <legend className="font-montserrat">Karla Herrera</legend>
                        <span className="text-sm text-gray-500">Active 1h ago</span>
                    </div>
                </div>

                {/* Icons */}
                <ul className="flex items-center gap-2">
                    <li className="cursor-pointer p-2 bg-gray-200 rounded-full">
                        <Video className="w-5 h-5 text-gray-500" />
                    </li>
                    <li className="cursor-pointer p-2 bg-gray-200 rounded-full">
                        <Phone className="w-5 h-5 text-gray-500" />
                    </li>
                    <li className="cursor-pointer p-2 bg-gray-200 rounded-full" onClick={() => setIsEenabledChat(false)}>
                        <X className="w-5 h-5 text-gray-500" />
                    </li>
                </ul>
            </header>
        </div>
  )
}

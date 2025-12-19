type AllChatProps = {
  setIsEenabledChat: (value: boolean) => void;
};

export default function AllChat({ setIsEenabledChat }: AllChatProps) {
  return (
    <div className="border-b border-gray-200 last-of-type:border-0 pb-4 cursor-pointer flex items-center gap-3 w-full" onClick={() => setIsEenabledChat(true)}>
      <div className="mt-5 flex items-center gap-3">
        <img
          src="/profile.jpg"
          alt="profile user"
          className="w-10 h-10 rounded-full object-cover"
        />

        <div>
           <div className="flex justify-between items-center w-full gap-3">
             <p className="text-lg font-montserrat">Karla Herrera</p>
             <span className="text-xs text-gray-500">12:00 am</span>
           </div>
            <span className="capitalize text-sm text-gray-500">i will send the documentation</span>
        </div>
      </div>
    </div>
  );
}

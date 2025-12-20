import type { FieldErrors, UseFormRegister } from "react-hook-form";

type ChatFormProps = {
  register: UseFormRegister<{ content: string }>;
  errors: FieldErrors<{ content: string }>;
};

export default function ChatForm({ register, errors }: ChatFormProps) {
  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const target = e.target;
    target.style.height = "auto";
    target.style.height = `${Math.min(target.scrollHeight, 120)}px`;
  };

  return (
    <div className="flex-1 flex flex-col">
      <textarea
        {...register("content", { required: "The message field is required" })}
        rows={1}
        onInput={handleInput}
        className="bg-transparent outline-none text-gray-600 placeholder:text-gray-400 text-sm py-2 flex-1 resize-none scrollbar-hide"
        placeholder="Type here"
        style={{ minHeight: "38px" }}
      />
      {errors.content && (
        <span className="text-[10px] text-red-500 absolute -top-5 left-2">
          {errors.content.message}
        </span>
      )}
    </div>
  );
}
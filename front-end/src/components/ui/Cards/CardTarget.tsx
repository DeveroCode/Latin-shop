import { selectedDefaultTarget } from "@/api/AuthAPI";
import type { Card } from "@/types/index";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

type CardTargetProps = {
  target: Card[number];
};
export default function CardTarget({ target }: CardTargetProps) {
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: selectedDefaultTarget,
    onSuccess: (data) => {
      toast.success(data);
      queryClient.invalidateQueries({ queryKey: ["cards"] });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const handleSelectedTarget = (cardId: Card[number]["_id"]) => mutate(cardId);

  return (
    <div
      className={`${
        target.default ? "border-blue-900" : " border-gray-300"
      } border bg-white rounded-md p-2 cursor-pointer`}
      onClick={() => handleSelectedTarget(target._id)}
    >
      <div className="flex justify-between items-center py-1">
        <p className="capitalize text-xs font-montserrat">
          {target.type_target}
        </p>

        {target.default && (
          <div className="w-2 h-2 rounded-full bg-blue-900"></div>
        )}
      </div>

      <span className="text-gray-800 font-semibold">
        **** **** **** {target.lastNumbers}
      </span>

      <div className="flex justify-between">
        <span className="text-xs">{target.cvv}</span>
        <span className="text-xs">{target.expirationDate}</span>
      </div>
    </div>
  );
}

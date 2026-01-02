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
      toast.success(data)
      queryClient.invalidateQueries({ queryKey: ["cards"] });
    },
    onError: (error) => {
      toast.error(error.message);
    }
  });

  return (
    <div
      onClick={() => mutate(target._id)}
      className={`w-44 p-3 rounded-lg border cursor-pointer transition
        ${target.default ? "border-blue-900 bg-white" : "border-gray-200 bg-gray-50"}
      `}
    >
      <div className="flex justify-between items-center mb-2">
        <span className="text-xs text-gray-500 uppercase">
          {target.type_target}
        </span>
        {target.default && (
          <span className="w-2 h-2 rounded-full bg-blue-900"></span>
        )}
      </div>

      <p className="font-semibold text-sm text-gray-800 tracking-wider">
        **** **** **** {target.lastNumbers}
      </p>

      <p className="text-xs text-gray-400 mt-1">
        EXP {target.expirationDate}
      </p>
    </div>
  );
}


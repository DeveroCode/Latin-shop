import { enabledProduct } from "@/api/ProductsAPI";
import type { Product } from "@/types/index";
import * as Switch from "@radix-ui/react-switch";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

type ToggleProps = {
  isEnabled: boolean;
  id: Product[number]["_id"];
};

export default function Toggle({ id, isEnabled }: ToggleProps) {
  const [checked, setChecked] = useState(isEnabled);
  const queryClient = useQueryClient();

  useEffect(() => {
    setChecked(isEnabled);
  }, [isEnabled]);

  const { mutate } = useMutation({
    mutationFn: enabledProduct,
    onSuccess: (data) => {
      toast.success(data);
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
    onError: () => {
      toast.error("Error updating product");
      setChecked(prev => !prev);
    },
  });

  const handleEnabled = (value: boolean) => {
    const formData = {
      enabled: value,
    };

    mutate({ productId: id, formData });
  };

  return (
    <Switch.Root
      checked={checked}
      onCheckedChange={(value) => {
        setChecked(value);
        handleEnabled(value);
      }}
      className="relative inline-flex h-6 w-11 items-center rounded-full
        bg-gray-300 data-[state=checked]:bg-blue-900 transition-colors"
    >
      <Switch.Thumb
        className="block h-5 w-5 rounded-full bg-white
          translate-x-1 data-[state=checked]:translate-x-5 transition-transform"
      />
    </Switch.Root>
  );
}

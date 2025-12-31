import { TriangleAlert } from "lucide-react";
import Subtitle from "@/components/ui/text/Subtitle";
import Title from "@/components/ui/text/Title";
import { useMutation } from "@tanstack/react-query";
import { deleteAccount } from "@/api/AuthAPI";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function DeleteAccountView() {
  const navigate = useNavigate();
  const { mutate } = useMutation({
    mutationFn: deleteAccount,
    onSuccess: (data) => {
      toast.success(data);
      navigate("/auth/login");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const handleClickDelete = () => mutate();

  return (
    <div>
      <section>
        <Title>Delete Account</Title>
        <Subtitle>Are you sure you want to delete your account?</Subtitle>
      </section>

      <div className="bg-orange-100 p-5 rounded-md mt-3">
        <h2 className="flex items-center gap-2 text-orange-800 font-bold">
          <TriangleAlert className="w-4 h-4" /> Warning
        </h2>
        <span className="block mt-2 text-orange-700 text-xs">
          Deleting your Latin-Shop account will permanently remove all your
          personal data from our systems. However, anonymized purchase and sales
          statistics may still be used to help DeveroCode improve product
          recommendations and overall service quality.
        </span>
      </div>

      <button onClick={handleClickDelete} className="bg-red-600 text-white px-4 py-2 rounded-md mt-10 cursor-pointer">
        Delete
      </button>
    </div>
  );
}

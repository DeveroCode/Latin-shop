import { updateUser } from "@/api/AuthAPI";
import UpdateProfileForm from "@/components/forms/UpdateProfileForm";
import PrimaryButtons from "@/components/ui/PrimaryButtons";
import Subtitle from "@/components/ui/Subtitle";
import Title from "@/components/ui/Title";
import { useUser } from "@/hooks/user";
import type { UserUpdateForm } from "@/types/index";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
export default function ProfileView() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { data: user } = useUser();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UserUpdateForm>();

  useEffect(() => {
    if (user) {
      reset({
        name: user.name,
        email: user.email,
        last_name: user.last_name,
        role: user.role,
        phone_number: user.phone_number,
        address: user.address,
        cp: user.cp,
        city: user.city,
        country: user.country,
      });
    }
  }, [user, reset]);

  const { mutate } = useMutation({
    mutationFn: updateUser,
    onSuccess: (data) => {
      toast.success(data);
      queryClient.invalidateQueries({ queryKey: ["user"] });
      navigate("/dashboard/settings/general");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const handleUpdateUser = (formData: UserUpdateForm) => mutate(formData);

  return (
    <form
      noValidate
      onSubmit={handleSubmit(handleUpdateUser)}
      className="px-7 py-3 w-[80%]"
    >
      <div className="flex justify-between items-center">
        <div>
          <Title>Your Profile</Title>
          <Subtitle>Update Your Profile Information</Subtitle>
        </div>

        <PrimaryButtons>Update</PrimaryButtons>
      </div>

      <UpdateProfileForm register={register} errors={errors} />
    </form>
  );
}

import RegisterForm from "@/components/forms/RegisterForm";
import { register as registerUser } from "@/api/AuthAPI";
import type { userRegisterForm } from "@/types/index";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function RegisterView() {
  const navigate = useNavigate();
  const intialValues: userRegisterForm = {
    name: "",
    email: "",
    password: "",
    role: "seller",
    password_confirm: "",
  };
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<userRegisterForm>({
    defaultValues: intialValues,
  });

  const { mutate } = useMutation({
    mutationFn: registerUser,
    onSuccess: (data) => {
      toast.success(data);
      navigate("/auth/login");
      reset();
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const handleRegister = (formData: userRegisterForm) => mutate(formData);

  return (
    <div className="py-8 px-12 max-w-xl mx-auto text-center flex flex-col">
      <h1 className="text-3xl text-gray-800">
        Create a new account and start with great discounts
      </h1>

      <section className="mt-8 bg-white rounded-md shadow-sm px-8 py-6 border border-gray-200">
        <form
          noValidate
          onSubmit={handleSubmit(handleRegister)}
          className="space-y-6 mb-6"
        >
          <RegisterForm register={register} errors={errors} />

          <button className="w-full bg-blue-900 text-white py-2 rounded-md cursor-pointer font-medium">
            Continue
          </button>
        </form>

        <div className="flex items-center my-6">
          <div className="flex-grow h-px bg-gray-300"></div>
          <span className="px-3 text-gray-500 text-sm font-medium">or</span>
          <div className="flex-grow h-px bg-gray-300"></div>
        </div>

        <Link
          to="/auth/login"
          className="text-blue-600 hover:underline block font-medium"
        >
          I have an account
        </Link>
      </section>
    </div>
  );
}

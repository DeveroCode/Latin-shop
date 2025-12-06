import { login } from "@/api/AuthAPI";
import LoginForm from "@/components/forms/LoginForm";
import type { userLoginForm } from "@/types/index";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function LoginView() {
  const navigate = useNavigate();
  const initialValues: userLoginForm = {
    email: "",
    password: "",
  };
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<userLoginForm>({
    defaultValues: initialValues,
  });

  const { mutate } = useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      toast.success(data);
      navigate("/dashboard");
      reset();
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const handleLogin = (formData: userLoginForm) => mutate(formData);

  return (
    <div className="flex flex-col lg:flex-row items-center justify-between w-full mx-auto mt-10 max-w-6xl gap-10 px-4">
      {/* Texto lateral */}
      <section className="flex-1 flex flex-col gap-5 text-center lg:text-left">
        <h1 className="text-2xl sm:text-3xl font-semibold text-gray-800">
          Enter your email address to start in your account.
        </h1>
        <p className="text-gray-600 text-base leading-relaxed">
          Access your dashboard, manage your products and explore new
          opportunities with ease.
        </p>
        <Link
          to="/auth/register"
          className="text-blue-900 font-medium hover:underline mt-2 w-40"
        >
          Create an account
        </Link>
      </section>

      {/* Card del login */}
      <section className="flex-1 border border-gray-200 rounded-xl shadow-sm bg-white p-6 sm:p-8 w-full max-w-md mx-auto">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Login</h2>
        <form noValidate onSubmit={handleSubmit(handleLogin)} className="flex flex-col gap-4">
          <LoginForm register={register} errors={errors} />

          <button
            type="submit"
            className="mt-4 w-full bg-blue-900 text-white py-2 rounded-md cursor-pointer hover:bg-blue-800 transition"
          >
            Sign in
          </button>
        </form>
      </section>
    </div>
  );
}

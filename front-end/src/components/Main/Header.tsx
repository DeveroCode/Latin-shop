import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { Search, Heart, User, ShoppingBag } from "lucide-react";
import { useForm } from "react-hook-form";
import Logo from "../ui/Logo";
import { toast } from "react-toastify";
import { useUser } from "@/hooks/user";
import { useShoppingStore } from "@/stores/shopping";
import { useQuery } from "@tanstack/react-query";
import type { Product } from "@/types/index";

export default function Header() {
  const { cart } = useShoppingStore();
  const navigate = useNavigate();
  const location = useLocation();
  const { word: currentWord } = useParams();
  const initialValues = { word: currentWord || "" };
  const { data: user } = useUser();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: initialValues,
  });

  if (errors.word) {
    toast.error(errors.word.message);
  }

  const { data: favorites } = useQuery<Product[]>({
    queryKey: ["favorites"],
    enabled: !!user,
  });

  const handleSendToSearch = ({ word }: { word: string }) => {
    if (word === currentWord) return;
    navigate(`/search/${word}`);

    if (location.pathname === "/") {
      word = "";
    }
  };

  return (
    <div className="border-b border-gray-300 py-1 px-32 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <Logo />
        <Link
          to="/"
          className="font-bold text-xl font-montserrat text-gray-800"
        >
          Latin-Shop
        </Link>
      </div>

      <form
        noValidate
        className="relative w-full max-w-md"
        onSubmit={handleSubmit(handleSendToSearch)}
      >
        <input
          type="search"
          id="word"
          placeholder="Search products, brands and more..."
          className="w-full bg-gray-50 border border-gray-300 py-2.5 pl-4 pr-14 rounded-full text-gray-800 placeholder:text-gray-400 shadow-sm
                     focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition duration-200"
          {...register("word", {
            required: "This field is required",
            maxLength: { value: 50, message: "Max length is 50 characters" },
            minLength: { value: 3, message: "Min length is 3 characters" },
            pattern: {
              value: /^[a-zA-Z0-9\s]+$/,
              message: "Only letters and numbers are allowed",
            },
          })}
        />

        <button
          type="submit"
          className="absolute right-1 top-1/2 -translate-y-1/2 bg-blue-900 hover:bg-blue-800 text-white rounded-full p-2.5 flex items-center justify-center transition-colors duration-200"
          aria-label="Buscar"
        >
          <Search size={18} strokeWidth={2.5} />
        </button>
      </form>

      <div id="actions" className="flex items-center justify-between gap-5">
        <Link
          to="/shop/favorites"
          className="relative text-gray-600 hover:text-gray-800 transition-colors duration-200"
        >
          <Heart size={22} strokeWidth={2.5} />

          {favorites && favorites.length > 0 && (
            <span
              className="
        absolute -top-2 -right-2
        bg-blue-900 text-white
        text-[10px] font-bold
        w-5 h-5
        flex items-center justify-center
        rounded-full
      "
            >
              {favorites.length}
            </span>
          )}
        </Link>

        <Link
          to="/shop/my-cart"
          className="relative text-gray-600 hover:text-gray-800 transition-colors duration-200"
        >
          <ShoppingBag size={22} strokeWidth={2.5} />

          {cart.length > 0 && (
            <span
              className="
        absolute -top-2 -right-2
        bg-blue-900 text-white
        text-[10px] font-bold
        w-5 h-5
        flex items-center justify-center
        rounded-full
      "
            >
              {cart.length}
            </span>
          )}
        </Link>

        <div className="flex items-center gap-2">
          <User size={22} strokeWidth={2.5} />
          <div className="flex flex-col">
            <Link to="/auth/login" className="text-xs text-gray-600">
              User
            </Link>
            {user ? (
              <Link to="/dashboard" className="font-semibold capitalize">
                {user?.name} {user?.last_name}
              </Link>
            ) : (
              <span className="font-semibold capitalize">
                Login or Register
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

import { useUser } from "@/hooks/user";
import type { Card } from "@/types/index";

type PrimaryCardProps = {
  card: Card[number];
};

export default function PrimaryCardPreview({ card }: PrimaryCardProps) {
    const {data: user} = useUser();
  return (
    <div className="w-full max-w-xs">
      <div className="relative bg-gradient-to-br from-blue-900 to-blue-700 text-white rounded-xl p-5 h-44 shadow-lg">
        <span className="absolute top-3 left-3 text-xs bg-white text-blue-900 px-2 py-0.5 rounded">
          PRIMARY
        </span>

        <div className="mt-10">
          <p className="tracking-widest text-sm">
            **** **** **** {card.lastNumbers}
          </p>

          <div className="flex justify-between items-center mt-6 text-xs">
            <span>{user?.name} {user?.last_name}</span>
            <span>EXP {card.expirationDate}</span>
          </div>
        </div>
      </div>

      <div className="flex justify-between mt-4 text-sm">
        <button className="text-blue-900 underline cursor-pointer">
          Set as Primary
        </button>
        <button className="text-gray-500 hover:text-red-500 cursor-pointer">
          Edit / Delete
        </button>
      </div>
    </div>
  );
}

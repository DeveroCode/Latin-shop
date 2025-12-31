import { getCards } from "@/api/AuthAPI";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import CardTarget from "@/components/ui/Cards/CardTarget";
import AddNewCreditCardModal from "@/components/ui/modals/AddNewCreditCardModal";
import Subtitle from "@/components/ui/text/Subtitle";
import Title from "@/components/ui/text/Title";

export default function CreditAccountView() {
  const [isEnable, setIsEnable] = useState(false);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["cards"],
    queryFn: getCards,
    refetchOnWindowFocus: false,
    retry: false,
    staleTime: 0,
    gcTime: 3 * 60 * 1000,
  });

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error</div>;

  const hasCards = data && data.length > 0;

  return (
    <div className="w-full">
      <section>
        <Title>Credit Account</Title>
        <Subtitle>Manage your account credit settings here.</Subtitle>
      </section>

      {!hasCards && (
        <section className="flex flex-col justify-center items-center py-10">
          <p className="text-center text-gray-500">
            It appears that you haven't added any payment method yet
          </p>

          <img
            src="/error-oops.svg"
            alt="error oops image"
            className="w-1/5 mx-auto"
          />

          <button
            className="py-3 mt-2 underline text-gray-400 hover:text-gray-800 transition-colors duration-300 font-semibold cursor-pointer"
            onClick={() => setIsEnable(true)}
          >
            Add New Credit Card
          </button>
        </section>
      )}

      {hasCards && (
        <section>
          <h3 className="text-xs font-monoserrat mt-2 font-semibold text-gray-700 capitalize">
            Select a card for default payments
          </h3>

          <div className="flex gap-3 py-5 flex-wrap">
            {data.map((target) => (
              <CardTarget key={target._id} target={target} />
            ))}
          </div>

          <button
            className="py-3 mt-2 underline text-gray-400 hover:text-gray-800 transition-colors duration-300 font-semibold cursor-pointer"
            onClick={() => setIsEnable(true)}
          >
            Add New Credit Card
          </button>
        </section>
      )}

      {isEnable && (
        <AddNewCreditCardModal
          isEnable={isEnable}
          setIsEnable={setIsEnable}
        />
      )}
    </div>
  );
}

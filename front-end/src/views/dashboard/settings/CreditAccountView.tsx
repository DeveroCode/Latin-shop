import CardTarget from "@/components/ui/Cards/CardTarget";
import PrimaryCardPreview from "@/components/ui/Cards/PrimaryCardPreview";
import AddNewCreditCardModal from "@/components/ui/modals/AddNewCreditCardModal";
import Title from "@/components/ui/text/Title";
import Subtitle from "@/components/ui/text/Subtitle";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getCards } from "@/api/AuthAPI";

export default function CreditAccountView() {
  const [isEnable, setIsEnable] = useState(false);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["cards"],
    queryFn: getCards,
    refetchOnWindowFocus: false,
    retry: false,
  });

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error</div>;

  const hasCards = data && data.length > 0;
  const primaryCard = data?.find(card => card.default);

  return (
    <div className="w-full grid grid-cols-12 gap-8">
      <div className="col-span-8">
        <section className="mb-6">
          <Title>Credit Account</Title>
          <Subtitle>Manage your account credit settings here.</Subtitle>
        </section>

        {!hasCards && (
          <section className="flex flex-col items-center py-16">
            <p className="text-gray-500 text-sm mb-4">
              You haven’t added any payment methods yet.
            </p>

            <button
              className="text-sm font-semibold text-blue-900 underline"
              onClick={() => setIsEnable(true)}
            >
              + Add New Payment Method
            </button>
          </section>
        )}

        {hasCards && (
          <>
            <h3 className="text-sm font-semibold text-gray-700 mb-4">
              Your Registered Payment Methods
            </h3>

            <div className="flex gap-4 flex-wrap mb-4">
              {data.map((target) => (
                <CardTarget key={target._id} target={target} />
              ))}
            </div>

            <div className="flex items-center gap-4 text-sm">
              <button
                className="px-4 py-2 bg-blue-900 text-white rounded-md cursor-pointer"
                onClick={() => setIsEnable(true)}
              >
                + Add New Payment Method
              </button>

              <button className="text-blue-900 underline cursor-pointer">
                View All Transactions
              </button>
            </div>

            <p className="text-xs text-gray-400 mt-4">
              We never store your full card number or CVV.
            </p>
          </>
        )}
      </div>

      {/* RIGHT COLUMN */}
      <div className="col-span-4 flex justify-center">
        {primaryCard && <PrimaryCardPreview card={primaryCard} />}
      </div>

      {isEnable && (
        <AddNewCreditCardModal isEnable={isEnable} setIsEnable={setIsEnable} />
      )}
    </div>
  );
}

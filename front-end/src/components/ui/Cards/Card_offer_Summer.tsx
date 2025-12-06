import PrimaryButtons from "../PrimaryButtons";

export default function Card_offer_women() {
  return (
    <div className="bg-orange-200/40 rounded-2xl h-[250px] p-8 flex items-center justify-between overflow-hidden">
      <div className="max-w-sm space-y-3">
        <span className="text-gray-500 text-sm font-semibold uppercase tracking-wide">
          Women's Fashion
        </span>

        <p className="text-3xl font-montserrat font-bold text-gray-900 leading-tight">
          Best Furniture Collection
        </p>

        <div className="pt-4">
          <PrimaryButtons>Shop Now</PrimaryButtons>
        </div>
      </div>

      <img
        src="/images/women_elegant.png"
        alt="Furniture example"
        className="w-56 h-auto object-contain drop-shadow-md"
        loading="lazy"
      />
    </div>
  );
}

import PrimaryButtons from "../PrimaryButtons";

export default function Card_offer_men() {
  return (
    <div className="bg-blue-100/70 rounded-2xl h-[250px] p-8 flex items-center justify-between overflow-hidden">
      <div className="max-w-sm space-y-3">
        <span className="text-gray-500 text-sm font-semibold uppercase tracking-wide">
          Super Sale 50%
        </span>

        <p className="text-3xl font-montserrat font-bold text-gray-900 leading-tight">
          Stylish Men's Fashion
        </p>

        <div className="pt-4">
          <PrimaryButtons>Shop Now</PrimaryButtons>
        </div>
      </div>

      <img
        src="/images/men_hero.png"
        alt="Men's fashion"
        className="w-52 h-auto object-contain drop-shadow-md"
        loading="lazy"
      />
    </div>
  );
}

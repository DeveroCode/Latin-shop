import PrimaryButtons from "../PrimaryButtons";

export default function Card_offer_season() {
  return (
    <div className="bg-blue-100/70 rounded-2xl p-6 sm:p-8 md:p-10 flex flex-col md:flex-row items-center justify-between gap-6 overflow-hidden h-[500px] md:h-[350px]">
      <div className="max-w-md space-y-3 text-center md:text-left">
        <span className="rounded-full bg-white text-gray-700 text-xs sm:text-sm font-semibold py-1 px-3 sm:px-4 inline-block shadow-sm">
          50% off on all products
        </span>

        <h2 className="text-2xl sm:text-3xl md:text-4xl font-montserrat font-bold text-gray-900 leading-tight">
          Best Deals On Winter Season
        </h2>

        <p className="text-gray-600 text-sm sm:text-base">
          Jackets, sweaters, slippers, gloves — all in harmony for a better style.
        </p>

        <div className="pt-3 flex justify-center md:justify-start">
          <PrimaryButtons>Shop Now</PrimaryButtons>
        </div>
      </div>

      <img
        src="/images/main_hero.png"
        alt="example image"
        className="w-40 sm:w-52 md:w-64 h-auto object-contain drop-shadow-xl"
        loading="lazy"
      />
    </div>
  );
}

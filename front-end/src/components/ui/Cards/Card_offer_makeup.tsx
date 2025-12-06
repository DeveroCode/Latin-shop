export default function Card_offer_makeup() {
  return (
    <div className="bg-rose-50 rounded-2xl px-10 py-12 flex flex-col justify-between items-center text-center h-[625px] overflow-hidden">
      <div className="space-y-3">
        <legend className="uppercase tracking-wide text-gray-600 text-sm font-semibold">
          Super Sale <span className="text-rose-600 font-bold">60%</span>
        </legend>

        <p className="text-4xl font-montserrat font-extrabold leading-snug text-gray-900">
          Elegant Makeup <br /> Looks for Every Season
        </p>
      </div>

      <img
        src="/images/teen_model.png"
        alt="image example"
        className="w-72 h-auto object-contain drop-shadow-lg"
        loading="lazy"
      />
    </div>
  );
}

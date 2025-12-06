type Most_pupular_catProps = {
  name: string;
};

export default function Most_pupular_cat({ name }: Most_pupular_catProps) {
  return (
    <div
      className="
        relative w-90 h-[500px] rounded-xl overflow-hidden group
        shadow-sm hover:shadow-md transition-all duration-500 cursor-pointer
      "
    >
      <img
        src={`/brands/${name}.jpg`}
        alt={name}
        loading="lazy"
        className="
          absolute inset-0 w-full h-full object-cover rounded-xl
          transition-all duration-500
          group-hover:scale-110 group-hover:brightness-75
        "
      />

      <div
        className="
          absolute inset-0 rounded-xl bg-gradient-to-t from-black/40 via-black/20 to-transparent
          opacity-0 group-hover:opacity-100 transition-opacity duration-500
        "
      />

      <h2
        className="
          absolute inset-0 flex items-center justify-center
          text-white font-montserrat font-extrabold text-4xl capitalize tracking-wide
          opacity-0 group-hover:opacity-100 transition-all duration-500
          translate-y-4 group-hover:translate-y-0
          drop-shadow-lg
        "
      >
        {name}
      </h2>

      <button
        className="
          absolute left-10 bottom-10 bg-white px-6 py-2 rounded-full
          font-montserrat capitalize text-sm font-semibold text-gray-800
          shadow-sm hover:shadow-md hover:bg-gray-100
          transition-all duration-300 z-10
          group-hover:scale-105
          cursor-pointer
        "
      >
        Shop now
      </button>
    </div>
  );
}

import Categories from "@/components/Main/Categories";
import TenProducts from "@/components/Main/TenProducts";
import Footer from "@/components/Main/Footer";
import Most_pupular_cat from "@/components/ui/Cards/Most_pupular_cat";
import MainOffers from "@/components/Main/MainOffers";

export default function IndexMainView() {
  return (
    <>
      <MainOffers/>

      {/* Categories */}
      <section className="py-10 px-4 sm:px-8 md:px-14 lg:px-20 xl:px-32 bg-blue-950">
        <h2 className="text-white font-montserrat text-2xl sm:text-3xl mt-5 text-center sm:text-left">
          Choose Your Category
        </h2>
        <Categories />
      </section>

      {/* Render Products */}
      <section className="py-16 px-4 sm:px-8 md:px-14 lg:px-20 xl:px-32">
        <h3 className="text-xl sm:text-2xl font-semibold font-montserrat text-gray-800 text-center sm:text-left">
          Todays best deals for you!
        </h3>

        <TenProducts />
      </section>

      {/* Brands most popular */}
      <section className="py-10 px-4 sm:px-8 md:px-14 lg:px-20 xl:px-32 flex flex-col sm:flex-row flex-wrap gap-6 sm:gap-8 justify-center sm:justify-between">
        <Most_pupular_cat name="clothes" />
        <Most_pupular_cat name="Joyeria" />
        <Most_pupular_cat name="makeup" />
      </section>

      <section className="py-10 px-4 sm:px-8 md:px-32 lg:px-20 mt-0 md:mt-64 xl:px-32 rounded-md mx-5 md:mx-32 my-10 bg-publish flex flex-col md:flex-row items-center justify-center gap-8 md:gap-10">
        <div className="w-full md:w-1/2 flex justify-center gap-6 sm:gap-8">
          <img
            src="/offers/watch_left.png"
            alt="offer watch example"
            loading="lazy"
            className="w-28 sm:w-36 md:w-40 h-36 sm:h-44 md:h-48 translate-x-6 translate-y-6 rotate-3"
          />
          <img
            src="/offers/watch_back.png"
            alt="offer watch example"
            loading="lazy"
            className="w-28 sm:w-36 md:w-40 h-40 sm:h-52 -rotate-3"
          />
        </div>
        <div className="text-center md:text-left">
          <h3 className="text-3xl sm:text-4xl text-white font-semibold font-montserrat uppercase">
            Black friday deals
          </h3>
          <p className="text-lg sm:text-xl text-white font-montserrat capitalize py-2 -rotate-1">
            Get 50% off on all products
          </p>
          <span className="text-white font-dancing-script text-xl sm:text-2xl block rotate-2">
            November 10 to December 25
          </span>

          <div className="flex justify-center md:justify-start mt-5">
            <button className="py-2 rounded-md text-black font-montserrat bg-white px-4 uppercase cursor-pointer text-sm sm:text-base">
              Shop now
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}

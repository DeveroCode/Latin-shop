import Card_offer_summer from "@/components/ui/Cards/Card_offer_Summer";
import Card_offer_makeup from "@/components/ui/Cards/Card_offer_makeup";
import Card_offer_season from "@/components/ui/Cards/Card_offer_season";
import Card_offer_women from "@/components/ui/Cards/Card_offer_women";

export default function MainOffers() {
  return (
    <>
      <section className="px-4 hidden md:block md:px-14 lg:px-20 xl:px-32 py-10">
        <div
          className="
           grid gap-6
           grid-cols-1
           sm:grid-cols-2
           lg:grid-cols-3
           auto-rows-[minmax(250px,_1fr)]
           max-w-7xl mx-auto
         "
        >
          <div className="sm:col-span-2">
            <Card_offer_season />
          </div>
          <div className="sm:row-span-2">
            <Card_offer_makeup />
          </div>
          <div>
            <Card_offer_women />
          </div>
          <div>
            <Card_offer_summer />
          </div>
        </div>
      </section>

      <section className="md:hidden py-10 px-4 flex flex-col gap-6">
        <h2 className="text-xl capitalize font-montserrat py-3">Take advantage of our seasonal offers</h2>
        <Card_offer_season />
        <Card_offer_summer />
        <Card_offer_makeup />
        <Card_offer_women />
      </section>
    </>
  );
}

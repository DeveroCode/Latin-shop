import type { OrdersPFD } from "@/types/index";
import type { FieldErrors, UseFormRegister } from "react-hook-form";
import AlertLabel from "../ui/AlertLabel";

type form = {
    comments: string;
    references: string;
}

type ShippingGuideFormProps = {
  order: OrdersPFD[];
  errors: FieldErrors<form>;
  register: UseFormRegister<form>;
};

export default function ShippingGuideForm({ order, errors, register }: ShippingGuideFormProps) {
  return (
    <>
      <div className="border-y">
        <span className="p-1 block uppercase text-xs">
          Shipping Guide: {order[0]._id}
        </span>
      </div>

      <div className="flex items-center">
        <img src="/qr.png" alt="code guide" className="w-32" />
        <span>Scan QR code to track your order</span>
      </div>

      <section className="border-y p-2">
        <legend className="font-semibold capitalize">
          destination details
        </legend>

        <fieldset className="space-x-1">
          <label htmlFor="" className="text-xs">
            CP:
          </label>
          <input
            type="text"
            value={order[0]?.user?.cp?.toString()}
            className="text-xs"
          />
        </fieldset>
        <fieldset className="space-x-1">
          <label htmlFor="" className="text-xs">
            City:
          </label>
          <input type="text" value={order[0].user.city} className="text-xs" />
        </fieldset>
        <fieldset className="space-x-1">
          <label htmlFor="" className="text-xs">
            Address:
          </label>
          <input
            type="text"
            value={order[0].user.address}
            className="text-xs w-96"
          />
        </fieldset>
        <fieldset className="space-x-1">
          <label htmlFor="" className="text-xs">
            Phone:
          </label>
          <input
            type="text"
            value={order[0].user.phone_number}
            className="text-xs"
          />
        </fieldset>
      </section>

      <section className="flex justify-between">
        <div className="flex p-2 flex-col border-r w-1/2">
          <label htmlFor="comments">Comments</label>
          <textarea
            id="comments"
            cols={10}
            rows={5}
            className="w-full"
            {...register("comments", { required: "Comments is required" })}
          />
          {errors.comments && <AlertLabel>{errors.comments.message}</AlertLabel>}
        </div>
        <div className="flex p-2 flex-col w-1/2">
          <label htmlFor="references">References</label>
          <textarea
            id="references"
            cols={10}
            rows={5}
            className="w-full"
            {...register("references", { required: "References is required" })}
          />

          {errors.references && <AlertLabel>{errors.references.message}</AlertLabel>}
        </div>
      </section>
    </>
  );
}

import { ordersManyDelete } from "@/api/OrderAPI";
import { useUser } from "@/hooks/user";
import { useOrderStore } from "@/stores/order";
import { donwloadPDF } from "@/utils/downloadPDF";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Download, Trash2, TruckElectric, XCircle } from "lucide-react";
import { useState } from "react";
import { toast } from "react-toastify";
import ShippingGudieModal from "../modals/ShippingGudieModal";

export default function MoreOptionsOrder() {
  const [isOpenGuide, setIsOpenGuide] = useState(false);
  const { data: user } = useUser();
  const queryClient = useQueryClient();
  const selectedIds = useOrderStore((state) => state.selectedIds);
  const order = useOrderStore((state) => state.order);
  const clear = useOrderStore((state) => state.clearOrder);
  const getSelectedOrdersPDF = useOrderStore(
    (state) => state.getSelectedOrdersPDF
  );
  const selectedOrders = order.filter((o) => selectedIds.includes(o._id));

  const handleDownload = async () => {
    const orders = getSelectedOrdersPDF();
    if (!orders.length) return;
    if (!user) return;
    await donwloadPDF(orders, user);
  };

  const { mutate: deleteManyOrders } = useMutation({
    mutationFn: ordersManyDelete,
    onSuccess: (data) => {
      toast.success(data);
      queryClient.invalidateQueries({ queryKey: ["orders"] });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const handleDeleteMany = () => {
    if (!selectedIds.length) return toast.error("No orders selected");
    deleteManyOrders(selectedIds);
  };

  return (
    <>
      <footer className="mx-auto w-2/5 py-2 my-10 px-6 bg-white rounded-full border border-gray-200 shadow-md flex justify-between gap-4">
        <p className="flex gap-2 items-center font-bold">
          {selectedIds.length}
          <span className="font-normal"> selected</span>
        </p>
        <button
          className="flex items-center gap-2 py-1 px-2 border rounded-xl border-gray-200 shadow-md font-bold cursor-pointer"
          onClick={() => setIsOpenGuide(true)}
        >
          <TruckElectric className="w-4 h-4 font-black" /> Guide
        </button>
        <button
          className="flex items-center gap-2 py-1 px-2 border rounded-xl border-gray-200 shadow-md font-bold cursor-pointer"
          onClick={handleDownload}
        >
          <Download className="w-4 h-4 font-black" /> Download
        </button>
        <button
          className="flex items-center gap-2 py-1 px-2 border rounded-xl border-red-200 shadow-md font-bold cursor-pointer text-red-500"
          onClick={() => handleDeleteMany()}
        >
          <Trash2 className="w-4 h-4 font-black text-red-700" /> Delete
        </button>
        <button
          className="flex items-center gap-2 py-1 px-2 font-bold cursor-pointer"
          onClick={() => clear()}
        >
          <XCircle className="w-4 h-4 font-black text-gray-700" />
        </button>
      </footer>

      <ShippingGudieModal isOpen={isOpenGuide} setIsOpen={setIsOpenGuide} order={selectedOrders} />
    </>
  );
}

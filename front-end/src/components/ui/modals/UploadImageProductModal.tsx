import { motion, AnimatePresence } from "framer-motion";
import DropzonePicture from "@/components/dashboard/products/DropzonePicture";
import type { Product } from "@/types/index";

type UploadImageProductModalProps = {
  setImageEnable: (value: null | "delete" | "edit" | "view" | "image") => void;
   isModalOpen: boolean;
   id: Product[number]["_id"]
};

export default function UploadImageProductModal({
  setImageEnable,
  isModalOpen,
  id
}: UploadImageProductModalProps) {
  return (
    <AnimatePresence>
      {isModalOpen && (
      <motion.div
        className="fixed inset-0 bg-black/30 flex items-center justify-center z-50 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={() => setImageEnable(null)}
      >
        <motion.form
          noValidate
          // onSubmit={handleSubmit(handleSubmitForm)}
          onClick={(e) => e.stopPropagation()}
          className="bg-white p-10 w-[90%] max-w-xl rounded-md shadow-md py-5"
          initial={{ y: 50, opacity: 0, scale: 0.95 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          exit={{ y: 50, opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
        >
          <legend className="text-2xl font-bold mb-2 capitalize">
            Set Your images for your Products
          </legend>
          <span className="text-gray-600 mb-6 block">
            Please complete the form below to register your new product and
            start selling.
          </span>

          <DropzonePicture id={id} setImageEnable={setImageEnable} />
        </motion.form>
      </motion.div>
      )}
    </AnimatePresence>
  );
}

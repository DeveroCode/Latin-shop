import { motion, AnimatePresence } from "framer-motion";

type DeleteProductModalProps = {
  isModalOpen: boolean;
  setIsModalOpen: (value: null | "delete" | "edit" | "view") => void;
  handleDeleteProduct: () => void;
};

export default function DeleteProductModal({
  isModalOpen,
  setIsModalOpen,
  handleDeleteProduct,
}: DeleteProductModalProps) {
  return (
    <AnimatePresence>
      {isModalOpen && (
        <motion.div
          className="fixed inset-0 bg-black/30 flex items-center justify-center z-50 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsModalOpen(null)}
        >
          <motion.div
            onClick={(e) => e.stopPropagation()}
            initial={{ y: 50, opacity: 0, scale: 0.95 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 50, opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="bg-white shadow-lg rounded-xl p-5 w-[90%] max-w-sm border border-gray-200 flex flex-col items-center text-center"
          >
            <h2 className="text-lg font-semibold text-gray-800 mb-2">
              Do you want to delete the product?
            </h2>
            <p className="text-gray-500 text-sm mb-4">
              Once you delete the product, you will never be able to recover it again.
            </p>

            <div className="flex gap-3">
              <button
                onClick={() => setIsModalOpen(null)}
                className="px-4 py-2 rounded-md bg-gray-200 hover:bg-gray-300 text-gray-700 transition"
              >
                No
              </button>
              <button
                onClick={() => {
                  handleDeleteProduct();
                  setIsModalOpen(null);
                }}
                className="px-4 py-2 rounded-md bg-red-600 hover:bg-red-700 text-white transition"
              >
                Yes, delete it
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

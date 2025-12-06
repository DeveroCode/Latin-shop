import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { toast } from "react-toastify";
import { X, Upload } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { uploadImagesProduct } from "@/api/ProductsAPI";
import type { Product } from "@/types/index";

interface DropzonePictureProps {
  maxImages?: number;
  minImages?: number;
  id: Product[number]["_id"];
  setImageEnable: (value: null | "delete" | "edit" | "view" | "image") => void
}

export default function DropzonePicture({
  maxImages = 4,
  minImages = 1,
  id,
  setImageEnable
}: DropzonePictureProps) {
  const queryClient = useQueryClient();
  const [previews, setPreviews] = useState<string[]>([]);
  const [files, setFiles] = useState<File[]>([]);

  const { mutate, isPending } = useMutation({
    mutationFn: uploadImagesProduct,
    onSuccess: (data) => {
      toast.success(data || "Images uploaded successfully");
      queryClient.invalidateQueries({ queryKey: ["products"] });
      setImageEnable(null);
      setPreviews([]);
      setFiles([]);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles.length + files.length > maxImages || acceptedFiles.length + files.length < minImages) {
        toast.error(`You can upload a maximum of ${maxImages} images`);
        return;
      }

      const newPreviews = acceptedFiles.map((file) =>
        URL.createObjectURL(file)
      );
      const newFiles = [...files, ...acceptedFiles];

      setPreviews(newPreviews);
      setFiles(newFiles);
    },
    [files, maxImages, minImages]
  );
  const removeImage = (index: number) => {
    const updatedPreviews = previews.filter((_, i) => i !== index);
    const updatedFiles = files.filter((_, i) => i !== index);
    setPreviews(updatedPreviews);
    setFiles(updatedFiles);
  };

  const handleUpload = () => {
    if (files.length === 0) {
      toast.warn("Image not selected");
      return;
    }

    const formData = new FormData();
    files.forEach((file) => formData.append("images", file));
    mutate({ files, id });
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: true,
    maxFiles: maxImages,
    maxSize: 5 * 1024 * 1024,
    onDropRejected: () => {
      toast.error("File size must be less than 5MB");
    },
  });

  return (
    <div>
      {/* Dropzone */}
      <div
        {...getRootProps()}
        className={`border-2 border-dashed p-5 rounded-md cursor-pointer transition-all ${
          isDragActive ? "border-blue-500 bg-blue-50" : "border-gray-300"
        }`}
      >
        <input {...getInputProps()} />
        {isDragActive ? (
          <p className="text-blue-700 text-center">Drop the images here...</p>
        ) : (
          <p className="text-gray-600 text-center">
            Drag & drop product images here, or click to select
          </p>
        )}
        <p className="text-xs text-gray-400 text-center mt-2">
          {files.length}/{maxImages} images selected
        </p>
      </div>

      {/* Previews */}
      {previews.length > 0 && (
        <div className="grid grid-cols-4 gap-3 mt-4">
          {previews.map((src, i) => (
            <div key={i} className="relative group">
              <img
                src={src}
                alt={`preview-${i}`}
                className="w-full h-24 object-cover rounded-md border"
              />
              <button
                type="button"
                onClick={() => removeImage(i)}
                className="absolute top-1 right-1 bg-black/60 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Botón de subir */}
      {files.length > 0 && (
        <div className="flex justify-center mt-4">
          <button
          type="button"
            onClick={handleUpload}
            disabled={isPending}
            className={`flex items-center gap-2 px-4 py-2 rounded-md text-white transition ${
              isPending
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            <Upload className="w-4 h-4" />
            {isPending ? "Uploading..." : "Upload Images"}
          </button>
        </div>
      )}
    </div>
  );
}

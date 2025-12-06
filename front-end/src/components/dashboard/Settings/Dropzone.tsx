import { updateImageProfile } from "@/api/AuthAPI";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
export default function Dropzone() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [preview, setPreview] = useState<string | null>(null);

  const { mutate, isPending } = useMutation({
    mutationFn: updateImageProfile,
    onSuccess: (data) => {
      toast.success(data);
      queryClient.invalidateQueries({ queryKey: ["user"] });
      navigate("/dashboard/settings/general");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    if (acceptedFiles.length === 0) return;
    const file = acceptedFiles[0];
    if (!file) return;

    setPreview(URL.createObjectURL(file));
    mutate(file);
  }, [mutate]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [],
    },
    multiple: false,
  });
  return (
    <div className="w-2xl mx-auto mt-5">
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-2xl p-6 text-center cursor-pointer transition h-32 flex items-center justify-center
          ${isDragActive ? "border-blue-500 bg-blue-50" : "border-gray-300 hover:border-blue-400"}
        `}
      >
        <input {...getInputProps()} name="image" />
        {isPending ? (
          <p className="text-blue-500 animate-pulse">Uploading...</p>
        ) : preview ? (
          <img
            src={preview}
            alt="Preview"
            className="mx-auto h-40 w-40 object-cover rounded-xl shadow-md"
          />
        ) : (
          <p className="text-gray-500">
            {isDragActive ? "Drop your image here..." : "Drag & drop an image or click to upload"}
          </p>
        )}
      </div>
    </div>
  );
}

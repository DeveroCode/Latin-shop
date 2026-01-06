import api from "@/lib/axios";
import type { Category, ProductFormData, ResponseMessage, Product } from "@/types/index";
import { categorySchema, productSchema } from "@/types/index";
import { isAxiosError } from "axios";

export async function getProducts() {
    try {
        const { data } = await api.get<Product[]>('/products');
        const response = productSchema.safeParse(data);
        if (response.success) {
            return response.data;
        }
    } catch (error) {
        if (isAxiosError(error)) {
            throw new Error(error.response?.data.errors);
        }

        return [];
    }
}
export async function getTenProducts() {
    try {
        const { data } = await api.get<Product[]>('/shop/products');
        const response = productSchema.safeParse(data);
        if (response.success) {
            return response.data;
        }
    } catch (error) {
        if (isAxiosError(error)) {
            throw new Error(error.response?.data.errors);
        }

        return [];
    }
}

type ResponseCreateProduct = {
    message: string;
    productId: string;
}

export async function createProduct(formData: ProductFormData) {
    try {
        const { data } = await api.post<ResponseCreateProduct>('/products/create', formData);
        localStorage.setItem('PRODUCT_ID', data.productId);
        return data.message;
    } catch (error) {
        if (isAxiosError(error)) {
            throw new Error(error.response?.data.errors);
        }

        return [];
    }
}
export async function addToFavorites({ productId }: { productId: string }) {
    try {
        const { data } = await api.post<ResponseMessage>(`/products/add-to-favorites/${productId}`);
        return data.message;
    } catch (error) {
        if (isAxiosError(error)) {
            throw new Error(error.response?.data.error);
        }

        return [];
    }
}
export async function getFavorites() {
    try {
        const { data } = await api.get<Product[]>('/products/favorites');
        const response = productSchema.safeParse(data);
        if (response.success) {
            return response.data;
        }
        return [];
    } catch (error) {
        if (isAxiosError(error)) {
            throw new Error(error.response?.data.error);
        }

        return [];
    }
}

type UploadImages = {
    files: File[],
    id: string
}

export async function uploadImagesProduct({ files, id }: UploadImages) {
  const formData = new FormData();
  files.forEach((file) => formData.append("images", file));

  try {
    const { data } = await api.put<ResponseMessage>(
      `/products/upload-images/${id}`,
      formData);
    return data.message;
  } catch (error) {
    if (isAxiosError(error)) {
      throw new Error(error.response?.data?.errors || "Upload failed");
    }
    throw new Error("Unexpected error uploading images");
  }
}


export async function deleteProduct(id: Product[number]["_id"]) {
    try {
        const { data } = await api.delete<ResponseMessage>(`/products/delete/${id}`);
        return data.message;
    } catch (error) {
        if (isAxiosError(error)) {
            throw new Error(error.response?.data.errors);
        }

        return [];
    }
}

export async function getProductById(id: Product[number]["_id"]) {
    try {
        const { data } = await api.get<Product[number]>(`/shop/product/${id}`);
        return data;
    } catch (error) {
        if (isAxiosError(error)) {
            throw new Error(error.response?.data.errors);
        }
        return null;
    }
}

type updateProduct = {
    id: Product[number]["_id"];
    formData: ProductFormData;
}
type enabledProduct = {
    productId: Product[number]["_id"];
    formData: {
        enabled: boolean
    };
}

export async function updateProduct({ id, formData }: updateProduct) {
    try {
        const { data } = await api.put<ResponseMessage>(`/products/update/${id}`, formData);
        return data.message;
    } catch (error) {
        if (isAxiosError(error)) {
            throw new Error(error.response?.data.errors);
        }

        return [];
    }
}
export async function enabledProduct({ productId, formData }: enabledProduct) {
    try {
        const { data } = await api.put<ResponseMessage>(`/products/update/product/${productId}`, formData);
        return data.message;
    } catch (error) {
        if (isAxiosError(error)) {
            throw new Error(error.response?.data.error);
        }

        return [];
    }
}

export async function getCategories() {
    try {
        const { data } = await api.get<Category>('/categories/getAll');
        const response = categorySchema.safeParse(data);
        if (response.success) {
            return response.data;
        }
    } catch (error) {
        if (isAxiosError(error)) {
            throw new Error(error.response?.data.errors);
        }

        return [];
    }
}
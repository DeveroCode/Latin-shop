import api from "@/lib/axios";
import type { ResponseMessage, userLoginForm, userRegisterForm, User, UserUpdateForm, AddCard, Card } from '../types'
import { CardsSchema, userSchema } from "../types";
import { isAxiosError } from "axios";


export async function register(formData: userRegisterForm) {
    try {
        const { data } = await api.post<ResponseMessage>('/auth/register', formData)
        return data.message
    } catch (error) {
        if (isAxiosError(error)) {
            throw new Error(error.response?.data.errors);
        }

        return [];
    }
}

type MessageLogin = {
    message: string,
    token: string
}

export async function login(formData: userLoginForm) {
    try {
        const { data } = await api.post<MessageLogin>('/auth/login', formData)
        localStorage.setItem('AUTH_TOKEN', data.token);
        return data.message
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response?.data.error);
        }
    }
}

export async function getUser() {
    try {
        const { data } = await api<User>('/auth/user');
        const response = userSchema.safeParse(data);
        if (response.success) {
            return response.data;
        }
    } catch (error) {
        if (isAxiosError(error)) {
            throw new Error(error.response?.data.error);
        }
    }
}

export async function updateUser(formData: UserUpdateForm) {
    try {
        const { data } = await api.put<ResponseMessage>('/auth/update', formData);
        return data.message
    } catch (error) {
        if (isAxiosError(error)) {
            throw new Error(error.response?.data.error);
        }
    }
}

export async function updateImageProfile(file: File) {
    const formData = new FormData();
    formData.append('image', file);
    try {
        const { data } = await api.put<ResponseMessage>('/auth/update/image-profile', formData);
        return data.message
    } catch (error) {
        if (isAxiosError(error)) {
            throw new Error(error.response?.data.error);
        }
    }
}

export async function deleteAccount() {
    try {
        const { data } = await api.delete<ResponseMessage>('/auth/delete');
        return data.message
    } catch (error) {
        if (isAxiosError(error)) {
            throw new Error(error.response?.data.error);
        }
    }
}

export async function addNewCard(formData: AddCard) {
    try {
        const { data } = await api.post<ResponseMessage>('/auth/add-card', formData);
        return data.message
    } catch (error) {
        if (isAxiosError(error)) {
            throw new Error(error.response?.data.error);
        }

        return [];
    }
}

export async function getCards() {
    try {
        const { data } = await api.get<Card[]>('/auth/cards');
        const response = CardsSchema.safeParse(data);
        if (response) {
            return response.data
        }
    } catch (error) {
        if (isAxiosError(error)) {
            throw new Error(error.response?.data.error);
        }
        return [];
    }
}
export async function selectedDefaultTarget(cardId: Card[number]["_id"]) {
    try {
        const { data } = await api.put<ResponseMessage>('/auth/card/default-payment', { cardId });
        return data.message
    } catch (error) {
        if (isAxiosError(error)) {
            throw new Error(error.response?.data.error);
        }
        return [];
    }
}
export async function getPaymentDefault(type_target: Card[number]["type_target"]) {
    try {
        const ecodeType = encodeURIComponent(type_target);
        const { data } = await api.get<Card[number]>(`/auth/card/get-payment/${ecodeType}`);
        return data
    } catch (error) {
        if (isAxiosError(error)) {
            throw new Error(error.response?.data.error);
        }

        return null;
    }
}
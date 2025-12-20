import api from "@/lib/axios";
import { isAxiosError } from "axios";
import { chatSchema } from "../types";
import type {  ResponseMessage, MessageFormData } from "../types";
export async function getAviableChats() {
    try {
        const {data} = await api('/chats');
        const response = chatSchema.parse(data);
        if(response){
            return response.chats;
        }
        return [];
    } catch (error) {
        if (isAxiosError(error)) {
            throw new Error(error.response?.data.error);
        }

        return [];
    }
}
export async function sendMessage(formData: MessageFormData) {
    try {
        const {data} = await api.post<ResponseMessage>('/chats/send-message', formData);
        return data.message;
    } catch (error) {
        if (isAxiosError(error)) {
            throw new Error(error.response?.data.error);
        }

        return [];
    }
}
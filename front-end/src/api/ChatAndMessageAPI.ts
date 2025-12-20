import api from "@/lib/axios";
import { isAxiosError } from "axios";
import { chatSchema, messagesSchema } from "../types";
import type {  ResponseMessage, MessageFormData, Chat, Messages } from "../types";
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

export async function getMessagesByChat(chatId: Chat['_id']){
    try {
        const {data} = await api<Messages>(`/chats/messages/${chatId}`);
        const response = messagesSchema.parse(data);
        console.log(response);
        if(response) {
            return response.messages;
        }
        return [];
    } catch (error) {
        if (isAxiosError(error)) {
            throw new Error(error.response?.data.error);
        }

        return [];
    }
}
import axios from "axios";
import { getServerUrl } from "@/lib/utils";

const serverUrl = getServerUrl();

const API_PREFIX = "/api/v1";

interface ApiOptions {
    prefix?: string;
    method?: string;
    body?: any;
    token?: string;
    withCredentials?: boolean;
}

export const api = async <T>(
    endpoint: string,
    {
        prefix = "",
        method = "GET",
        body,
        token,
        withCredentials = false,
    }: ApiOptions = {}
): Promise<T> => {
    try {
        const isFormData = body instanceof FormData;

        const response = await axios({
            method,
            url: `${serverUrl}${prefix}${endpoint}`,
            headers: {
                ...(token ? { Authorization: `Bearer ${token}` } : {}),
                ...(isFormData ? {} : { "Content-Type": "application/json" }),
            },
            data: body || undefined,
            withCredentials,
        });

        return response.data;
    } catch (error: any) {
        if (error.message.includes("Network Error")) {
            throw "networkError";
        }

        throw error.response?.data || error;
    }
};

export const apiLogin = (
    data: LoginMutation
): Promise<{ user: UserType; token: TokenData }> =>
    api("/auth/login", { prefix: API_PREFIX, method: "POST", body: data });

export const currentUser = (token: string): Promise<{ user: UserType }> =>
    api("/auth/current-user", {
        prefix: API_PREFIX,
        method: "POST",
        body: undefined,
        token: token,
    });

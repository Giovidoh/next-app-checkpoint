import axios from "axios";

const proxyRoute = "/api/proxy";

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
    prefix = API_PREFIX,
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
      url: `${proxyRoute}${prefix}${endpoint}`,
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
  api("/auth/login", { method: "POST", body: data });

export const currentUser = (token: string): Promise<{ user: UserType }> =>
  api("/auth/current-user", {
    method: "POST",
    body: undefined,
    token: token,
  });

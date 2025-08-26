import { useMutation } from "@tanstack/react-query";
import { urlBase } from "./url-base";

export interface LoginRequest {
    username: string;
    password: string;
}

interface LoginResponse {
    token: string;
}

export interface LoginError {
    message: string;
}

export function useLogin() {
    return useMutation<LoginResponse, Error, LoginRequest>({
        mutationKey: ["login"],
        mutationFn: async (data: LoginRequest) => {
            const response = await fetch(`${urlBase}/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                const errorData: LoginError = await response.json();
                throw new Error(errorData.message);
            }

            const result: LoginResponse = await response.json();

            return result;
        },
    });
}

import { useMutation } from "@tanstack/react-query";
import { urlBase } from "./url-base";

export interface UploadFileResponse {
    message: string;
}

interface UploadFileParams {
    file: File;
}

export function useUploadFile() {
    return useMutation({
        mutationKey: ["upload-file"],
        mutationFn: async ({ file }: UploadFileParams) => {
            const token = localStorage.getItem("token");

            const formData = new FormData();
            formData.append("file", file);

            const response = await fetch(`${urlBase}/admin/upload-vendas`, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                body: formData,
            });

            if (!response.ok) {
                throw new Error("Falha no upload do arquivo.");
            }

            const result: UploadFileResponse = await response.json();
            return result;
        },
    });
}

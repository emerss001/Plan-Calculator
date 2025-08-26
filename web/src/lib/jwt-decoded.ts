import { jwtDecode } from "jwt-decode";

type JWTPayload = {
    exp: number;
    id: string;
    username: string;
};

export const isTokenValid = (token: string): boolean => {
    try {
        const decoded: JWTPayload = jwtDecode(token);

        const currentTime = Math.floor(Date.now() / 1000);
        return decoded.exp > currentTime;
    } catch (error) {
        console.log(error);
        return false;
    }
};

import { jwtDecode } from 'jwt-decode';

interface DecodedToken {
    sub: string;
    usernmae: string;
    exp: number;
}

export function decodeToken(token: string): DecodedToken | null {
    try {
        const decoded = jwtDecode<DecodedToken>(token);
        return decoded;
    } catch (error) {
        console.error('Error decoding token:', error);
        return null;
    }
}

export function isValidToken(token: string | null) {
    if (!token) return false;

    try {
        const decodedToken = jwtDecode<DecodedToken>(token);

        if (decodedToken && decodedToken.exp) {
            return decodedToken.exp > Date.now() / 1000;
        }

        return false;
    } catch (error) {
        console.error('Error decoding JWT token:', error);
        return false;
    }
}
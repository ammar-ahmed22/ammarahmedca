import { useCookies } from "react-cookie";

const TOKEN_NAME = "authToken";

export const useAuthToken = () : [string, (token: string) => void, () => void] => {
    
    const [cookies, setCookie, removeCookie] = useCookies<string, Record<string, string>>([TOKEN_NAME]);

    const setAuthToken = (token: string) => setCookie(TOKEN_NAME, token, { path: "/chess" });

    const removeAuthToken = () => removeCookie(TOKEN_NAME, { path: "/chess", domain: "localhost" });
    
    return [cookies[TOKEN_NAME], setAuthToken, removeAuthToken];
}
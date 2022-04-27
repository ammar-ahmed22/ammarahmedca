import React from "react";
import { useCookies } from "react-cookie";

const TOKEN_NAME = "authToken";

export const useAuthToken = () => {
    const [cookies, setCookie, removeCookie] = useCookies([TOKEN_NAME]);

    const setAuthToken = (token) => setCookie(TOKEN_NAME, token);

    const removeAuthToken = () => removeCookie(TOKEN_NAME);

    return [cookies[TOKEN_NAME], setAuthToken, removeAuthToken];
}
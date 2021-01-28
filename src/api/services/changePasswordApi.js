import { CHANGE_PASSWORD_URL } from "./config/config";
import { getSessionCookie, setSessionCookie } from "../../config/session";
import { ApiErrorHandler } from "./utils/apiErrorHandler";

export const changePasswordApi = {
    change: async ( password, newPassword, repeatPassword ) => {
        
        const response = await fetch(CHANGE_PASSWORD_URL,
            {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + getSessionCookie()
                },
                body: JSON.stringify({
                    password,
                    newPassword,
                    repeatPassword
                })
            }
        );
        
        if(response.ok) {
            const jwt = response.headers.get("x-token");
            setSessionCookie(jwt)
            return response;
        } 
        
        const error = await ApiErrorHandler.handle(response);
        return error;
    }
}

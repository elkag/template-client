import { REGISTER_SERVICE_URL } from "./config/config";
import { setSessionCookie } from "../../config/session";
import { ApiErrorHandler } from "./utils/apiErrorHandler";

export const registerApi = {
    register: async (
        {
            email,
            password,
            firstName,
            lastName,
            repeatPassword
        }
    ) => {
            const response = await fetch(REGISTER_SERVICE_URL,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    // body data type must match "Content-Type" header
                    body: JSON.stringify({
                        email,
                        password,
                        firstName,
                        lastName,
                        repeatPassword
                    })
                }
            );
            
            if(response.ok) {
                const jwt = response.headers.get("x-token");
                setSessionCookie(jwt);
                return {error: false};
            } 
    
            const error = await ApiErrorHandler.handle(response);
            return error;
        }
}

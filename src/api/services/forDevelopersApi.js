import { getSessionCookie } from "../../config/session";
import { API_DOCUMENTATION_URL } from "./config/config";
import { ApiErrorHandler } from "./utils/apiErrorHandler";

export const forDevelopersApi = {
    go: async () => {
        const response = await fetch(API_DOCUMENTATION_URL,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + getSessionCookie()
                },
            }
        );

        if(response.ok) {
            return response;
        } 

        const error = await ApiErrorHandler.handle(response);
        return error;
  }
}

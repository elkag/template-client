import { getSessionCookie } from "../../config/session";
import { PROMOTE_USERS_URL } from "./config/config";
import { ApiErrorHandler } from "./utils/apiErrorHandler";

export const promoteUsersApi = {
    promote: async (usersIds) => {

        const response = await fetch(PROMOTE_USERS_URL,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + getSessionCookie()
                },
                body: JSON.stringify(usersIds)
            }
        );

        if(response.ok) {
            const json = await response.json();
            return json;
        } 

        const error = await ApiErrorHandler.handle(response);
        return error;     
  }
}

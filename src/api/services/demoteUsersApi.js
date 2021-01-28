import { getSessionCookie } from "../../config/session";
import { DEMOTE_USERS_URL } from "./config/config";
import { ApiErrorHandler } from "./utils/apiErrorHandler";

export const demoteUsersApi = {
    demote: async (usersIds) => {

        const response = await fetch(DEMOTE_USERS_URL,
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
            return response.json();
        } 

        const error = await ApiErrorHandler.handle(response);
        return error;       
  }
}

import { getSessionCookie } from "../../config/session";
import { CREATE_NEW_ITEM_URL } from "./config/config";
import { ApiErrorHandler } from "./utils/apiErrorHandler";

export const createNewItemApi = {
    create: async () => {
        const response = await fetch(CREATE_NEW_ITEM_URL,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + getSessionCookie()
                }
            }
        );

        if(response.ok) {
            return response.json();
        } 

        const error = await ApiErrorHandler.handle(response);
        return error;
  }
}

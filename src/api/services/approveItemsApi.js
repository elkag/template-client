import { getSessionCookie } from "../../config/session";
import { APPROVE_ITEMS_URL } from "./config/config";
import { ApiErrorHandler } from "./utils/apiErrorHandler";

export const approveItemsApi = {
    approve: async (itemIds) => {

        const response = await fetch(APPROVE_ITEMS_URL,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + getSessionCookie()
                },
                body: JSON.stringify(itemIds)
            }
        );

        if(response.ok) {
            return response.json();
        } 

        const error = await ApiErrorHandler.handle(response);
        return error;
  }
}

import { getSessionCookie } from "../../config/session";
import { DELETE_ITEM_URL } from "./config/config";
import { ApiErrorHandler } from "./utils/apiErrorHandler";

export const deleteItemApi = {
    delete: async (id) => {

        const formData = new FormData();
        formData.append("id", id);
        const response = await fetch(DELETE_ITEM_URL,
            {
                method: 'DELETE',
                headers: {
                    'Authorization': 'Bearer ' + getSessionCookie()
                },
                body: formData
            }
        );

        if(response.ok) {
            return response;
        } 

        const error = await ApiErrorHandler.handle(response);
        return error;
  }
}

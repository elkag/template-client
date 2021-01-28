import { getSessionCookie } from "../../config/session";
import { GET_ITEM_URL, GET_AUTHORS_ITEM_URL } from "./config/config";
import { ApiErrorHandler } from "./utils/apiErrorHandler";

export const getItemApi = {
    get: async ( id, isSuperAdmin ) => {
        const response = await fetch(isSuperAdmin ? GET_ITEM_URL + `?id=${id}` : GET_AUTHORS_ITEM_URL  + `?id=${id}`,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + getSessionCookie()
                },
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

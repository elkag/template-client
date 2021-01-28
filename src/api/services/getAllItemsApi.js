import { getSessionCookie } from "../../config/session";
import { GET_ALL_ITEMS_URL } from "./config/config";
import { ApiErrorHandler } from "./utils/apiErrorHandler";

export const getAllItemsApi = {
    get: async (page, rowsPerPage, orderBy, direction) => {
        const response = await fetch(GET_ALL_ITEMS_URL + `?p=${page}&s=${rowsPerPage}&order=${orderBy}&dir=${direction}`,
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

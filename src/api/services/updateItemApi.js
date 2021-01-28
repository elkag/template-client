import { getSessionCookie } from "../../config/session";
import { UPDATE_ITEM_URL } from "./config/config";
import { ApiErrorHandler } from "./utils/apiErrorHandler";

export const updateItemApi = {
    update: async ( {   id,
                        name,
                        description,
                        notes,
                        link,
                        categories,
                        tags,
                        images
                    }
        ) => {
        const response = await fetch(UPDATE_ITEM_URL,
            {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + getSessionCookie()
                },
                body: JSON.stringify({
                        id,
                        name,
                        description,
                        link,
                        notes,
                        categories,
                        tags,
                        images
                  })
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

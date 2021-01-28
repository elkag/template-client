import { getSessionCookie } from "../../config/session";
import { BAN_USER_URL } from "./config/config";
import { ApiErrorHandler } from "./utils/apiErrorHandler";

export const banUserApi = {
    ban: async (id, isBan) => {

        const formData = new FormData();
        formData.append("id", id);
        formData.append("ban", isBan);
        const response = await fetch(BAN_USER_URL   ,
            {
                method: 'POST',
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

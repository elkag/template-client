import { getSessionCookie } from "../../config/session";
import { DELETE_IMAGE_URL } from "./config/config";
import { ApiErrorHandler } from "./utils/apiErrorHandler";

export const deleteImageApi = {
    delete: async (itemId, imageId) => {

        const formData = new FormData();
        formData.append("itemId", itemId);
        formData.append("imageId", imageId);
        const response = await fetch(DELETE_IMAGE_URL,
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

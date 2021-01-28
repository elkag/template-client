import { getSessionCookie } from "../../config/session";
import { UPLOAD_IMAGE_URL } from "./config/config";
import { ApiErrorHandler } from "./utils/apiErrorHandler";

export const imageUploadApi = {
    upload: async (file, item) => {
        const formData = new FormData();

        formData.append("file", file.src);
        formData.append('item', item);
        
        const response = await fetch(UPLOAD_IMAGE_URL,
            {
                method: 'POST',
                headers: {
                    'Authorization': 'Bearer ' + getSessionCookie()
                },
                body: formData
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

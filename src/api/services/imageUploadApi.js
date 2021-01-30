import { getSessionCookie } from "../../config/session";
import { UPLOAD_IMAGE_URL } from "./config/config";
import { ApiErrorHandler } from "./utils/apiErrorHandler";



export const imageUploadApi = {
    upload: async (file, item) => {
        const controller = new AbortController()

        // 33 second timeout:
        const timeoutId = setTimeout(() => controller.abort(), 15000)
        const formData = new FormData();

        formData.append("file", file.src);
        formData.append('item', item);
        
        try {
            const response = await fetch(UPLOAD_IMAGE_URL,
                {
                    method: 'POST',
                    headers: {
                        'Authorization': 'Bearer ' + getSessionCookie()
                    },
                    body: formData,
                    signal: controller.signal
                }
            );

            if(response.ok) {
                const json = await response.json();
                return json;
            } 

            clearInterval(timeoutId);
            const error = await ApiErrorHandler.handle(response);
            return error;
        } catch(e) {
            clearInterval(timeoutId);
            return {error: true, message: "Unexpected error. Check the file size."}
        }
  }
}

import { LOGIN_SERVICE_URL } from './config/config';
import { setSessionCookie } from '../../config/session';
import { ApiErrorHandler } from './utils/apiErrorHandler';

export const loginApi = {
    logIn: async (email, password) => {

        const response = await fetch(LOGIN_SERVICE_URL,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': 'http://localhost:3000'
                },
                body: JSON.stringify({email, password})
            }
        );

        if(response.ok) {
            const jwt = response.headers.get("x-token");
            setSessionCookie(jwt)
            return response;
        }
        
        const error = await ApiErrorHandler.handle(response);
        return error;
  }
}
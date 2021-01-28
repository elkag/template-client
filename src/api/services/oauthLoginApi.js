import { FACEBOOK_LOGIN_URL } from './config/config';
import { setSessionCookie } from '../../config/session';

export const oauthLoginApi = {
    logIn: async (token) => {

        return fetch(FACEBOOK_LOGIN_URL,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': 'http://localhost:3000',
                    'Authorization': token
                },
            }
            ).then( response => {
                if(response.ok) {
                    const jwt = response.headers.get("x-token");
                    setSessionCookie(jwt)
                    return response;
                } 
                throw response;
            }
        ).catch( error => {
            if (error instanceof Error) {
                return { error: true, message: error.message }
            }
            return error.json().then((responseJson) => {
                return responseJson;
            }
        )
            
    }).then(response => {
        return response;
    })
}
}
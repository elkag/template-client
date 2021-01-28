import { USER_INFO_SERVICE_URL } from './config/config';

export const getUserInfoApi = {
    getUserInfo: async (token) => {

        return fetch(USER_INFO_SERVICE_URL,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': 'http://localhost:3000',
                    'Authorization': 'Bearer ' + token
                }
            }
            ).then( response => {
                    if(response.ok) {
                        return response.json();
                    } 
                    throw response;
                }
            ).then( json => {
                    return json;
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
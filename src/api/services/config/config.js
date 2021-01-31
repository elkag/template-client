export const API_PREFIX = "http://localhost:8080"//process.env.REACT_APP_API_PREFIX;

// Users
export const LOGIN_SERVICE_URL =  API_PREFIX + '/users/login';
export const REGISTER_SERVICE_URL = API_PREFIX + '/register/user';
export const VALIDATE_SERVICE_URL = API_PREFIX + '/users/validate';
export const LOGOUT_SERVICE_URL = API_PREFIX + '/users/logout';
export const USER_INFO_SERVICE_URL = API_PREFIX + '/auth/current';
export const FACEBOOK_LOGIN_URL = API_PREFIX + '/users/facebook-login';
export const GET_AUTHORS_URL = API_PREFIX + '/users/authors';
export const GET_ADMINS_URL = API_PREFIX + '/users/admins';
export const CHANGE_PASSWORD_URL = API_PREFIX + '/users/change-password';
export const PROMOTE_USERS_URL = API_PREFIX + '/users/promote';
export const DEMOTE_USERS_URL = API_PREFIX + '/users/demote';
export const BAN_USER_URL = API_PREFIX + '/users/ban';

//Items
export const CREATE_NEW_ITEM_URL = API_PREFIX + '/items/new';
export const UPDATE_ITEM_URL = API_PREFIX + '/items/update';
export const UPLOAD_IMAGE_URL = API_PREFIX + '/images/upload';
export const GET_AUTHORS_ITEM_URL = API_PREFIX + '/items/get-author-item';
export const GET_ITEM_URL = API_PREFIX + '/items/admin/get';
export const GET_AUTHOR_ITEMS_URL = API_PREFIX + '/items/get-author-items';
export const GET_ALL_ITEMS_URL = API_PREFIX + '/items/admin/all';
export const GET_NOT_APPROVED_ITEMS_URL = API_PREFIX + '/items/admin/unapproved?p=0&s=100';
export const APPROVE_ITEMS_URL = API_PREFIX + '/items/admin/approve';
export const DELETE_ITEM_URL = API_PREFIX + '/items/delete';

//Swagger
export const API_DOCUMENTATION_URL = API_PREFIX + '/swagger-ui/index.html';

//External
export const CLOUDINARY_UPLOAD_URL = 'https://api.cloudinary.com/v1_1/dr9xzujkh/image/upload';

// OAUTH2
export const OAUTH2_REDIRECT_URI = 'http://localhost:3000/oauth2/redirect'
export const GOOGLE_AUTH_URL = API_PREFIX + '/oauth2/authorize/google?redirect_uri=' + OAUTH2_REDIRECT_URI;
export const FACEBOOK_AUTH_URL = API_PREFIX + '/oauth2/authorize/facebook?redirect_uri=' + OAUTH2_REDIRECT_URI;
export const GITHUB_AUTH_URL = API_PREFIX + '/oauth2/authorize/github?redirect_uri=' + OAUTH2_REDIRECT_URI;
import Cookies from "js-cookie";

export const setSessionCookie = (session) => {
  Cookies.remove("x-token");
  Cookies.set("x-token", session, { expires: 1 });
};

export const getSessionCookie = () => {
  const sessionCookie = Cookies.get("x-token");

  if (sessionCookie === undefined) {
    return {};
  } else {
    return sessionCookie;
  }
};

export const deleteSessionCookie = () => {
  Cookies.remove("x-token");
}
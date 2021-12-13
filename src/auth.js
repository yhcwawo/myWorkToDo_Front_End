
const TOKEN = "TOKEN";
const USER = "USER";

export const isLoggedInVar = localStorage.getItem(TOKEN);
export const user_id_token = localStorage.getItem(USER);
  
export const logUserIn = (token) => {
    localStorage.setItem(TOKEN, token);
    isLoggedInVar(true);
};
  
export const LogUserOut = () => {

    localStorage.removeItem(TOKEN);
    localStorage.removeItem(USER);

};
  

// Set the token in a cookie
export const setTokenInCookie = (token) => {
  const expires = new Date(Date.now() + 24 * 60 * 60 * 1000).toUTCString(); // 24 hours expiration
  document.cookie = `token=${token}; path=/; expires=${expires}; Secure; SameSite=Strict`; // No need to specify domain
};

// Get the token from cookies
export const getTokenFromCookie = () => {
  const token = document.cookie
  if(token){
     const cookies = document.cookie.split("; ");
  for (let i = 0; i < cookies.length; i++) {
    const [name, value] = cookies[i].split("=");
    if (name === "token") {
      return value;
    }
  }
  }else{
    let data=localStorage.getItem("token");
    if(data){
     return data;
    }else{
     return null;
    }
  }
 
  return null;
};

// Delete the token cookie (e.g., for logout)
export const deleteTokenCookie = () => {
  document.cookie = "token=; Max-Age=0; path=/; Secure; SameSite=Strict"; // Same domain handling
};

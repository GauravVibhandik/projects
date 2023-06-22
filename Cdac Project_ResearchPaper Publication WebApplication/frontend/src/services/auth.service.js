import axios from "axios";

//const API_URL = "http://localhost:3000/auth/";

const API_URL = "/auth/";

//const API_URL="http://localhost:8080/auth/";
const register = (formValues) => {
  return axios.post(API_URL + "signup", formValues
  );
};

const login = (username, password) => {
  return axios
    .post(API_URL + "signin", {
      email:username,
      password:password,
    })
    .then((response) => {
      console.log(response);
      if (response.data.email) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }
      //return "yes"
      return response.data;
    });
 
};

const logout = () => {
  localStorage.removeItem("user");
  return axios.post(API_URL + "signout").then((response) => {
    return response.data;
  });
};

//
const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

const AuthService = {
  register,
  login,
  logout,
  getCurrentUser,
}

export default AuthService;

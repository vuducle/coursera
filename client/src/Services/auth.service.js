import axios from "axios"
const API_URL = "https://localhost:3443/users/"

const register = (username, password) => {
    return axios.post(API_URL + "signup", {
        username,
        password
    })
}

const login = (username, password) => {
    return axios()
        .post(API_URL + "login", {
            username,
            password
        })
        .then(res => {
            if (res.data.accessToken) {
                console.log(res.data.accessToken)
                localStorage.setItem("user", JSON.stringify(res.data))
            }
            return res.data;
        })
        
}

const logout = () => {
    localStorage.removeItem("user");
}

export default {
  register,
  login,
  logout
};
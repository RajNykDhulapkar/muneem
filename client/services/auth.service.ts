import axios from "axios";
import { CreateUserInput } from "../schemas/auth/register.schema";
import { LoginUserInput } from "../schemas/auth/login.schema";
const API_URL = process.env.NEXT_PUBLIC_SERVER_ENDPOINT;

const register = (createUserInput: CreateUserInput) => {
    return axios.post(API_URL + "/authentication/register", createUserInput);
};

const login = async (loginUserInput: LoginUserInput) => {
    const response = await axios.post(API_URL + "/authentication/login", loginUserInput);
    if (response.data.refreshToken) {
        localStorage.setItem("refreshToken", JSON.stringify(response.data.refreshToken));
    }
    return response;
};

const getCurrentLoggedInUser = () => {
    return axios.get(API_URL + "/authentication");
};

const authService = {
    register,
    login,
    getCurrentLoggedInUser,
};

export default authService;

import jwt_decode from "jwt-decode";
import { IUser } from "../interfaces/IUser";
import { IDecodedToken } from "../interfaces/IDecodedToken";
import { ICustomer } from "../interfaces/ICustomer";
import axios, { AxiosResponse } from "axios";
import { config } from "./config";

type LoginSuccessCallback = (res: AxiosResponse) => void;

export default class AuthService {
  userLocalStorageKeys = {
    LOGGED_USERNAME: "isatex:user:username",
    USER_ACCESS_TOKEN: "isatex:user:auth:token:access",
    USER_REFRESH_TOKEN: "isatex:user:auth:token:refresh",
    USER_DECODED_ACCESS_TOKEN: "isatex:user:auth:token:decoded:access",
    USER_DECODED_REFRESH_TOKEN: "isatex:user:auth:token:decoded:refresh",
  };

  getUserLocalData(): IDecodedToken | null {
    const userDataStr = localStorage.getItem(
      this.userLocalStorageKeys.USER_DECODED_REFRESH_TOKEN
    );
    if (!userDataStr) return null;
      const userData: IDecodedToken = JSON.parse(userDataStr);
    return userData;
  }

  getSavedUsername(): string | null {
    const data = this.getUserLocalData()
    return data ? data.sub : null
  }

  decodeTokens(access, refresh) {
    try {
      localStorage.setItem(
        this.userLocalStorageKeys.USER_DECODED_ACCESS_TOKEN,
        JSON.stringify(jwt_decode(access))
      );
      localStorage.setItem(
        this.userLocalStorageKeys.USER_DECODED_REFRESH_TOKEN,
        JSON.stringify(jwt_decode(refresh))
      );
    } catch (err) {}
  }

  login(
    login: string,
    password: string,
    onSuccess: LoginSuccessCallback,
    onError?: CallableFunction
  ) {
    axios
      .post(`${config["isatex-api"]}/api/auth/login`, {
        username: login,
        password,
      })
      .then((res) => {
          const refreshToken = res.data.refreshToken;
          const accessToken = res.data.accessToken;
        // Save access and refresh tokens
        localStorage.setItem(
          this.userLocalStorageKeys.USER_ACCESS_TOKEN,
          JSON.stringify(accessToken)
        );
        localStorage.setItem(
          this.userLocalStorageKeys.USER_REFRESH_TOKEN,
          JSON.stringify(refreshToken)
        );
        // save decoded tokens
        this.decodeTokens(accessToken, refreshToken)
        // callback
        onSuccess(res);
      })
      .catch((err) => {
        if (onError) {
          onError(err);
        }
      });
  }

  createCustomer(customer: ICustomer) {
    return axios.post(`${config["isatex-api"]}/api/user/create`, customer);
  }

  logout() {
    // black list refresh token and valid access token
    
    // clear token saved data
    localStorage.removeItem(this.userLocalStorageKeys.USER_ACCESS_TOKEN)
    localStorage.removeItem(this.userLocalStorageKeys.USER_REFRESH_TOKEN)
    localStorage.removeItem(this.userLocalStorageKeys.USER_DECODED_ACCESS_TOKEN)
    localStorage.removeItem(this.userLocalStorageKeys.USER_DECODED_REFRESH_TOKEN)
  }
}

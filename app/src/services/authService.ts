/* eslint-disable @typescript-eslint/no-explicit-any */
// import axios from "axios";
import { baseApi } from "../common/constants/api_base"
import { lsToken, lsUUIDUser } from "../common/constants/constants";
import EncryptTools from "../common/utils/Encrypted";
import { handleError } from "./handleError";
import { instance } from "./promiseStatus";



const loginUser = async (email: string, password: string) => {
    try {
        const resp = await instance.post(`${baseApi}/users/auth/login`,
            {
                email,
                password
            }
        );
        if (resp.status == 200) {
            const response = EncryptTools.encrypt(resp.data.data.token_auth)
            localStorage.setItem(lsToken, response)
            return resp.data
        }
        throw new Error(resp.statusText);
    }
    catch (error: any) {
        handleError(error)
    }
}

const refreshToken = async () => {
    try {
        const localToken = localStorage.getItem(lsToken)
        const responseDecrypt = EncryptTools.decrypt(localToken)
        const resp = await instance.get(`${baseApi}/users/auth/refresh-token`,
            {
                headers: {
                    Authorization: 'Bearer ' + responseDecrypt
                }

            }
        );
        if (resp.status == 200) {
            const uuid = resp.data.data.uuid
            const response = EncryptTools.encrypt(resp.data.data.token)
            localStorage.setItem(lsToken, response)
            localStorage.setItem(lsUUIDUser, uuid)

            return resp.data
        }
        throw new Error(resp.statusText);
    }
    catch (error: any) {
        handleError(error)
    }
}


const validateEmail = async (email: string) => {
    try {
        const resp = await instance.post(`${baseApi}/users/auth/check-email`,
            { email }
        );
        if (resp.status == 200) {
            // {data:{}, message:""}
            return resp.data.data
        }
        throw new Error(resp.statusText);
    } catch (error: any) {
        handleError(error)
    }
}


const AuthService = {
    loginUser,
    refreshToken,
    validateEmail
}

export default AuthService

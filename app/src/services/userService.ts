/* eslint-disable @typescript-eslint/no-explicit-any */
// import axios from "axios";
import { baseApi } from "../common/constants/api_base"
import { instance } from "./promiseStatus";
import { lsToken, lsUUIDUser } from "../common/constants/constants";
import EncryptTools from "../common/utils/Encrypted";
import { handleError } from "./handleError";

const getInfo = async () => {
    try {
        const localToken = localStorage.getItem(lsToken)
        const responseDecrypt = EncryptTools.decrypt(localToken)
        const uuid = localStorage.getItem(lsUUIDUser)
        const resp = await instance.get(`${baseApi}/users/user/${uuid}`,
            {
                headers: {
                    Authorization: 'Bearer ' + responseDecrypt
                }

            }
        );
        if (resp.status == 200) {
            return resp.data.data
        }
        throw new Error(resp.data);
    } catch (error: any) {
        handleError(error)
    }

}

const getAddressWallet = async (network: string, uuid: string) => {
    try {
        const localToken = localStorage.getItem(lsToken)
        const responseDecrypt = EncryptTools.decrypt(localToken)

        const resp = await instance.post(`${baseApi}/users/user/wallets/address/`, 
        { network, uuid },
        {
                headers: {
                    Authorization: 'Bearer ' + responseDecrypt
                }

            }
        );
        if (resp.status == 200) {
            return resp.data.data
        }
        throw new Error(resp.data);
    } catch (error: any) {
        handleError(error)
    }

}


const getBalance = async (network: string, crypto: string) => {
    try {
        const localToken = localStorage.getItem(lsToken)
        const responseDecrypt = EncryptTools.decrypt(localToken)

        const resp = await instance.post(`${baseApi}/users/user/wallets/balance/`, 
        { network, crypto },
        {
                headers: {
                    Authorization: 'Bearer ' + responseDecrypt
                }

            }
        );
        return resp.data.data
    } catch (error: any) {
        handleError(error)
    }

}

const getHistorial = async () => {
    try {
        const localToken = localStorage.getItem(lsToken)
        const responseDecrypt = EncryptTools.decrypt(localToken)

        const resp = await instance.get(`${baseApi}/users/user/transactions/`, 
        {
                headers: {
                    Authorization: 'Bearer ' + responseDecrypt
                }

            }
        );
        return resp.data.data
    } catch (error: any) {
        handleError(error)
    }

}
const UserService = {
    getInfo,
    getAddressWallet,
    getBalance,
    getHistorial
}

export default UserService
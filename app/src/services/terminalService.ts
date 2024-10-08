/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseApi } from "../common/constants/api_base"
import { lsToken } from "../common/constants/constants";
import EncryptTools from "../common/utils/Encrypted";
import { TypeAccountTransfer } from "../models/enums";
import { handleError } from "./handleError";
import { instance } from "./promiseStatus";


const getCryptos = async () => {
    try {
        const localToken = localStorage.getItem(lsToken)
        const responseDecrypt = EncryptTools.decrypt(localToken)
        const resp = await instance.get(`${baseApi}/terminal/cryptos`,
            {
                headers: {
                    Authorization: 'Bearer ' + responseDecrypt
                }

            }
        );
        if (resp.status == 200) {
            return resp.data.data
        }
        throw new Error(resp.statusText);
    }
    catch (error: any) {
        handleError(error)
    }
}




const getCurrencyCryptoFiat = async (amount: number, symbolIn: string, symbolOut: string) => {
    try {
        const localToken = localStorage.getItem(lsToken)
        const responseDecrypt = EncryptTools.decrypt(localToken)
        const resp = await instance.post(`${baseApi}/terminal/currency/crypto-fiat`,
            {
                amount,
                symbol_in: symbolIn,
                symbol_out: symbolOut
            },
            {
                headers: {
                    Authorization: 'Bearer ' + responseDecrypt
                }

            }
        );
        if (resp.status == 200) {
            return resp.data.data
        }
        throw new Error(resp.statusText);
    }
    catch (error: any) {
        handleError(error)
    }
}


const getCurrencyCryptoToCrypto = async (amount: number, crypto: string, network: string) => {
    try {
        const localToken = localStorage.getItem(lsToken)
        const responseDecrypt = EncryptTools.decrypt(localToken)
        const resp = await instance.post(`${baseApi}/terminal/currency/crypto-crypto`,
            {
                amount,
                crypto,
                network
            },
            {
                headers: {
                    Authorization: 'Bearer ' + responseDecrypt
                }

            }
        );
        if (resp.status == 200) {
            return resp.data.data
        }
        throw new Error(resp.statusText);
    }
    catch (error: any) {
        handleError(error)
    }
}
const sendFiat = async (uuid:string,network:string, amount: number, symbolIn: string, symbolOut: string) => {
    try {
        const localToken = localStorage.getItem(lsToken)
        const responseDecrypt = EncryptTools.decrypt(localToken)
        const resp = await instance.post(`${baseApi}/terminal/send/fiat`,
            {
                uuid:uuid,
                network: network,
                amount,
                symbol_in: symbolIn,
                symbol_out: symbolOut
            },
            {
                headers: {
                    Authorization: 'Bearer ' + responseDecrypt
                }

            }
        );
        if (resp.status == 200) {
            return resp.data.data
        }
        throw new Error(resp.statusText);
    }
    catch (error: any) {
        handleError(error)
    }
}

const sendCrypto = async (
                        uuid:string,
                        network:string, 
                        amount: number, 
                        symbolIn: string, 
                        emailOrAddress: string, 
                        typeAccountSend:TypeAccountTransfer , ) => {
    try {
        const localToken = localStorage.getItem(lsToken)
        const responseDecrypt = EncryptTools.decrypt(localToken)
        const resp = await instance.post(`${baseApi}/terminal/send/crypto`,
            {
                uuid:uuid,
                network: network,
                amount,
                symbol_in: symbolIn,
                symbol_out: symbolIn,
                email_or_address: emailOrAddress,
                type_account_send:typeAccountSend
            },
            {
                headers: {
                    Authorization: 'Bearer ' + responseDecrypt
                }

            }
        );
        if (resp.status == 200) {
            return resp.data.data
        }
        throw new Error(resp.statusText);
    }
    catch (error: any) {
        handleError(error)
    }
}

const validateAddress = async (address:string,network:string) => {
    try {
        const localToken = localStorage.getItem(lsToken)
        const responseDecrypt = EncryptTools.decrypt(localToken)
        const resp = await instance.post(`${baseApi}/terminal/wallets/validate-address/`,
            {
                address,
                network,
            },
            {
                headers: {
                    Authorization: 'Bearer ' + responseDecrypt
                }

            }
        );
        if (resp.status == 200) {
            return resp.data.data
        }
        throw new Error(resp.statusText);
    }
    catch (error: any) {
        handleError(error)
    }
}


const TerminalService = {
    getCryptos,
    getCurrencyCryptoFiat,
    sendFiat,
    getCurrencyCryptoToCrypto,
    sendCrypto,
    validateAddress
}

export default TerminalService

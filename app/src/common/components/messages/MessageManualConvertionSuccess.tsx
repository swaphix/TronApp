import { useNavigate } from "react-router";
import img from "../../../assets/images/bills.png";
import { ButtonPrimary, StatusButton } from "../ButtonPrimary";
import { routesNamesApp } from "../../../features/user/routes/routesNames";
import { CloseButton } from "../closeButton";
import { useEffect, useState } from "react";
import { WalletUser } from "../../../models/wallet_model";
import { lsAmountConvert, lsAmountSendTo, lswalletSelect } from "../../constants/constants";
import EncryptTools from "../../utils/Encrypted";
// improt 

const MessageManualConvertionSuccess = () => {
    const navigate = useNavigate();
    const [selectWallet, setSelectWallet] = useState<WalletUser>()
    const [amount, setAmount] = useState('')
    const [amountFiat, setAmountFiat] = useState('')

    // =============== INIT ================= 
    const initData = async () => {
        const amountSend = localStorage.getItem(lsAmountSendTo) ?? ''
        const amountConvert = localStorage.getItem(lsAmountConvert) ?? ''
        const walletSelect = localStorage.getItem(lswalletSelect)
        const dataWallet = EncryptTools.decrypt(walletSelect)
        const wallet = WalletUser.fromJSON(dataWallet)
        setSelectWallet(wallet)
        setAmount(amountSend)
        setAmountFiat(amountConvert)
    };
    useEffect(() => {
        initData();
    }, []);
    // =============== INIT ================= 

    const closeMessage = () => {
        localStorage.removeItem(lswalletSelect)
        localStorage.removeItem(lsAmountSendTo)
        localStorage.removeItem(lsAmountConvert)
        navigate(routesNamesApp.balance, { replace: true })
    }
    return (
        <div className="bg-splash absolute top-0 left-0 bottom-0 h-screen w-screen overflow-x-auto px-5">
            <div className="h-full w-full my-2 sm:my-0  flex flex-col items-center justify-start">
                <span className="mt-20 w-full">
                    <CloseButton onClick={closeMessage} />
                </span>
                <div className="w-full lg:w-2/6 text-center">
                    <h1 className="splashTxt mb-10 ">
                        Cambio exitoso
                    </h1>
                    <span className="splashTxtSecond">
                        {amount} {selectWallet?.crypto} → {amountFiat} MXN
                    </span>
                </div>
                <img src={img} className="h-[300px] ml-auto mr-auto"></img>
                <span className="w-full">
                    <ButtonPrimary type="button" textName="Cerrar" status={StatusButton.Enabled} customClickEvent={closeMessage} />
                </span>
            </div>
        </div>

    )
}
export default MessageManualConvertionSuccess;
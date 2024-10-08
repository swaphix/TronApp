import { useNavigate } from "react-router";
import img from "../../../assets/images/success_transfer.png";
import { ButtonPrimary, StatusButton } from "../ButtonPrimary";
import { routesNamesApp } from "../../../features/user/routes/routesNames";
import { CloseButton } from "../closeButton";
import { useEffect, useState } from "react";
import { WalletUser } from "../../../models/wallet_model";
import EncryptTools from "../../utils/Encrypted";
import { lsAddressSendTo, lsAmountSendTo, lswalletSelect } from "../../constants/constants";
import { TypeAccountTransfer } from "../../../models/enums";
// improt 

const MessageTransferSuccess = () => {
    const [selectWallet, setSelectWallet] = useState<WalletUser>()
    const [addressSendTo, setAddressSendTo] = useState('')
    const [amount, setAmount] = useState('')
    const [typeAccount, setTypeAccount] = useState<TypeAccountTransfer>()


    // =============== INIT ================= 
    const initData = async () => {
        const address = localStorage.getItem(lsAddressSendTo) ?? ''
        if (/[@]/.test(address)) {
            setTypeAccount(TypeAccountTransfer.Email)
        } else {
            setTypeAccount(TypeAccountTransfer.Address)
        }
        const amountSend = localStorage.getItem(lsAmountSendTo) ?? ''
        const walletSelect = localStorage.getItem(lswalletSelect)
        const dataWallet = EncryptTools.decrypt(walletSelect)
        const wallet = WalletUser.fromJSON(dataWallet)
        setSelectWallet(wallet)
        setAddressSendTo(address)
        setAmount(amountSend)
    };
    useEffect(() => {
        initData();
    }, []);
    // =============== INIT ================= 

    const navigate = useNavigate();

    const closeMessage = () => {
        localStorage.removeItem(lswalletSelect)
        localStorage.removeItem(lsAmountSendTo)
        localStorage.removeItem(lsAddressSendTo)
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
                        ¡Transferencia exitosa!
                    </h1>
                    {typeAccount == TypeAccountTransfer.Email ? <span className="splashTxtSecond">
                        Enviaste: <br />
                        {amount} {selectWallet?.crypto} a otro usuario: <br />
                        {addressSendTo} <br />
                    </span> : <span className="splashTxtSecond">
                        Enviaste: <br />
                        {amount} {selectWallet?.crypto} a la direccíon: <br />
                        {addressSendTo} <br />
                    </span>}
                </div>
                <img src={img} className="h-[300px] ml-auto mr-auto"></img>
                <span className="w-full">
                    <ButtonPrimary type="button" textName="Cerrar" status={StatusButton.Enabled} customClickEvent={closeMessage} />
                </span>
            </div>
        </div>

    )
}
export default MessageTransferSuccess;
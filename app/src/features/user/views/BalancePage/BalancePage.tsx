/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import './styles/ButtonStyle.css'
import { useNavigate } from "react-router";
import { lsToken, lsUserName } from "../../../../common/constants/constants";
import WalletBalance from "./components/wallet_balance";
import { ButtonPrimary, StatusButton } from "../../../../common/components/ButtonPrimary";
import { routesNamesAuth } from "../../../auth/routes/routesNames";
import home from '../../../../assets/images/swaphix_gif_home.gif'
import { useDispatch } from "react-redux";
import { ChangeIsBack, ChangeIsFooter } from "../../../../redux/mainSlice";
import { WalletUser } from "../../../../models/wallet_model";
import { ScreenStatus } from "../../../../models/enums";
import UserService from "../../../../services/userService";

export const BalancePage = () => {
    const dispatch = useDispatch()
    const [balanceData, setBalance] = useState<Array<WalletUser>>([]);
    const [user, setNameData] = useState('');
    const navigate = useNavigate();
    const token = localStorage.getItem(lsToken)
    const [screenStatus, setScreeStatus] = useState<ScreenStatus>(ScreenStatus.init)
    const [messageScreen, setMessageScreen] = useState<string>('')


    // ====================================== INIT ===============
    const changeScreenStatus = (message: string, status: ScreenStatus) => {
        setScreeStatus(status)
        setMessageScreen(message)

    }
    const initData = async () => {
        dispatch(ChangeIsBack({ isBack: false }))
        dispatch(ChangeIsFooter({ isViewFooter: false }))
        try {
            changeScreenStatus('', ScreenStatus.loading)

            const response = await UserService.getInfo()
            setNameData(response.username)
            localStorage.setItem(lsUserName, response.username)
            const responseBalance = await UserService.getBalance('TRON', 'USDT')
            const balanceTemp = []
            for (let index = 0; index < responseBalance.length; index++) {
                const element = responseBalance[index];
                const item = new WalletUser(element.id, element.network,
                    element.crypto, element.address,
                    element.balance, element.icon,
                    element.balance_fiat)
                balanceTemp.push(item)
            }
            setBalance(balanceTemp)
            changeScreenStatus('', ScreenStatus.success)

        } catch (error: any) {
            changeScreenStatus(error.message, ScreenStatus.error)
        }
    }
    useEffect(() => {
        initData();
    }, []);

    // ====================================== INIT ===============

    return (
        <>
            {user !== '' ? <div className="w-full flex justify-center">
                <span className="text-center font-normal text-xs">
                    Hola, {user}
                </span>
            </div> : <></>}
            <h1 className="titleTxt mt-1">
                Balance
            </h1>

            {
                screenStatus == ScreenStatus.loading && (<div className="divide-y divide divide-grayLow">
                    <WalletBalance wallet={undefined} isActive={true} isShimmer={true} />
                    <WalletBalance wallet={undefined} isActive={true} isShimmer={true} />
                    <WalletBalance wallet={undefined} isActive={true} isShimmer={true} />
                    <WalletBalance wallet={undefined} isActive={true} isShimmer={true} />

                </div>)
            }
            {
                screenStatus == ScreenStatus.error && token != undefined && (
                    <div className="flex flex-col items-center mt-20">
                        <i className="pi pi-exclamation-triangle text-purple" style={{ fontSize: '2rem' }}></i>
                        <i className="text-black text-xs font-light mt-5">{messageScreen}</i>
                        <span className="textButton" onClick={initData}>Reintentar</span>
                    </div>)
            }
            {screenStatus == ScreenStatus.error && token == undefined && (<div className="h-5/6">
                <div className="mx-5 flex flex-col items-center justify-center">
                    <div className="mt-10 flex flex-col items-center justify-center w-full">
                        {
                            balanceData.length == 0 && (<img src={home} className=""></img>)
                        }
                    </div >
                </div >
            </div >)}
            {screenStatus == ScreenStatus.success && balanceData.length == 0 && (<div className="h-full">
                <div className="mx-5 flex flex-col items-center justify-center">
                    <div className="mt-10 flex flex-col items-center justify-center w-full">

                        <WalletBalance isActive={false} wallet={new WalletUser(0, 'TRON', 'USDT', '', 0.0, "https://images-storage-swaphix.nyc3.digitaloceanspaces.com/cryptos/usdt.svg", '0.0')} isShimmer={false} />
                    </div >
                </div >
            </div >)}
            {screenStatus == ScreenStatus.success && balanceData.length > 0 && (<div className="h-full">
                <div className="mx-5 flex flex-col items-center justify-center">
                    <div className="mt-10 flex flex-col items-center justify-center w-full">

                        {
                            balanceData && balanceData.map((wallet) => (
                                <WalletBalance key={wallet.id} isActive={wallet.balance > 0.0} wallet={wallet} isShimmer={false} />
                            ))}
                    </div >
                </div >
            </div >)}
            {
                token === undefined || token === null && (<div className="flex flex-col">
                    <ButtonPrimary type="button" textName="Inicar sesión" status={StatusButton.Enabled} customClickEvent={() => navigate(routesNamesAuth.login)} />
                </div>)
            }
            {/* {
                screenStatus == ScreenStatus.success && balanceData.length == 0 && (
                    <ButtonPrimary type="button" textName="Verificar wallet" status={StatusButton.Enabled} customClickEvent={() => navigate(routesNamesAuth.personalData)} />

                )
            } */}
        </>
    )
}
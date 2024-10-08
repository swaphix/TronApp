/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect } from "react";

import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { ChangeIsBack, ChangeViewLogin } from "../../../../redux/mainSlice.ts";
import swaphixHome from "../../../../assets/images/swaphixHome.png"
import { routesNamesApp } from "../../../user/routes/routesNames.ts";
import { CloseButton } from "../../../../common/components/closeButton.tsx";
import AuthService from "../../../../services/authService.ts";
import { ButtonPrimary, StatusButton } from "../../../../common/components/ButtonPrimary.tsx";

export const WelcomePage = () => {
    // let routesNames=  routesNames;
    const dispatch = useDispatch();


    const init = async () => {
        try {
            dispatch(ChangeViewLogin({
                loginView: true,
            }))
            dispatch(ChangeIsBack({
                isBack: false,
            }))
            await AuthService.refreshToken()
            navigate(routesNamesApp.balance)
        } catch (e:any) {
            console.log(e)
        }

    }
    const navigate = useNavigate();
    useEffect(() => {
        init()
    }, []);

    return (
        <>
            <div className="bg-splash absolute top-0 left-0 bottom-0 h-screen w-screen overflow-x-auto">
                <CloseButton onClick={() => navigate(routesNamesApp.balance, { replace: true })} />
                <div className="h-full p w-full sm:my-0  flex flex-col items-center justify-center">
                    <div className="w-full px-4 lg:w-2/6">
                        <h1 className="splashTxt mb-10 ">
                            ¡Bienvenido/a a Swaphix!
                        </h1>
                        <div className="text-left mt-[40px] text-center">
                            <span className="splashTxtSecond ">
                                ✦ Crea tu wallet de forma sencilla ✦
                            </span><br />
                            <span className="splashTxtSecond mt-[10px]">
                                ✦ Convierte USDT a pesos al instante ✦
                            </span><br />
                            <span className="splashTxtSecond mt-[10px]">
                                ✦ Envía y recibe entre cuentas ✦
                            </span>
                        </div>
                        <img src={swaphixHome} className="h-[200px] ml-auto mr-auto"></img>

                        <span className="w-full">
                            <ButtonPrimary type="button" textName="Iniciar sesión" status={StatusButton.Enabled} customClickEvent={() => navigate(routesNamesApp.balance, { replace: true })} />

                            {/* <ButtonPrimary type="button" textName="Crear wallet" status={StatusButton.Enabled} customClickEvent={() => navigate(routesNamesApp.balance, { replace: true })} /> */}
                            {/* <p onClick={() => navigate(routesNamesAuth.login)} className="mb-5 textButton text-globalWhite">Iniciar sesión</p> */}
                        </span>
                    </div>
                </div>

            </div>
        </>
    )
}
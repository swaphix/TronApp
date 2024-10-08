/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import OptionCardHome from "./components/OptionCardHome";
import { useNavigate } from "react-router";
import { routesNamesApp } from "../../routes/routesNames";
import pay from "../../../../assets/images/home/pay.png";
import conversor from "../../../../assets/images/home/conversor.png";
import { ChangeIsBack, ChangeIsFooter, changeStatusNavBar } from "../../../../redux/mainSlice";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { lsUserName } from "../../../../common/constants/constants";
import UserService from "../../../../services/userService";




const HomePage = () => {
    const [user, setNameData] = useState('');
    const navigate = useNavigate()
    const dispatch = useDispatch()

    // =============== INIT ================= 
    const initData = async () => {
        dispatch(ChangeIsBack({ isBack: false }))
        dispatch(ChangeIsFooter({ isViewFooter: false }))

        try {
            const response = await UserService.getInfo()
            if (!response.active) {
                toast.error('cuenta no activa')
                dispatch(changeStatusNavBar({ statusNavbar: 1 }))
            } else {
                setNameData(response.username)
                localStorage.setItem(lsUserName, response.username)
                if (response.status === 'registered') {
                    dispatch(changeStatusNavBar({ statusNavbar: 2 }))
                } else {
                    dispatch(changeStatusNavBar({ statusNavbar: 3 }))
                }
            }

        } catch (error:any) {
            setNameData('')
            dispatch(changeStatusNavBar({ statusNavbar: 1 }))
            console.error(error)
        }

    };
    useEffect(() => {
        initData();
    }, []);

    // =============== INIT ================= 

    return (<>
        <div className="my-1 sm:my-0">
            {user !== '' ? <div className="w-full flex justify-center">
                <span className="text-center font-normal text-xs">
                    Hola, {user}
                </span>
            </div> : <></>}
            <h1 className="titleTxt mt-3">
                ¿Qué haremos hoy?
            </h1>
            <div className="flex  flex-wrap flex-row items-center justify-center">
                <OptionCardHome
                    enable={true}
                    image={conversor}
                    action={() => {
                        navigate(routesNamesApp.newConversion)
                        dispatch(ChangeIsFooter({ isViewFooter: false }))
                    }}
                    title="Convertir cripto a pesos (MXN)" />
                <OptionCardHome
                    enable={false}
                    image={pay}
                    action={() => navigate(routesNamesApp.newTransactionPage)}
                    title="Recibir un pago en cripto" />
            </div>


        </div>
    </>)
}


export default HomePage;
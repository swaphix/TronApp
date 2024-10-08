/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect } from "react";

import { useDispatch } from "react-redux";

import swaphixHome from "../../../../assets/images/swaphixHome.png"
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import '../../../../assets/styles/backGroundApp.css'
import { routesNamesAuth } from "../../routes/routesNames.ts";
import { ChangeIsBack, ChangeViewLogin, changeStatusNavBar } from "../../../../redux/mainSlice.ts";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { changeEmail } from "../../../../redux/userSlice.ts";
import { ButtonPrimary, StatusButton } from "../../../../common/components/ButtonPrimary.tsx";
import AuthService from "../../../../services/authService.ts";

export const LoginPage = () => {
    //=============  REACT FORM ============= 
    type FormValues = {
        email: string,
    }

    const { register, handleSubmit, formState: { errors }, watch} = useForm<FormValues>()
    const fieldWatch = watch('email')

    //=============  REACT FORM ============= 

    const dispatch = useDispatch();
    const [statusButton, setStatusButton] = useState(StatusButton.Enabled);
    const navigate = useNavigate();
    const onSubmit = async (data: any) => {
        try {
            dispatch(changeEmail({email:data.email}))
            navigate(routesNamesAuth.loginPassword)
        } catch (e: any) {
            setStatusButton(StatusButton.Enabled);
            toast.error( e.message);
        }
    }


    const init = async () => {
        try{
            await AuthService.refreshToken()
            // navigate(routesNamesApp.balance)
        }catch(e){
            dispatch(ChangeViewLogin({
                loginView: false,
            }))
            dispatch(changeStatusNavBar({statusNavbar: 1}))
            dispatch(ChangeIsBack({
                isBack: false,
            }))
        }
        
    }
    useEffect(() => {
        init()
    }, []);

    useEffect(() => {
        if ( fieldWatch !== '') {
            setStatusButton(StatusButton.Enabled)
        }else{
            setStatusButton(StatusButton.Disabled)
        }
    }, [fieldWatch]);

    return (
        <div className="flex flex-row items-center">
            <div className="ocultarenmobile w-1/2 h-full" >
                <img src={swaphixHome} className="w-[150px] ml-auto mr-auto"></img>
            </div>
        
                
            <div className="w-full sm:w-1/2">
                <div className="flex flex-row justify-center w-full mb-10">
                    <span className="titleTxt">
                        Iniciar sesión
                    </span>
                </div>
                
                
                <div className="">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="w-full">
                        <label htmlFor="email" className="labelTxt">Email</label>
                        <input className="inputNumber" placeholder='Ejemplo: micorreo@gmail.com' type="email" {...register('email',
                            {
                                required: {
                                    value: true,
                                    message: "Ingresa un Email valido"
                                },
                                pattern: {
                                    value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                                    message: 'Ingresa un e-mail válido'
                                }
                            })} />
                        {errors.email && <span className="errorTxt">{errors.email.message}</span>}
                    </div>
                    <ButtonPrimary type="submit" textName="Siguiente" status={statusButton} />
                </form>
                </div>
            </div>
        </div>

    );
}
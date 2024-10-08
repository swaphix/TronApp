/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";

import swaphixHome from "../../../../assets/images/swaphixHome.png"
import { useState } from "react";
import { useNavigate } from "react-router-dom";
// import InputField from "../../../../common/components/InputField.tsx";
import '../../../../assets/styles/backGroundApp.css'
import { ChangeIsBack, ChangeViewLogin, changeStatusNavBar } from "../../../../redux/mainSlice.ts";
import toast from "react-hot-toast";
import useShowPasswordHandling from "../../../../hooks/useShowPassword.tsx";
// import { validateField } from "../../../../common/helpers/validate_field.ts";
import { useForm } from "react-hook-form";
import { routesNamesAuth } from "../../routes/routesNames.ts";
import { ButtonPrimary, StatusButton } from "../../../../common/components/ButtonPrimary.tsx";
import AuthService from "../../../../services/authService.ts";
import { routesNamesApp } from "../../../user/routes/routesNames.ts";

export const LoginPasswordPage = () => {
    //=============  REACT FORM ============= 
    type FormValues = {
        password: string,
    }

    const { register, handleSubmit, formState: { errors }, watch} = useForm<FormValues>()
    const fieldWatchPas = watch('password')

    //=============  REACT FORM ============= 

    const dispatch = useDispatch();
    const [statusButton, setStatusButton] = useState(StatusButton.Enabled);
    const userData = useSelector((state: any) => state.user)
    const { showPassword, view } = useShowPasswordHandling();



    const navigate = useNavigate();
    const init = () => {
        if (userData.email === ''){
            navigate(routesNamesAuth.login,{ replace:true})
        }
        dispatch(ChangeViewLogin({
            loginView: false,
        }))
        dispatch(changeStatusNavBar({statusNavbar: 1}))
        dispatch(ChangeIsBack({
            isBack: true,
        }))
        
    }
    useEffect(() => {
        init()
    }, []);
    const onSubmit = async (data:any) => {
        try {
            setStatusButton(StatusButton.Loading)
            await  AuthService.loginUser(userData.email, data.password);
            await AuthService.refreshToken()
            toast.success('Sesión iniciada')
            setStatusButton(StatusButton.Enabled)
            navigate(routesNamesApp.balance, { replace: true })
            
        } catch (error: any) {
            setStatusButton(StatusButton.Enabled)
            toast.error(error.message)
        }

    }


    useEffect(() => {
        if (fieldWatchPas !== '') {
            setStatusButton(StatusButton.Enabled)
        }else{
            setStatusButton(StatusButton.Disabled)
        }
    }, [fieldWatchPas]);

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
                        <label htmlFor="password" className="labelTxt">Contraseña</label>
                        <div className="relative">
                            <input className="inputNumber" placeholder='*********' maxLength={11} minLength={3} type={showPassword} {...register('password',
                                {
                                    required: {
                                        value: true,
                                        message: "La contraseña es requerida"
                                    },
                                    validate: (value: any) => {
                                        const pattern2 = /^[^\s]+$/;
                                        if (!value.match(pattern2)) {
                                            return 'La contraseña no puede contener espacios';
                                        }
                                        return true;
                                    },
                                })} />
                            {
                                showPassword === 'text' ?
                                    <i onClick={() => view()} className="cursor-pointer absolute  right-1 top-3 bottom-0 pi pi-eye-slash text-purple" style={{ fontSize: '1.3rem' }}></i>
                                    : <i onClick={() => view()} className="cursor-pointer absolute  right-1 top-3 bottom-0 pi pi-eye text-purple" style={{ fontSize: '1.3rem' }}></i>
                            }
                        </div>

                        {errors.password && <span className="errorTxt">{errors.password.message}</span>}
                    </div>
                    <ButtonPrimary type="submit" textName="Iniciar sesión" status={statusButton} />
                </form>
                </div>
            </div>
        </div>

    );
}
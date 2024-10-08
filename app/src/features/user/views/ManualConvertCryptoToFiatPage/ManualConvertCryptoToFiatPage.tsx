/* eslint-disable @typescript-eslint/no-explicit-any */
import { ButtonPrimary, StatusButton } from "../../../../common/components/ButtonPrimary.tsx";



import downArrow from "../../../../assets/images/downArrow.png"
import iconAmount from "../../../../assets/images/iconAmount.jpg"

import { useForm } from "react-hook-form";
import useSendCryptoToFiat from "../../hooks/useSendCryptoToFiat.ts";
import { useEffect } from "react";


const ManualConvertCryptoToFiatPage = () => {
    type FormValues = {
        amount: number,
        wallet: string
    }
    const { register, handleSubmit, formState: { errors },
        watch, setError, setValue, getValues } = useForm<FormValues>()
    const formMethods = {
        register, errors,
        setValue, getValues,
        setError, watch
    }
    const changueMaxAmountBalance = () => {
        setValue('amount', Number(selectWallet?.balance.toString()))
    }

    const {
        user,
        transaccionData,
        counter,
        statusButton,
        selectWallet,
        initDataManual,
        onSubmit
    } = useSendCryptoToFiat(formMethods)
    const onSend  = async ()=>{
        await onSubmit(true)
    }
    useEffect(() => {
        initDataManual();
    }, []);
    return (<>
        <div className="my-0">
            <div className="w-full flex justify-center">
                <span className="text-center font-normal text-xs">
                    Hola, {user}
                </span>
            </div>

            <h1 className="titleTxt">
                Cambiar
            </h1>
        </div>
        <div className='flex flex-col items-center justify-center'>
            <form onSubmit={handleSubmit(onSend)}>
                {/* CRYPTO */}
                <div className="flex flex-row justify-between items-center mt-3 w-full">
                    <div className="flex flex-row justify-between items-center mr-5">
                        <span className="font-bold mr-1">Crypto: </span>
                        <div className="bg-grayLow flex flex-row items-center justify-center py-1 mh-4 rounded-lg gap-2 px-6 font-bold text-sm">
                            <img src={selectWallet?.icon} alt="" className="h-5" />
                            {selectWallet?.crypto}
                        </div>
                    </div>
                    <div className="flex flex-row justify-between items-center w-1/2">
                        <span className="font-bold mr-1">Red: </span>
                        <div className="bg-grayLow flex flex-row mh-4 rounded-lg py-1 gap-2 px-5 font-bold text-sm">{selectWallet?.network}</div>
                    </div>
                </div>
                <div className="w-full flex flex-row items-center justify-between mt-2">
                    <div className="relative w-full">

                        <input className="inputNumber text-end max-w-sm" placeholder='200'
                            type={'number'} {...register('amount',
                                {
                                    required: {
                                        value: true,
                                        message: "El campo es requerido"
                                    },
                                    validate: (value: any) => {
                                        const pattern2 = /^[^\s]+$/;
                                        if (!value.match(pattern2)) {
                                            return 'El campo no puede contener espacios';
                                        }
                                        return true;
                                    },
                                })} />
                        <div className="absolute bottom-0 left-2 top-2">
                            <span className="font-bold text-purple no-underline text-sm" onClick={changueMaxAmountBalance}>MAX</span>
                        </div>
                    </div>

                </div>

                <div className="w-full flex flex-row items-start justify-between mt-2">
                    <span className="text-purple text-xs">Monto minimo 8 {selectWallet?.crypto}</span>
                    <div className="flex flex-col text-xs w-1/2">
                        <div className="flex flex-row justify-between">
                            <span className="font-bold">Disponible:</span>
                            <span>{selectWallet?.balance} {selectWallet?.crypto}</span>
                        </div>
                        <div className="flex flex-row justify-between">
                            <span className="font-bold">Commisión:</span>
                            <span>{transaccionData.comision} {selectWallet?.crypto}</span>
                        </div>
                    </div>
                </div>
                <div className="w-full mt-3 flex flex-col items-center">
                    <img src={downArrow} alt="" className="mt-10 h-[30px] " />

                </div>
                <div className="w-full mt-5 flex flex-col items-center">
                    <span className="font-bold text-black">Monto aproximado a recibir:</span>
                    <div className="w-full bg-grayLow flex flex-row justify-center items-center py-2 mh-4 rounded-lg gap-2 px-5 ">
                        <span className={transaccionData.totalMostrar.length > 3 ? "w-full tex-black text-xl font-bold" : "w-full tex-black text-3xl font-bold"}>{transaccionData.totalMostrar.toLocaleString()}</span>
                        <img src={iconAmount} alt="" className="h-[25px] " />
                        <span className="tex-black text-sm font-bold" >Pesos (MXN)</span>
                    </div>
                </div>

                {statusButton == StatusButton.Enabled && <div className="w-full mt-5 flex flex-col items-center">
                    <span>Se actualizará en:</span>
                    <span>{counter}</span>
                </div>}
                <div className="mt-5"></div>
                <span className="font-bold text-xs">Comisiones por operación:</span> <br />
                <span className="text-xs">70 USDT: 2.5 USD + gas fees.</span> <br />
                <span className="text-xs">70 USDT: 3.5% del valor total de la operación + gas fees.</span> <br />
                <span className="mt-2 text-xs">Transacción impulsada por
                </span>
                <a href="" className="text-purple underline ml-1 cursor-pointer text-xs">koywe.com</a>

                <ButtonPrimary type="submit" textName="Siguiente" status={statusButton} />
            </form>
        </div>

    </>)
}

export default ManualConvertCryptoToFiatPage;
/* eslint-disable @typescript-eslint/no-explicit-any */
import { ButtonPrimary, StatusButton } from "../../../../common/components/ButtonPrimary.tsx";

import downArrow from "../../../../assets/images/downArrow.png"
import { useEffect, useState } from "react";
import { lsAddressSendTo, lsAmountSendTo, lsUUIDUser, lsUserName, lswalletSelect } from "../../../../common/constants/constants.ts";
import { ChangeIsBack, changeStatusNavBar } from "../../../../redux/mainSlice.ts";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import EncryptTools from "../../../../common/utils/Encrypted.ts";
import { WalletUser } from "../../../../models/wallet_model.ts";
import { TransactionModel } from "../../../../models/transaction_model.ts";
import AuthService from "../../../../services/authService.ts";
import toast from "react-hot-toast";
import { TypeAccountTransfer } from "../../../../models/enums.ts";
import { useNavigate } from "react-router";
import { routesNames } from "../../../../routes/routes.ts";
import TerminalService from "../../../../services/terminalService.ts";


const TransferCryptoPage = () => {
    const navigate = useNavigate();
    const [user, setNameData] = useState('');
    const [selectWallet, setSelectWallet] = useState<WalletUser>()
    const dispatch = useDispatch();
    const [transaccionData, setTransaccionData] = useState(new TransactionModel('USDT Tron', 'TRON', '0.0', '0.0', ''));
    const uuidUser = localStorage.getItem(lsUUIDUser) ??''
    //=============  REACT FORM ============= 
    type FormValues = {
        amount: number,
        wallet: string,
        email: string
    }

    const { register, handleSubmit, formState: { errors }, watch, setError, setValue, getValues } = useForm<FormValues>()
    const amountWatched = watch('amount');




    const [statusButton, setStatusButton] = useState(StatusButton.Disabled);

    //=============  REACT FORM ============= 
    // =============== INIT ================= 
    const initData = async () => {
        dispatch(changeStatusNavBar({ statusNavbar: 0 }))
        dispatch(ChangeIsBack({ isBack: true }))
        const nameLs = localStorage.getItem(lsUserName) ?? '';
        setNameData(nameLs);
        const walletSelect = localStorage.getItem(lswalletSelect)
        const dataWallet = EncryptTools.decrypt(walletSelect)
        const wallet = WalletUser.fromJSON(dataWallet)
        setSelectWallet(wallet)
    };
    useEffect(() => {
        initData();
    }, []);


    const changueMaxAmountBalance = () => {
        setValue('amount', Number(selectWallet?.balance.toString()))
    }
    const onSubmit = async () => {
        try {
            let emailOrAddres = ''
            let typeAccountSend = TypeAccountTransfer.Email
            const wallet = getValues('wallet')
            const email = getValues('email')
            if (wallet === '' && email === '') {
                toast.error('Ingresa un correo o una wallet')
                return;
            }
            if (wallet !== '' && email != '') {
                setError('wallet', { type: 'manual', message: 'Solo puedes ingresar correo o wallet' })
                setError('email', { type: 'manual', message: 'Solo puedes ingresar correo o wallet' })
                return;
            }

            setStatusButton(StatusButton.Loading)
            if (email != '') {
                const responseValidate = await AuthService.validateEmail(email)
                if (responseValidate && !responseValidate.result) {
                    setError('email', { type: 'manual', message: 'No se encontró cuenta' })
                    toast.error('No se encontró cuenta con el correo proporcionado')
                    setStatusButton(StatusButton.Enabled)
                    return
                }
                emailOrAddres = email
                typeAccountSend = TypeAccountTransfer.Email
            }
            if (wallet != '') {
                const responseValidate = await TerminalService.validateAddress(wallet ?? '', selectWallet?.network ?? '')
                if (!responseValidate) {
                    setError('wallet', { type: 'manual', message: 'Wallet no valida' })
                    toast.error('Wallet no valida')
                    setStatusButton(StatusButton.Enabled)
                    return
                }
                emailOrAddres = wallet
                typeAccountSend = TypeAccountTransfer.Address

            }
            setError('wallet', { type: 'manual', message: '' })
            setError('email', { type: 'manual', message: '' })

            await TerminalService.sendCrypto(uuidUser, 
                selectWallet?.network ??'', 
                amountWatched,
                selectWallet?.crypto ??'',
                emailOrAddres,
                typeAccountSend
            );
            localStorage.setItem(lsAddressSendTo, emailOrAddres)
            localStorage.setItem(lsAmountSendTo, amountWatched.toString())
            setStatusButton(StatusButton.Enabled)
            navigate(routesNames.messageSuccesstransferCrypto, { replace: true })
            setStatusButton(StatusButton.Enabled)

        } catch (error: any) {
            setStatusButton(StatusButton.Enabled)
            toast.error(error.message)
        }
    }




    const validateAmountAndRequestConvert = async () => {
        try {
            if (amountWatched != undefined) {
                if (amountWatched <= 8) {
                    console.log('Amount')
                    setError('amount', { type: 'manual', message: 'El monto debe ser mayor a 8' })
                    setStatusButton(StatusButton.Disabled)
                    return
                }

            }
            setError('amount', { type: 'manual', message: '' })
            const response = await TerminalService.getCurrencyCryptoToCrypto(amountWatched, selectWallet?.crypto.toString() ?? '', selectWallet?.network.toString() ?? '')
            const newTransaction = new TransactionModel(
            selectWallet?.crypto??'', 
            selectWallet?.network??'', '0.0', response?.total_out_convert,response?.commisions.total_commision)
            setTransaccionData(newTransaction)
            setStatusButton(StatusButton.Enabled)
        } catch (e: any) {
            console.error(e.message)
        }

    }

    useEffect(() => {
        if (amountWatched != undefined && amountWatched > 0) {
            validateAmountAndRequestConvert()
        }
    }, [amountWatched]);

    return (<>
        <div className="my-0">
            <div className="w-full flex justify-center">
                <span className="text-center font-normal text-xs">
                    Hola, {user}
                </span>
            </div>

            <h1 className="titleTxt">
                Transferir
            </h1>
        </div>
        <div className='flex flex-col items-center justify-center '>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="w-full mt-2 ">
                    <span className="font-bold mr-1">A una cuenta de correo Swaphix: </span>
                    <input className="inputNumber text-start max-w-sm" placeholder='usuario_swaphix@email.com'
                        type={'email'} {...register('email',
                            {
                                required: {
                                    value: false,
                                    message: ""
                                },
                                // validate: (value: any) => {
                                //     const pattern2 = /^[^\s]+$/;
                                //     if (!value.match(pattern2)) {
                                //         return 'El campo no puede contener espacios';
                                //     }
                                //     return true;
                                // },
                            })} />
                    {errors.email && <span className="errorTxt">{errors.email.message}</span>}

                </div>
                <div className="w-full h-24  flex flex-col items-start mt-3">
                    <p className="font-bold">O, a otra wallet:</p>
                    <textarea className="inputTextArea text-start"
                        placeholder='0x…' {...register('wallet',
                            {
                                required: {
                                    value: false,
                                    message: ""
                                },
                            })} />
                    {errors.wallet && <span className="errorTxt">{errors.wallet.message}</span>}

                </div>
                <div className="w-full mt-3 flex flex-col items-center">
                    <img src={downArrow} alt="" className="mt-10 h-[30px] " />
                </div>
                {/* CRYPTO */}
                <div className="flex flex-row justify-between items-center mt-3">
                    <div className="flex flex-row justify-between items-center">
                        <span className="font-bold mr-1">Crypto: </span>
                        <div className="bg-grayLow flex flex-row items-center py-1 mh-4 rounded-lg gap-2 px-5 font-bold text-sm ">
                            <img src={selectWallet?.icon} alt="" className="h-5" />
                            {selectWallet?.crypto}
                        </div>
                    </div>
                    <div className="flex flex-row justify-between items-center">
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

                <div className="w-full flex flex-row items-center justify-between mt-5">
                    <span className="font-bold text-black">Monto a recibir:</span>
                    <div className="w-1/2 bg-grayLow flex flex-row justify-center items-center py-1 mh-4 rounded-lg gap-2 px-5 ">
                        <span className={transaccionData.totalMostrar.length > 3 ? "w-full tex-black text-lg font-bold" : "w-full tex-black text-2xl font-bold"}>{transaccionData.totalMostrar}</span>
                        <img src={selectWallet?.icon} alt="" className="h-[15px] " />
                        <span className="tex-black text-sm font-bold" >{selectWallet?.crypto}</span>
                    </div>
                </div>
                <ButtonPrimary type="submit" textName="Siguiente" status={statusButton} />
            </form>
        </div>

    </>)
}

export default TransferCryptoPage;
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from 'react'
import { TransactionModel } from '../../../models/transaction_model';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { StatusButton } from '../../../common/components/ButtonPrimary';
import { ChangeIsBack, changeStatusNavBar } from '../../../redux/mainSlice';
import { lsAmountConvert, lsAmountSendTo, lsUUIDUser, lsUserName, lswalletSelect } from '../../../common/constants/constants';
import TerminalService from '../../../services/terminalService';
import toast from 'react-hot-toast';
import UserService from '../../../services/userService';
import { routesNames } from '../../../routes/routes';
import { WalletUser } from '../../../models/wallet_model';
import EncryptTools from '../../../common/utils/Encrypted';

type OptionSelect = {
  value: string; // o el tipo que corresponda
  label: string; // otras propiedades que tenga tu opción
  iconUrl: string;
}
const useSendCryptoToFiat = (formMethods: any) => {
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const [user, setNameData] = useState('');
  const [transaccionData, setTransaccionData] = useState(new TransactionModel('USDT Tron', 'TRON', '0.0', '0.0', ''));
  const [selectWallet, setSelectWallet] = useState<WalletUser>()
  const [options, setOptions] = useState<Array<OptionSelect>>([]);
  const [cryptos, setCryptos] = useState(new Map());
  const [requestConvertion, setRequestConvertion] = useState(false);

  //TRUE O FALSE SI AUN ESTA EN PROCESO LA CONVERSION PARA NO ENVIAR PETICIONES DOBLES
  const [isLoadingConvert, setIsLoadingConvert] = useState(false);

  const { setValue, getValues, watch, setError } = formMethods
  const amountWatched = watch('amount');
  const [statusButton, setStatusButton] = useState(StatusButton.Disabled);
  const [counter, setCounter] = useState(30);
  const uuidUser = localStorage.getItem(lsUUIDUser) ?? ''

  const initData = async () => {

    dispatch(ChangeIsBack({ isBack: false }))
    const nameLs = localStorage.getItem(lsUserName) ?? '';
    setNameData(nameLs);
  };

  const initDataManual = async () => {
    dispatch(changeStatusNavBar({ statusNavbar: 0 }))
    dispatch(ChangeIsBack({ isBack: true }))
    const nameLs = localStorage.getItem(lsUserName) ?? '';
    setNameData(nameLs);
    const walletSelect = localStorage.getItem(lswalletSelect)
    const dataWallet = EncryptTools.decrypt(walletSelect)
    const wallet = WalletUser.fromJSON(dataWallet)
    setSelectWallet(wallet)
    let crypto = 'USDT '
    if (wallet.network == 'TRON' && wallet.crypto == 'USDT') {
      crypto = 'USDT Tron'
    }
    const model = new TransactionModel(
      crypto,
      wallet.network,
      '0.0', '0.0', '')
    setTransaccionData(
      model
    )
  }
  const loadCryptos = async () => {
    try {
      const items = new Map();
      // const itemsSelect = [];

      const response = await TerminalService.getCryptos()
      const options: OptionSelect[] = []
      for (let index = 0; index < response.length; index++) {
        const element = response[index];
        items.set(element.id, { network: element.network, crypto: element.crypto })
        options.push({ value: element.symbol, label: element.crypto, iconUrl: element.icon_path })
      }
      setCryptos(items);
      setOptions(options);
    } catch (e: any) {
      toast.error(e.message)
    }

  }
  const copyWallet = async () => {
    try {
      const walletTemp = getValues('wallet')

      navigator.clipboard.writeText(walletTemp)
      toast.success('Wallet copiada')
    } catch (e: any) {
      toast.error('No se copiaron los datos' + e.message.toString())
    }
  }


  const handleCripto = (event: any) => {
    const select = cryptos.get(event.value)
    // setCryptoSelected(select)
    setTransaccionData(new TransactionModel(
      event.value, select.network,
      transaccionData.montoPesos,
      transaccionData.totalMostrar,
      transaccionData.comision));

  };

  const validateAmountAndRequestConvert = async () => {
    try {
      if (amountWatched != undefined) {
        if (amountWatched <= 7) {
          console.log('Amount')
          setError('amount', { type: 'manual', message: 'El monto debe ser mayor a 8' })
          setStatusButton(StatusButton.Disabled)
          setRequestConvertion(false)
          // setIsLoadingConvert(false)
          return
        }

      }
      setIsLoadingConvert(true)
      const walletCurrent = getValues('wallet')
      setError('amount', { type: 'manual', message: '' })
      const response = await TerminalService.getCurrencyCryptoFiat(amountWatched, transaccionData.from_currency, 'MXN')
      transaccionData.totalMostrar = response?.total_out_convert
      transaccionData.comision = response?.commisions.total_commision_pay_client
      if (walletCurrent === '' || walletCurrent === undefined) {
        try {
          const walletResponse = await UserService.getAddressWallet(transaccionData.network, uuidUser)
          setValue('wallet', walletResponse.address)
        } catch (e: any) {
          setIsLoadingConvert(false)
          console.error(e.message)
        }
      }
      setRequestConvertion(true)
      setIsLoadingConvert(false)
      setStatusButton(StatusButton.Enabled)
    } catch (e: any) {
      setIsLoadingConvert(false)
      setRequestConvertion(false)
      console.error(e.message)
    }

  }


  const onSubmit = async (isManual: boolean) => {
    try {
      setStatusButton(StatusButton.Loading)
      setIsLoadingConvert(true)
      const response = await UserService.getInfo();
      if (response.status !== 'verified') {
        // toast.error('Para usar nuestros servicios, porfavor verifica tu cuenta');
        // navigate(routesNames.messageAccountNotVerify)
        toast.error('cuenta no verificada')
      } else {
        await TerminalService.sendFiat(uuidUser,
          transaccionData.network, amountWatched,
          transaccionData.from_currency, 'MXN')
        if (isManual) {
          localStorage.setItem(lsAmountSendTo, amountWatched.toString())
          localStorage.setItem(lsAmountConvert, transaccionData.totalMostrar.toString())
          navigate(routesNames.messageSuccessConvertionManualDirectCrypto, { replace: true })
        }else{
          navigate(routesNames.messageSuccessConvertionDirectCrypto, { replace: true })

        }
      }
      setStatusButton(StatusButton.Enabled)

    } catch (error: any) {
      setIsLoadingConvert(false)
      setStatusButton(StatusButton.Enabled)
      toast.error(error.message)
    }
  }
  useEffect(() => {
    if (amountWatched != undefined && amountWatched > 0) {
      setCounter(30)
      validateAmountAndRequestConvert()
    }
  }, [amountWatched]);

  useEffect(() => {
    if (requestConvertion) {
      const intervalId = setInterval(() => {
        if (!isLoadingConvert) {
          console.log(`==============  COUNTER ${counter} ==============`);
          setCounter((prevCounter) => prevCounter - 1); // Functional update
          console.log(`==============  COUNTER CHANGE ${counter} ==============`);
        }
        // This will still log the old value
      }, 1000);

      return () => {
        clearInterval(intervalId);
      };
    }
  }, [requestConvertion]);
  useEffect(() => {
    if (counter === 0) {
      setIsLoadingConvert(true)
      setCounter(30)
      validateAmountAndRequestConvert()
    }
  }, [counter]);
  useEffect(() => {
  }, []);

  return {
    user,
    setNameData,
    transaccionData,
    setTransaccionData,
    options,
    setOptions,
    cryptos,
    setCryptos,
    requestConvertion,
    setRequestConvertion,
    isLoadingConvert,
    setIsLoadingConvert,
    statusButton,
    setStatusButton,
    setCounter,
    counter,
    selectWallet,
    initData,
    loadCryptos,
    copyWallet,
    handleCripto,
    validateAmountAndRequestConvert,
    initDataManual,
    onSubmit
  }
}

export default useSendCryptoToFiat

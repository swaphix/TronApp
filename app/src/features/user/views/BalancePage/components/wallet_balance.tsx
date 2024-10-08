import React from 'react';
import { useNavigate } from 'react-router';
import { routesNamesApp } from '../../../routes/routesNames';
import { lswalletSelect } from '../../../../../common/constants/constants';
import EncryptTools from '../../../../../common/utils/Encrypted';
import { ShimmerDiv, ShimmerButton } from "shimmer-effects-react";
import { WalletUser } from '../../../../../models/wallet_model';


interface WalletUserProps {
  wallet: WalletUser | undefined;
  isActive: boolean;
  isShimmer: boolean;

}



const WalletBalance: React.FC<WalletUserProps> = ({ wallet, isActive, isShimmer }) => {
  const navigate = useNavigate();

  const newTransfer = (wallet: WalletUser) => {
    const walletEncode = wallet.toJSON()
    const data = EncryptTools.encrypt(walletEncode)
    localStorage.setItem(lswalletSelect, data)
    navigate(routesNamesApp.transferCrypto)
  }
  const newConvert = (wallet: WalletUser) => {
    const walletEncode = wallet.toJSON()
    const data = EncryptTools.encrypt(walletEncode)
    localStorage.setItem(lswalletSelect, data)
    navigate(routesNamesApp.newConversionManual)
  }
  return isShimmer ? <div
    className="account flex-col justify-start w-full items-center mt-3 py-3">
    <div className="flex flex-row justify-between w-full items-center">
      <div className="flex flex-row items-center justify-start mb-2">
        <ShimmerDiv rounded={10} border={0} height={20} width={20} mode="custom" from="#FFFFFF" via="#EEEDED" to="#EEEDED" />
        <ShimmerDiv className='ml-2' rounded={2} border={0} height={15} width={50} mode="custom" from="#FFFFFF" via="#EEEDED" to="#EEEDED" />
      </div>
      <div className="flex flex-row items-start">
        <ShimmerDiv className='' rounded={2} border={0} height={15} width={150} mode="custom" from="#FFFFFF" via="#EEEDED" to="#EEEDED" />
      </div>
    </div>
    <div className="flex flex-row justify-between w-full items-center">
      <div className="flex flex-row items-center justify-start">
        <ShimmerDiv className='' rounded={2} border={0} height={15} width={100} mode="custom" from="#FFFFFF" via="#EEEDED" to="#EEEDED" />
      </div>
      <div className="flex flex-row items-start">
        <ShimmerDiv className='' rounded={2} border={0} height={15} width={50} mode="custom" from="#FFFFFF" via="#EEEDED" to="#EEEDED" />
      </div>
    </div>
    <div className="flex flex-row justify-end w-full items-center mt-5">
      <ShimmerButton className='' rounded={2} border={0} height={15} width={100} mode="custom" from="#FFFFFF" via="#EEEDED" to="#EEEDED" />
      <ShimmerButton className='ml-5' rounded={2} border={0} height={15} width={100} mode="custom" from="#FFFFFF" via="#EEEDED" to="#EEEDED" />
    </div>
  </div> : !isActive ? (
    <div className="account flex-col justify-start w-full items-center ">
      <div className="flex flex-row justify-between w-full items-center">
        <div className="flex flex-row items-center justify-start">
          <img src={wallet?.icon} alt="" className="h-5" />
          <span className="font-bold ml-3">{wallet?.crypto}</span>
        </div>
        <div className="flex flex-row items-start">
          <span className="font-bold  text-grayHigh">{wallet?.balance} {wallet?.crypto}</span>
        </div>
      </div>
      <div className="flex flex-row justify-between w-full items-center">
        <div className="flex flex-row items-center justify-start">
          <span className="ml-8 text-xs">{wallet?.network}</span>

        </div>
        <div className="flex flex-row items-start">
          <span className="text-grayHigh">{wallet?.balance_fiat} MXN</span>
        </div>
      </div>
      <div className="flex flex-row justify-end w-full items-center mt-2">
        <span className="textButton text-grayHigh underline mr-10 text-base">Transferir</span>
        <span className="textButton text-grayHigh underline text-base">Cambiar</span>
      </div>
      <div className="divider"></div>
    </div>
  ) : (
    <div className="account flex-col justify-start w-full items-center mt-3 py-3">
      <div className="flex flex-row justify-between w-full items-center">
        <div className="flex flex-row items-center justify-start">
          <img src={wallet?.icon} alt="" className="h-5" />
          <span className="font-bold ml-3">{wallet?.crypto}</span>
        </div>
        <div className="flex flex-row items-start">
          <span className="font-bold ">{wallet?.balance} {wallet?.crypto}</span>
        </div>
      </div>
      <div className="flex flex-row justify-between w-full items-center">
        <div className="flex flex-row items-center justify-start">
          <span className="ml-8 text-xs">{wallet?.network}</span>

        </div>
        <div className="flex flex-row items-start">
          <span className="">{wallet?.balance_fiat} MXN</span>
        </div>
      </div>
      <div className="flex flex-row justify-end w-full items-center mt-2">
        <span className="textButton underline mr-10 text-base" onClick={wallet !== undefined ? () => newTransfer(wallet) : undefined} >Transferir</span>
        <span className="textButton underline text-base" onClick={wallet !== undefined ? () => newConvert(wallet) : undefined}>Cambiar</span>
      </div>
      <div className="divider"></div>
    </div>
  );
};

export default WalletBalance;
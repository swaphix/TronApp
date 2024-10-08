import { useNavigate } from "react-router";
import lightingIcon from "../../../assets/images/lighting.webp";
import { ButtonPrimary, StatusButton } from "../ButtonPrimary";
import { routesNamesApp } from "../../../features/user/routes/routesNames";
import { CloseButton } from "../closeButton";
// improt 

const MessageFastConvertionSuccess = () => {
    const navigate = useNavigate();
    return (
        <div className="bg-splash absolute top-0 left-0 bottom-0 h-screen w-screen overflow-x-auto px-5">
            <div className="h-full w-full my-2 sm:my-0  flex flex-col items-center justify-start">
                <span className="mt-20 w-full">
                    <CloseButton onClick={() => navigate(routesNamesApp.balance, { replace: true })} />
                </span>
                <div className="w-full lg:w-2/6 text-center">
                    <h1 className="splashTxt mb-10 ">
                        Apresúrate a depositar las criptomonedas
                    </h1>
                    <span className="splashTxtSecond">
                        Los  fondos llegarán <br />
                        directamente a tu wallet <br />
                        bancaria tan pronto hagas <br />
                        el deposito
                    </span>
                </div>
                <img src={lightingIcon} className="h-[300px] ml-auto mr-auto"></img>
                <span className="w-full">
                    <ButtonPrimary type="button" textName="Cerrar" status={StatusButton.Enabled} customClickEvent={() => navigate(routesNamesApp.balance, { replace: true })} />
                </span>
            </div>
        </div>

    )
}
export default MessageFastConvertionSuccess;
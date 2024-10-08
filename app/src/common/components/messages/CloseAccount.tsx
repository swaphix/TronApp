import { useNavigate } from "react-router-dom";
import dealIcon from "../../../assets/images/dealIcon.png";
import { routesNamesAuth } from "../../../features/auth/routes/routesNames.ts";
import { cleanMain } from "../../../redux/mainSlice.ts";
import { useDispatch } from "react-redux";
import { cleanUser } from "../../../redux/userSlice.ts";
import { CloseButton } from "../closeButton.tsx";
import { ButtonPrimary, StatusButton } from "../ButtonPrimary.tsx";

export const CloseAccount = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const confirmLogout = () => {
        localStorage.clear();
        localStorage.clear()
        dispatch(cleanMain(
        ));
        dispatch(cleanUser(
        ));
        
        navigate(routesNamesAuth.login, { replace: true })
    }
    return (
        <div className="bg-splash min-h-screen relative">
            <div className="h-100% flex w-full flex-col items-center justify-center">
                <CloseButton onClick={() => navigate(-1)} />
                <div className="w-full px-10 lg:w-2/6">
                    <h1 className="splashTxt mt-[50px]">
                        ¿Quieres cerrar tu sesión?
                    </h1>
                    <img src={dealIcon} className="h-[300px] ml-auto mr-auto"></img>
                    <ButtonPrimary type="button" textName="Cerrar" status={StatusButton.Enabled} customClickEvent={() => confirmLogout()} />
                </div>

            </div>

        </div>
    )
}
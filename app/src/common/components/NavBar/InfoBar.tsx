/* eslint-disable @typescript-eslint/no-explicit-any */
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { routesNamesAuth } from '../../../features/auth/routes/routesNames';
import AuthService from '../../../services/authService';
import { useEffect } from 'react';
import { changeStatusNavBar } from '../../../redux/mainSlice';


const InfoPurple = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const main = useSelector((state: any) => state.main)
  const initData = async () => {
    try {
      const response = await AuthService.refreshToken()
      if (response === null) {
        dispatch(changeStatusNavBar({ statusNavbar: 1}))
      } else {
        dispatch(changeStatusNavBar({ statusNavbar: 2}))
      }
    } catch (e) {
      dispatch(changeStatusNavBar({ statusNavbar: 1}))
    }
  }
  useEffect(() => {
    initData();
  }, []);
  return  main.statusNavbar !== 0 && (
    <div className="bar-purple-info h-6 bg-purple flex flex-row items-center justify-center px-2 text-globalWhite cursor-pointer">
      {/* <span className="text-xs" onClick={() => navigate(routesNamesAuth.login, { replace: true })}>Iniciar sesión</span> */}
      {
        main.statusNavbar === 1 ? <span className="text-xs" onClick={() => navigate(routesNamesAuth.login, { replace: true })}>Iniciar sesión</span>:<span className="text-xs" >¡Recibe cripto y cambiarlo a pesos de forma fácil! </span>
      }
      {/* {
          main.statusNavbar === 1 && <span className="text-xs" onClick={()=>navigate(routesNamesAuth.newAccount, { replace: true })}>Crear cuenta</span> 
        }
        {
          main.statusNavbar === 2 && <span className="text-xs" onClick={()=>navigate(routesNamesAuth.personalData, { replace: true })}>Validar cuenta</span> 
        }
        {
          main.statusNavbar === 3 && <span className="text-xs" onClick={()=>navigate(routesNamesAuth.personalData)}>¡Refiere y gana con el programa de referidos!</span> 
        } */}
    </div>
  );
};

export default InfoPurple;

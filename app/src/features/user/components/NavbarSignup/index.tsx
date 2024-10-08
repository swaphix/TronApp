// import { useNavigate } from "react-router-dom";
// import logo from "../assets/images/SwaphixLogo.png";
// import { routesNames } from "../routes/routes";
// import { useDispatch } from "react-redux";
// import { changeVisible } from "../redux/mainSlice";

// const NavbarSignUp = (props:any) => {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//     const setVisible = (value:boolean) => {
//         dispatch(changeVisible({visible:value}));
//     };

//     if(props.viewButtonMenu){
//       return (
//         <div className="bg-globalWhite py-4">
//           <div className="flex  flex-row tems-center">
//             <div className="flex-1 mb-4">
//               <img src={logo} className="h-6 mx-5" onClick={()=>navigate(routesNames.welcomePage)} ></img>
//             </div>
//             <div className="md:hidden mx-4">
//               <i className="pi pi-align-justify" style={{ fontSize: '2rem' }}  onClick={()=>setVisible(true)}  ></i>
//             </div>
//           </div>
//         </div>
//         )
//     }
//     return (
//       <div className="bg-globalWhite py-4 ">
//         <div className="flex  flex-row tems-center">
//           <div className="flex-1 mb-4">
//             <img src={logo} className="h-6 mx-5"   onClick={()=>navigate(routesNames.welcomePage)}></img>
//           </div>
//           <div className=" mx-4">
//             {
//               props.isLoging ? (<button className="buttonLogin" onClick={()=>navigate(routesNames.login)}>Iniciar sesión</button>):(<div></div>)
//             }
//           </div>
//         </div>
//       </div>
//       )

// }



import { useNavigate } from "react-router-dom";
import logo from "../../../../assets/images/SwaphixLogo.png";
// import { useDispatch, useSelector } from "react-redux";
import { useDispatch } from "react-redux";

import { changeVisible } from "../../../../redux/mainSlice";
import { routesNamesApp } from "../../routes/routesNames";
// import { confirmAlert } from "react-confirm-alert";
// import { routesNames } from "../../../../routes/routes";
// import { routesNamesAuth } from "../../../auth/routes/routesNames";
import InfoPurple from "../../../../common/components/NavBar/InfoBar";
import { lsToken } from "../../../../common/constants/constants";
import useNavigateMain from "../../../../hooks/useNavigateMain";

const NavbarSignUp = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const setVisible = (value: boolean) => {
    dispatch(changeVisible({ visible: value }));
  };
  const token = localStorage.getItem(lsToken) ?? ''
  const { validateAndValidatePage } = useNavigateMain()

  // const navigateOption = (index: number) => {

  //   switch (index) {
  //     case 0:
  //       navigate(routesNamesApp.homePage)
  //       break;
  //     case 1:
  //       navigate(routesNamesApp.newTransactionPage)
  //       break;
  //     case 2:
  //       navigate(routesNamesApp.balance)
  //       break;
  //     case 3:
  //       navigate(routesNamesApp.history)
  //       break;
  //     case 4:
  //       navigate(routesNamesApp.settings)
  //       break;
  //     case 5:
  //       navigate(routesNames.messageLogoutUser);
  //       break;
  //     case 6:
  //       navigate(routesNamesApp.newConversion);
  //       break;
  //     case 7:
  //       navigate(routesNamesAuth.newAccount);
  //       break;
  //   }
  // }

  return (
    <div className="bg-globalWhite py-3 sm:py-4 px-3  w-screen">
      <div className="sm:w-5/6 m-auto flex  flex-row items-center justify-between">
        <div className="">
          <img src={logo} className="h-7" onClick={() => navigate(routesNamesApp.homePage)}></img>
        </div>
        <div className="sm:flex  hidden flex-row justify-between" >
          <span className="desktop-option-side-bar" onClick={() => validateAndValidatePage(0)}>
            <i className="">Balance</i>
          </span>
          {token === null || token === undefined || token === '' && <span className="desktop-option-side-bar" onClick={() => validateAndValidatePage(7)}>
            <i className="">Crear wallet</i>
          </span>}
          {token !== '' && <span className="desktop-option-side-bar" onClick={() => validateAndValidatePage(4)}>
            <i className="">Mi wallet</i>
          </span>}

          {token !== null && token !== undefined && token !== '' && <span className="desktop-option-side-bar" onClick={() => validateAndValidatePage(3)}>
            <i className="">Historial</i>
          </span>}
          {/* <span className="desktop-option-side-bar" onClick={() => navigateOption(1)}>
            <i className="">Transacción QR</i>
          </span>
          <span className="desktop-option-side-bar" onClick={() => navigateOption(2)}>
            <i>Balance</i>
          </span>
          <span className="desktop-option-side-bar" onClick={() => navigateOption(3)}>
            <i>Historial</i>

          </span> */}
          {<span className="desktop-option-side-bar" onClick={() => validateAndValidatePage(2)}>
            <i>Comunidad</i>
          </span>}
          {token !== null && token !== undefined && token !== '' && <span className="desktop-option-side-bar" onClick={() => validateAndValidatePage(5)}>
            <i>Cerrar Sesión</i>
          </span>}
        </div>
        <div className="sm:hidden ">
          <i className="pi pi-align-justify" style={{ fontSize: '2rem' }} onClick={() => setVisible(true)}  ></i>
        </div>
      </div>
      <InfoPurple></InfoPurple>
    </div>
  )

}
export default NavbarSignUp;
import { useNavigate } from "react-router-dom";
import logo from "../../../assets/images/SwaphixLogo.png";
import { routesNames } from "../../../routes/routes";
import InfoPurple from "./InfoBar";
const Navbar = () => {
  const navigate = useNavigate();
  // const dispatch = useDispatch();
  // const setVisible = (value:boolean) => {
  //     dispatch(changeVisible({visible:value}));
  // };
  return (
    <div>
      <div className="bg-globalWhite py-3 sm:py-4 px-3 w-screen">
        <div className="flex  flex-row items-center justify-between">
          <div >
            <img src={logo} className="h-7" onClick={() => navigate(routesNames.initPage)}></img>
          </div>
          {/* <div>
            {
              main.loginView ? (<button className="buttonLogin" onClick={()=>navigate(routesNamesAuth.login)}>Iniciar sesión</button>):(<div></div>)
            }
          </div> */}
        </div>
      </div>
      <InfoPurple></InfoPurple>
    </div>

  )

}
export default Navbar;
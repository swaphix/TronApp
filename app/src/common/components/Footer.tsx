import { useSelector } from "react-redux";
import xIcon from "../../assets/images/X_logo_2023.svg";
// import twitterIcon from "../assets/images/twitterIcon.png";
import linkedinIcon from "../../assets/images/linkedinIcon.png";


const Footer = () => {
  const mainStore = useSelector((state: any) => state.main)

    return mainStore.isViewFooter? ( 
    <div className="w-full sm:absolute sm:bottom-0  sm:bottom-0 mt-10 bg-globalWhite py-4">
      <div className="flex flex-col sm:flex-row gap-8 justify-between">
        <div className="w-full  sm:w-1/2 flex flex-row gap-8 ">
          <div className="flex-1">
              <img src={xIcon} className="socialIconL"></img>
          </div>
          <div className="flex-1">
              <img src={linkedinIcon} className="socialIconR"></img>
          </div>
        </div>
        <div  className="w-full sm:w-1/2 flex flex-row items-center">
          <div className="flex-1 mr-5">
              <div className="legalLabelL">Aviso de Privacidad</div>
          </div>
          <div className="flex-1 ">
              <div className="legalLabelR">Términos y condiciones</div>
          </div>
        </div>
      </div>
    </div>
    ): (<></>)
}
export default Footer;
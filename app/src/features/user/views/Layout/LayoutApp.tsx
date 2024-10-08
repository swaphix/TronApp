/* eslint-disable @typescript-eslint/no-explicit-any */
import { useSelector } from "react-redux";




import Footer from "../../../../common/components/Footer.tsx";
import { Toaster } from "react-hot-toast";
import BackArrow from "../../../../common/components/BackArrow.tsx";
import { Outlet } from "react-router-dom";
import NavbarSignUp from "../../components/NavbarSignup/index.tsx";
import SidebarCustom from "../../components/SideBarCustom/SideBarCustom.tsx";

const LayoutApp = () => {
  const main = useSelector((state: any) => state.main)

  return (
    // <div className="body-back-ground  flex flex-col sm:overflow-auto">
    <div className="body-back-ground  flex flex-col sm:overflow-auto w-screen h-screen items-center justify-start sm:justify-start">
      <Toaster
        position="top-center"
        reverseOrder={false}
      />
      <NavbarSignUp />
      <SidebarCustom />


      {/* <div className="relative h-auto sm:h-3/4 sm:mt-5 flex w-full flex-row items-center justify-center"> */}
      <div className="relative h-auto sm:h-3/4 sm:mt-5 flex w-full flex-row items-center justify-center">
        {/* <div className="bg-globalWhite flex flex-col justify-between items-center  h-full  my-0 pt-0 pr-1 pb-5 sm:mt-20 sm:w-3/4 md:w-2/4 lg:w-3/6 sm:my-5 sm:rounded-xl  sm:mb-10 "> */}
        <div className="bg-globalWhite flex flex-col justify-between items-center h-full w-full  m-0 p-0 sm:mt-20  sm:my-5 md:w-2/4 lg:w-3/6  sm:rounded-xl  sm:mb-10 ">
          {main.isBack?<BackArrow />:<></>}
          <div className="md:overflow-auto h-full m-0 w-full px-4">

          {/* <div className="md:overflow-auto h-full  md:px-10 px-5 mt-3"> */}
            {/* CONTENT ALL */}
            <Outlet />
          </div>
        </div>
      </div>
      <Footer />
    </div>

  );
};

export default  LayoutApp;
/* eslint-disable @typescript-eslint/no-explicit-any */

// import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
import { changeVisible } from '../../../../redux/mainSlice';
import { lsToken } from '../../../../common/constants/constants';
import { motion } from 'framer-motion'
import useNavigateMain from '../../../../hooks/useNavigateMain';

// import { routesNamesApp } from '../../features/user/routes/routesNames';

const SidebarCustom = () => {
    const dispatch = useDispatch();
    // const navigate = useNavigate();
    const token = localStorage.getItem(lsToken) ?? ''
    const { validateAndValidatePage } = useNavigateMain()

    const visible = useSelector((state: any) => state.main.visible)
    const index = useSelector((state: any) => state.main.select)

    const setVisible = (value: boolean) => {
        dispatch(changeVisible({ visible: value }));
    };

    return visible ? (
        <motion.div className="sidebar-container w-full h-full bg-splash absolute">
            {/* <Sidebar style={sidebar} className="p-sidebar-lg color-globalWhite absolute flex-col items-end top-0 h-full w-full sidebar card flex flex-column justify-content-center bg-purple" visible={visible} onHide={() => setVisible(false)} fullScreen> */}
            <div className='mb-10'>
                <button className="float-right p-3 pb-10" onClick={() => setVisible(false)}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-[30px] h-[30px] sm:w-[60px] sm:h-[60px] stroke-globalWhite">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>
            <div className='flex flex-col'>
                {/* onClick={() => selectItem(0)} */}
                <div className={index == 0 ? "item-main-select mt-5" : "item-main  mt-5"} onClick={() => validateAndValidatePage(0)}>
                    <p>Balance</p>
                </div>
                {token === null || token === undefined || token === '' && <div className={index == 7 ? "item-main-select mt-5" : "item-main  mt-5"} onClick={() => validateAndValidatePage(7)}>
                    <p>Crear wallet</p>
                </div>}
                {token !== '' && <div className={index == 4 ? "item-main-select mt-5" : "item-main  mt-5"} onClick={() => validateAndValidatePage(4)}>
                    <p>Mi wallet</p>
                </div>}
                {token !== null && token !== undefined && token !== '' && <div className={index == 3 ? "item-main-select" : "item-main"} onClick={() => validateAndValidatePage(3)}>
                    <p>Historial</p>
                </div>}
                <div className={index == 2 ? "item-main-select" : "item-main"} onClick={() => validateAndValidatePage(2)}>
                    <p>Comunidad</p>
                </div>

                {token !== null && token !== undefined && token !== '' && <div className={index == 5 ? "item-main-select" : "item-main"} onClick={() => validateAndValidatePage(5)}>
                    <p>Cerrar Sesión</p>
                </div>}
            </div>



            {/* </Sidebar> */}
        </motion.div>



    ) : (<></>)
}

export default SidebarCustom;
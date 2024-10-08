import { createSlice } from "@reduxjs/toolkit";

const initialState = {visible:false,select:0, loginView:false,isBack:true, statusNavbar:0, isViewFooter:false};


export const mainSlice = createSlice({
    name: "main",
    initialState,
    reducers: {
    changeStatusNavBar: (state, action) => {
        // 0= LOGIN
        // 1= CREAR CUENTA 
        // 2= VALIDAR CUENTA
        // 3= LOGUEADO Y VALIDADO

        const {statusNavbar} = action.payload;

        return {...state , statusNavbar};
    },
    cleanMain: () => {
        return initialState;
    },
    changeVisible: (state, action) => {
        const {visible} = action.payload;

        return {...state , visible};

    },
    changeSelect: (state, action) => {
        const { select,} = action.payload;

        return {...state , select};

    },
    ChangeViewLogin: (state, action) => {
        const {loginView} = action.payload;
        return {...state , loginView};

    },
    ChangeIsBack: (state, action) => {
        const {isBack} = action.payload;
        return {...state , isBack};

    },
    ChangeIsFooter: (state, action) => {
        const {isViewFooter} = action.payload;
        return {...state , isViewFooter};
    }
    },
});


export const {
    changeVisible,
    changeSelect,
    ChangeViewLogin,
    ChangeIsBack,
    cleanMain,
    changeStatusNavBar,
    ChangeIsFooter

} = mainSlice.actions;
export default mainSlice.reducer;
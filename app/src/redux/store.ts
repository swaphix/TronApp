import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../redux/userSlice";
import mainReducer from "../redux/mainSlice";
import transactionReducer from "../redux/transactionSlice";
import photosReducer from "../redux/photosSlice";




export const store = configureStore({
    reducer: {
        user: userReducer,
        main: mainReducer,
        transaction: transactionReducer,
        photos:photosReducer
    },
});
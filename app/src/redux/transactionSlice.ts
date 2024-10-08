import { createSlice } from "@reduxjs/toolkit";
import { TransactionModel } from "../models/transaction_model";

const initialState = new TransactionModel('','','','','');
export const transactionSlice:any = createSlice({
    name: "transaction",
    initialState,
    reducers: {
    cleanTransaction: () => {
        return initialState;
    },
    changeDataTransaction: (state, action) => {
        const {from_currency,network,montoPesos,totalMostrar,comision} = action.payload;
        return {...state , from_currency,network,montoPesos,totalMostrar,comision};
        // return {...state , visible};
    },
    },
});


export const {
    changeDataTransaction,
} = transactionSlice.actions;
export default transactionSlice.reducer;
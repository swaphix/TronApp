/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice } from "@reduxjs/toolkit";
import { UserModel } from "../models/user_model";


const initialState = new UserModel('', '', '', '', '', '', '', '+52', '', '', '', 0, '', '', '', '', '', '', '', '', false, '', '', '0', '', '', '','','', '','',true, true,null, null,null)

export const userSlice: any = createSlice({
    name: "user",
    initialState,
    reducers: {
        cleanUser: () => {
            return initialState;
        },
        changeDataAuth: (state, action) => {
            const { email, password, secondPassword, password1, password2, name } = action.payload;
            return { ...state, email, password, secondPassword, password1, password2, name };
        },
        changePersonalData: (state, action) => {
            const { names, first_lastname, second_lastname, birthdate, gender } = action.payload;
            return { ...state, names, first_lastname, second_lastname, birthdate, gender };
        },
        changeAddressData: (state, action) => {
            const {
                address_street,
                address_neighborhood,
                address_ext_number,
                address_int_number,
                address_state,
                address_zipcode,
                address_city,
                nationality
            } = action.payload;
            return {
                ...state,
                address_street,
                address_neighborhood,
                address_ext_number,
                address_int_number,
                address_state,
                address_zipcode,
                address_city,
                nationality

            };

        },

        changeIdentifyData: (state, action) => {
            const { cintervancaria, curp, document_number, document_type, bank_code, profession, phone_number, source_of_founds } = action.payload;
            return { ...state, curp, cintervancaria, document_number, document_type, bank_code, profession, phone_number, source_of_founds};
        },

        changeAcceptTerms: (state, action) => {
            const value = action.payload;
            state.isAcceptTerms = value;

        },
        changeEmail: (state, action) => {
            const { email } = action.payload;
            return { ...state, email };

        },
        changeUsername: (state, action) => {
            const { username } = action.payload;
            return { ...state, username };

        },
        changePassword: (state, action) => {
            const { password } = action.payload;
            return { ...state, password };

        },
        changeCodeReference: (state, action) => {
            const { code_reference } = action.payload;
            return { ...state, code_reference };
        },

        changeIdentification: (state, action) => {
            const { id_identification, identification_type, use_identification_current_address } = action.payload;
            return { ...state, id_identification, identification_type, use_identification_current_address };
        },
        changeBenificiary: (state, action) => {
            const { beneficiary_self } = action.payload;
            return { ...state, beneficiary_self };
        },
    },
});


export const {
    changeDataAuth,
    changePersonalData,
    changeAddressData,
    changeIdentifyData,
    changeAcceptTerms,
    cleanUser,
    changeEmail,
    changeUsername,
    changePassword,
    changeCodeReference,
    changeIdentification,
    changeBenificiary

} = userSlice.actions;
export default userSlice.reducer;

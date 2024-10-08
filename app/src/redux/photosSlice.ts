import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    selfie: '',
    selfieImg: '', 
    front: '', 
    frontImg: '', 
    back: '', 
    backImg: '',
    document: '', 
    documentImg: '',
    frontBeneficiary: '', 
    frontBeneficiaryImg: '', 
    backBeneficiary: '', 
    backBeneficiaryImg: '',
}


export const photosSlice: any = createSlice({
    name: "photos",
    initialState,
    reducers: {
        cleanPhotos: () => {
            return initialState;
        },
        saveFacePhoto: (state, action) => {
            const { selfie, selfieImg } = action.payload;
            return { ...state, selfie, selfieImg };
        },
        saveFrontPhoto: (state, action) => {
            const { front, frontImg } = action.payload;
            // debugger
            return { ...state, front, frontImg };
        },
        saveBackPhoto: (state, action) => {
            const { back, backImg } = action.payload;
            return { ...state, back, backImg };
        },
        saveDocumentPhoto: (state, action) => {
            const { document, documentImg } = action.payload;
            return { ...state, document, documentImg };
        },
        saveFrontBenificiaryPhoto: (state, action) => {
            const { frontBeneficiary, frontBeneficiaryImg } = action.payload;
            return { ...state, frontBeneficiary, frontBeneficiaryImg };
        },
        saveBackBenificiaryPhoto: (state, action) => {
            const { backBeneficiary, backBeneficiaryImg } = action.payload;
            return { ...state, backBeneficiary, backBeneficiaryImg };
        },
    }
});


export const {
    saveFacePhoto,
    saveFrontPhoto,
    saveBackPhoto,
    saveDocumentPhoto,
    saveFrontBenificiaryPhoto,
    saveBackBenificiaryPhoto
} = photosSlice.actions;
export default photosSlice.reducer;

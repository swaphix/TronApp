/* eslint-disable @typescript-eslint/no-explicit-any */

import { AxiosError } from "axios";


export const handleError = (e: any) => {
    if (e === undefined) {
        throw new Error('Error desconocido');
    }
    if (e instanceof AxiosError) {
        let message = e.toString();
        if (e.response?.data && 'data' in e.response.data) {
            if (e.response?.data.data && typeof e.response.data.data.error_details !== 'undefined') {
                message = e.response?.data.data.error_details;
            }
        }
        else if (e.response?.data && 'message' in e.response.data) {
            message = e.response.data.message;
        } else {
            message = e.response?.statusText || 'Error desconocido';
        }
        throw new Error(message);
        // throw new ApiError(message, e.response?.data && e.response.status);
    }
    throw new Error(e.message);
}
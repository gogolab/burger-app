import * as actionTypes from "./actionTypes";
import { AUTH_FAIL } from "./actionTypes";

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    };
};

export const authSuccess = authData => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        authData: authData
    };
};

export const authFail = error => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    };
};

export const auth = (email, password) => {
    return dispatch => {
        dispatch(authStart());
    };
    //     .then(response) {
    //         console.log("auth - response data: ", response.data);
    //         dispatch(authSuccess(response.data));
    //     }
    //     .catch(error) {
    //         dispatch(authFail());
    //     }
    // }
};

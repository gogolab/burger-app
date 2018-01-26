import axios from "axios";

import * as actionTypes from "./actionTypes";

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    };
};

export const authSuccess = (userId, idToken) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        userId: userId,
        token: idToken
    };
};

export const authFail = error => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    };
};

export const authLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("expirationTime");
    localStorage.removeItem("userId");
    return {
        type: actionTypes.AUTH_LOGOUT
    };
};

export const checkAuthTimeout = expirationTime => {
    return dispatch => {
        setTimeout(() => {
            dispatch(authLogout());
        }, expirationTime * 1000);
    };
};

export const auth = (email, password, isSignUp) => {
    return dispatch => {
        dispatch(authStart());

        const authData = {
            email: email,
            password: password,
            returnSecureToken: true
        };
        let url =
            "https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyBvZ2RAFNbS__v8wqkOQAN33ReftKu9CcE";
        if (!isSignUp) {
            url =
                "https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyBvZ2RAFNbS__v8wqkOQAN33ReftKu9CcE";
        }

        axios
            .post(url, authData)
            .then(response => {
                console.log(response);
                const expirationTime = new Date(
                    new Date().getTime() + response.data.expiresIn * 1000
                );

                localStorage.setItem("token", response.data.idToken);
                localStorage.setItem("expirationTime", expirationTime);
                localStorage.setItem("userId", response.data.localId);
                dispatch(
                    authSuccess(response.data.localId, response.data.idToken)
                );
                dispatch(checkAuthTimeout(response.data.expiresIn));
            })
            .catch(error => {
                console.log(error);
                dispatch(authFail(error.response.data.error));
            });
    };
};

export const setAuthRedirectPath = path => {
    return {
        type: actionTypes.SET_AUTH_REDIRECT_PATH,
        path: path
    };
};

export const authCheckState = () => {
    return dispatch => {
        const token = localStorage.getItem("token");

        if (!token) {
            dispatch(authLogout());
        } else {
            const expirationTime = new Date(localStorage.getItem("expirationTime"));

            if (expirationTime > new Date()) {
                const userId = localStorage.getItem("userId");
                dispatch(authSuccess(userId, token));
                dispatch(
                    checkAuthTimeout(
                        (expirationTime.getTime() - new Date().getTime()) / 1000
                    )
                );
            } else {
                dispatch(authLogout());
            }
        }
    };
};

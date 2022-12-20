export const LoginStart = (userCredentials) => ({
    type: "LOGIN_START",
});

export const LoginSuccess = (user) => ({
    type: "LOGIN_SUCCESS",
    payload: user,
});

export const LoginFailure = () => ({
    type: "LOGIN_FAILURE",
});

export const ValidationStart = (userCredentials) => ({
    type: "VALIDATION_START",
});

export const ValidationSuccess = () => ({
    type: "VALIDATION_SUCCESS",
});

export const ValidationFailure = () => ({
    type: "VALIDATION_FAILURE",
});

export const Logout = () => ({
    type: "LOGOUT",
});

export const UpdateStart = (userCredentials) => ({
    type: "UPDATE_START",
});

export const UpdateSuccess = (user) => ({
    type: "UPDATE_SUCCESS",
    payload: user,
});

export const UpdateFailure = () => ({
    type: "UPDATE_FAILURE",
});


export const PassUpdateStart = () => ({
    type: "PASS_UPDATE_START"
});

export const PassUpdateSuccess = () => ({
    type: "PASS_UPDATE_SUCCESS"
});

export const PassUpdateFailure = () => ({
    type: "PASS_UPDATE_FAILURE"
});
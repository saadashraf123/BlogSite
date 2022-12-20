const Reducer = (state, action) => {
    switch (action.type) {
        case "LOGIN_START":
            return {
                user: null,
                isFetching: true,
                error: false,
            };
        case "LOGIN_SUCCESS":
            return {
                user: action.payload,
                isFetching: false,
                error: false,
            };
        case "LOGIN_FAILURE":
            return {
                user: null,
                isFetching: false,
                error: true,
            };
        case "UPDATE_START":
            return {
                ...state,
                isFetching: true
            };
        case "UPDATE_SUCCESS":
            return {
                user: action.payload,
                isFetching: false,
                error: false,
            };
        case "UPDATE_FAILURE":
            return {
                user: state.user,
                isFetching: false,
                error: true,
            };
        case "VALIDATION_START":
            return {
                ...state,
                isFetching: true
            };
        case "VALIDATION_SUCCESS":
            return {
                user: state.user,
                isFetching: false,
                error: false,
            };
        case "VALIDATION_FAILURE":
            return {
                user: state.user,
                isFetching: false,
                error: true,
            };
        case "PASS_UPDATE_START":
            return {
                ...state,
                isFetching: true
            };
        case "PASS_UPDATE_SUCCESS":
            return {
                user: state.user,
                isFetching: false,
                error: false,
            };
        case "PASS_UPDATE_FAILURE":
            return {
                user: state.user,
                isFetching: false,
                error: true,
            };
        case "LOGOUT":
            return {
                user: null,
                isFetching: false,
                error: false,
            };
        default:
            return state;
    }
};

export default Reducer;
const userReducer = (state = { error: null,currentUser:{}, token:""}, action) => {
    switch(action.type){
        case "CURRENT_USER":
            return {...state, currentUser: action.payload.user, token: action.payload.token}
        case "ADDED_USER":
            return { ...state, currentUser:action.payload, token: action.payload.token}
        case "ERROR":
            return {...state, error: action.payload}
        default: 
            return state
    }
}

export default userReducer
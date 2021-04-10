const loadingReducer = (state = { loading:true }, action) => {
    switch(action.type){ 
        case "LOADING":
            return  {...state, loading: action.payload }
        default: 
            return state
    }
}

export default loadingReducer
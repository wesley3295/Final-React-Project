const diyReducer = (state = { diys: [],images:[],showDiy:{}, error: null }, action) => {
    switch(action.type){
        case "GOT_DIYS":
            return {...state, diys: action.payload }
        case "REMOVE_DIY":
            return {...state, diys: action.payload }
        case "EDIT_DIYS":
            return {...state, diys: action.payload }
        case "DIY_IMAGES":
            return {...state, images: action.payload }
        case "SHOW_DIY":
            return {...state, showDiy: action.payload}
        case "ADDED_DIY":
            return { ...state, diys: [...state.diys, action.payload] }
        case "ERROR":
            return {...state, error: action.payload}
        default: 
            return state
    }
}

export default diyReducer
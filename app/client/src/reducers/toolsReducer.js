 
 const toolsReducer = (state = { tools: [], error: null}, action) => {
    switch(action.type){
        case "GOT_TOOLS":
            return {...state, tools: action.payload}
        case "ADDED_TOOL":
            return { ...state, tools: [...state.tools, action.payload] }
        case "ERROR":
            return {...state, error: action.payload}
        default: 
            return state
    }
}

export default toolsReducer


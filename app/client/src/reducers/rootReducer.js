import diyReducer from "./diyReducer"
import userReducer from "./userReducer"
import toolsReducer from "./toolsReducer"
import loadingReducer from "./loadingReducer"
import {combineReducers} from 'redux'
export const rootReducer = combineReducers({
   diy: diyReducer,
   user: userReducer,
   tools: toolsReducer,
   loading: loadingReducer
})








import {combineReducers} from "redux"
import {TodoReducer} from "./Reducer"

export const rootReducer = combineReducers({
    todo:TodoReducer,
})
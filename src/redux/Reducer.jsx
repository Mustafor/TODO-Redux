import { ACTIONS } from "./actions"

const initialState = JSON.parse(localStorage.getItem("todos")) || []

export const TodoReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case ACTIONS.create:
            const newUser = { ...action.payload, id: Date.now() }
            newState = [...state, newUser]
            break

        case ACTIONS.delete:
            newState = state.filter(item => item.id !== action.payload)
            break

        case ACTIONS.update:
            newState = state.map(item => {
                if (item.id === action.payload.id) {
                    return {
                        ...item,
                        username: action.payload.newData.username,
                        age: action.payload.newData.age
                    }
                }
                return item
            })
            break

        default:
            return state
    }

    localStorage.setItem("todos", JSON.stringify(newState))

    return newState
}

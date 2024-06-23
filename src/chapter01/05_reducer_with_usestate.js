import { useState } from "react"
import { View, Text, TouchableOpacity } from "react-native"

const useReducer1 = (reducer, initialState) => {
    const [state, setState] = useState(initialState)

    const dispatch = action => {
        setState(prev => reducer(prev, action))
    }

    return [state, dispatch]
}

const reducer = (state, action) => {
    switch (action.type) {
        case "INCREMENT":
            return { ...state, count: state.count + 1 }
        case "SET_TEXT":
            if (!action.text) {
                // 베일아웃
                console.log("텍스트가 없을 떄는 베일아웃 되도록!!! 무조건 input value가 존재합니다.")
                return state
            }
            return { ...state, text: action.text }
        default:
            throw new Error("unknown action type")
    }
}

const useReducer2 = (reducer, initialArg, init) => {
    const [state, setState] = useState(init ? () => init(initialArg) : initialArg)
    const dispatch = action => {
        setState(prev => reducer(prev, action))
    }

    return [state, dispatch]
}

export const UseReducerWithUseState = () => {
    const [{ count, text }, dispatch] = useReducer2(reducer, { count: 0, text: "hi" })

    return (
        <View>
            <Text>UseReducerWithUseState</Text>
            <Text>state: {count}</Text>
            <TouchableOpacity onPress={() => dispatch({ type: "INCREMENT" })} style={{ padding: 20, backgroundColor: "#afa" }}>
                <Text>state 값 변경하기: {count}</Text>
            </TouchableOpacity>
        </View>
    )
}

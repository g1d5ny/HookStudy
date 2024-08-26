import { useEffect } from "react"
import { Text, TextInput, TouchableOpacity } from "react-native"
import { Provider, useDispatch, useSelector } from "react-redux"
import { createTrackedSelector } from "react-tracked"
import { createStore } from "redux"

type State = { count: number; text: string }
type Action = { type: "INC" } | { type: "SET_TEXT"; text: string }

const initialState: State = { count: 0, text: "hello" }
const reducer = (state = initialState, action: Action) => {
    if (action.type === "INC") {
        return { ...state, count: state.count + 1 }
    }
    if (action.type === "SET_TEXT") {
        return { ...state, text: action.text }
    }
    return state
}

const store = createStore(reducer)
const useTrackedState = createTrackedSelector<State>(useSelector)

const Counter = () => {
    const dispatch = useDispatch()
    const { count } = useTrackedState() // 자동으로 리렌더링 제어
    // const count = useSelector((state) => state.count) // 사용자 반환함수로 개발자가 렌더링을 직접 제어할 수 있지만 책임이 많아짐
    const inc = () => dispatch({ type: "INC" })

    useEffect(() => {
        console.log("counter rendering!!")
    }, [count])

    return (
        <>
            <Text>count: {count}</Text>
            <TouchableOpacity style={{ backgroundColor: "#aff" }} onPress={inc}>
                <Text>+1</Text>
            </TouchableOpacity>
        </>
    )
}

const TextBox = ({ showCount }: { showCount: boolean }) => {
    const dispatch = useDispatch()
    const state = useTrackedState() // 자동으로 리렌더링 제어
    // const state = useSelector((state) => state) // 사용자 반환함수로 개발자가 렌더링을 직접 제어할 수 있지만 책임이 많아짐
    const setText = (text: string) => {
        dispatch({ type: "SET_TEXT", text })
    }

    useEffect(() => {
        console.log("textbox rendering!!")
    }, [state]) // state를 dependency에 넣어도 count값이 바뀔 때만 렌더링 됨 (return부 안에 선언된 값이 바뀔 때마다 렌더링)

    return (
        <>
            <TextInput value={state.text} onChangeText={e => setText(e)} style={{ borderWidth: 2 }} />
            {showCount && <Text>{state.count}</Text>}
        </>
    )
}

export const App10_3 = () => {
    return (
        <Provider store={store}>
            <Counter />
            <Counter />
            <TextBox showCount />
            <TextBox showCount />
        </Provider>
    )
}

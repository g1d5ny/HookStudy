import { useEffect, useReducer } from "react"
import { Text, TextInput, TouchableOpacity } from "react-native"
import { createContainer } from "react-tracked"

const useValue = () => {
    type State = { count: number; text: string }
    type Action = { type: "INC" } | { type: "SET_TEXT"; text: string }

    const [state, dispatch] = useReducer(
        (state: State, action: Action) => {
            if (action.type === "INC") {
                return { ...state, count: state.count + 1 }
            }
            if (action.type === "SET_TEXT") {
                return { ...state, text: action.text }
            }
            throw new Error("unknown action type")
        },
        { count: 0, text: "hello" }
    )

    useEffect(() => {
        console.log("latest state: ", state)
    }, [state])

    return [state, dispatch] as const
}

const { Provider, useTracked } = createContainer(useValue)

const Counter = () => {
    const [state, dispatch] = useTracked()
    const inc = () => dispatch({ type: "INC" })

    useEffect(() => {
        console.log("counter rendering!!")
    }, [state]) // state를 dependency에 넣어도 count값이 바뀔 때만 렌더링 됨 (return부 안에 선언된 값이 바뀔 때마다 렌더링)

    return (
        <>
            <Text>count: {state.count}</Text>
            <TouchableOpacity style={{ backgroundColor: "#ffa" }} onPress={inc}>
                <Text>+1</Text>
            </TouchableOpacity>
        </>
    )
}

const TextBox = () => {
    const [state, dispatch] = useTracked()
    const setText = (text: string) => {
        dispatch({ type: "SET_TEXT", text })
    }

    useEffect(() => {
        console.log("textbox rendering!!")
    }, [state]) // state를 dependency에 넣어도 text값이 바뀔 때만 렌더링 됨 (return부 안에 선언된 값이 바뀔 때마다 렌더링)

    return <TextInput value={state.text} onChangeText={e => setText(e)} style={{ borderWidth: 2 }} />
}

export const App10_2 = () => {
    return (
        <Provider>
            <Counter />
            <Counter />
            <TextBox />
            <TextBox />
        </Provider>
    )
}

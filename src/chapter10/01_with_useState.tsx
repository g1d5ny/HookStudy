import { createContext, ReactNode, useContext, useEffect, useState } from "react"
import { Text, TextInput, TouchableOpacity } from "react-native"
import { createContainer } from "react-tracked"

const useValue = () => useState({ count: 0, text: "hello" })
const StateContext = createContext<ReturnType<typeof useValue | null>>(null)

// context 사용
// const Provider = ({ children }: { children: ReactNode }) => {
//     return <StateContext.Provider value={useValue()}>{children}</StateContext.Provider>
// }

const useStateContext = () => {
    const contextValue = useContext(StateContext)
    if (contextValue === null) {
        throw new Error("Please use Provider")
    }
    return contextValue
}

// react-tracked 사용
const { Provider, useTracked } = createContainer(useValue)

const Counter = () => {
    // const [state, setState] = useStateContext() // context 사용
    const [state, setState] = useTracked() // react-tracked 사용
    const inc = () => {
        setState(prev => ({ ...prev, count: prev.count + 1 }))
    }

    useEffect(() => {
        console.log("counter rendering!!")
    }, [state]) // state를 dependency에 넣어도 count값이 바뀔 때만 렌더링 됨 (return부 안에 선언된 값이 바뀔 때마다 렌더링)

    return (
        <>
            <Text>count: {state.count}</Text>
            <TouchableOpacity style={{ backgroundColor: "#faf" }} onPress={inc}>
                <Text>+1</Text>
            </TouchableOpacity>
            {/* <Text>text: {state.text}</Text> */}
        </>
    )
}

const TextBox = () => {
    // const [state, setState] = useStateContext() // context 사용
    const [state, setState] = useTracked() // react-tracked 사용

    const setText = (text: string) => {
        setState(prev => ({ ...prev, text }))
    }

    useEffect(() => {
        console.log("textbox rendering!!")
    }, [state]) // state를 dependency에 넣어도 text값이 바뀔 때만 렌더링 됨 (return부 안에 선언된 값이 바뀔 때마다 렌더링)

    return <TextInput value={state.text} onChangeText={e => setText(e)} style={{ borderWidth: 2 }} />
}

export const App10_1 = () => {
    return (
        <Provider>
            <>
                <Counter />
                <Counter />
                <TextBox />
                <TextBox />
            </>
        </Provider>
    )
}

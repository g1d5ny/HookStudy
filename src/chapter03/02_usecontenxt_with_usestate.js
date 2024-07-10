import { createContext, useContext, useState } from "react"
import { View, Text, TouchableOpacity } from "react-native"

const CountStateContext = createContext({
    count: 0,
    setCount: () => {}
})

const Component1 = () => {
    const { count, setCount } = useContext(CountStateContext)
    return (
        <View>
            <Text>{count}</Text>
            <TouchableOpacity onPress={() => setCount(c => c + 1)}>
                <Text>+1</Text>
            </TouchableOpacity>
        </View>
    )
}

const Component2 = () => {
    const { count, setCount } = useContext(CountStateContext)
    return (
        <View>
            <Text>{count}</Text>
            <TouchableOpacity onPress={() => setCount(c => c + 2)}>
                <Text>+2</Text>
            </TouchableOpacity>
        </View>
    )
}

const Parent = () => {
    return (
        <>
            <Component1 />
            <Component2 />
        </>
    )
}

export const UseContextWithUseStateComponent = () => {
    const [count, setCount] = useState(0)

    return (
        <CountStateContext.Provider value={{ count, setCount }}>
            <Parent />
        </CountStateContext.Provider>
    )
}

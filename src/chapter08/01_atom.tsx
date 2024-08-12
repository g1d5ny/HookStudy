import { atom, useAtom } from "jotai"
import { createContext, useContext, useState } from "react"
import { TouchableOpacity, Text } from "react-native"

const CountContext = createContext(null)
const CountProvider = ({ children }: { children: JSX.Element }) => {
    return <CountContext.Provider value={useState(0)}>{children}</CountContext.Provider>
}

const Counter0 = () => {
    const [count, setCount] = useContext(CountContext)

    const inc = () => setCount(c => c + 1)
    return (
        <>
            <Text>useContext count: {count}</Text>
            <TouchableOpacity onPress={inc}>
                <Text>+1</Text>
            </TouchableOpacity>
        </>
    )
}

const countAtom = atom(0)
const Counter1 = () => {
    const [count, setCount] = useAtom(countAtom)
    const inc = () => setCount(c => c + 1)
    return (
        <>
            <Text>useAtom count: {count}</Text>
            <TouchableOpacity onPress={inc}>
                <Text>+1</Text>
            </TouchableOpacity>
        </>
    )
}

export const App8_1 = () => {
    return (
        <>
            <CountProvider>
                <Counter0 />
            </CountProvider>
            <Counter1 />
        </>
    )
}

import { Dispatch, SetStateAction, ReactNode, createContext, useContext, useState } from "react"
import { Text, TouchableOpacity, TouchableOpacityBase, View } from "react-native"

type CountContextType = [number, Dispatch<SetStateAction<number>>]

//prettier-ignore
const Count1Context = createContext<CountContextType>([0, () => {}])
//prettier-ignore
const Count2Context = createContext<CountContextType>([0, () => {}])

const Counter1 = () => {
    const [count1, setCount1] = useContext(Count1Context)
    return (
        <View style={{ backgroundColor: "#faa" }}>
            <Text>Count1: {count1} </Text>
            <TouchableOpacity onPress={() => setCount1(c => c + 1)}>
                <Text>+1</Text>
            </TouchableOpacity>
        </View>
    )
}

const Counter2 = () => {
    const [count2, setCount2] = useContext(Count2Context)
    return (
        <View style={{ backgroundColor: "#aff" }}>
            <Text>Count2: {count2}</Text>
            <TouchableOpacity onPress={() => setCount2(c => c + 1)}>
                <Text>+1</Text>
            </TouchableOpacity>
        </View>
    )
}

const Parent = () => {
    return (
        <>
            <Counter1 />
            <Counter1 />
            <Counter2 />
            <Counter2 />
        </>
    )
}

const Count1Provider = ({ children }) => {
    const [count1, setCount1] = useState(0)
    console.log("Count1Provider render!")
    return <Count1Context.Provider value={[count1, setCount1]}>{children}</Count1Context.Provider>
}

const Count2Provider = ({ children }) => {
    const [count2, setCount2] = useState(0)
    console.log("Count2Provider render!")
    return <Count2Context.Provider value={[count2, setCount2]}>{children}</Count2Context.Provider>
}

export const App5 = () => {
    return (
        <Count1Provider>
            <Count2Provider>
                <Parent />
            </Count2Provider>
        </Count1Provider>
    )
}

import { createContext, memo, useContext, useEffect, useRef, useState } from "react"
import { View, Text, TouchableOpacity } from "react-native"

const CountContext = createContext({ count1: 0, count2: 0 })

const Counter1 = () => {
    const { count1 } = useContext(CountContext)
    const renderCount = useRef(1)

    useEffect(() => {
        renderCount.current += 1
    })

    return (
        <View>
            <Text>
                Count1: {count1} (renders: {renderCount.current})
            </Text>
        </View>
    )
}

const MemoedCounter1 = memo(Counter1)

const Counter2 = () => {
    const { count2 } = useContext(CountContext)
    const renderCount = useRef(1)

    useEffect(() => {
        renderCount.current += 1
    })

    return (
        <View>
            <Text>
                Count2: {count2} (renders: {renderCount.current})
            </Text>
        </View>
    )
}

const MemoedCounter2 = memo(Counter2)

const Parent = () => {
    return (
        <>
            <MemoedCounter1 />
            <MemoedCounter2 />
        </>
    )
}

export const App4 = () => {
    const [count1, setCount1] = useState(0)
    const [count2, setCount2] = useState(0)

    return (
        <CountContext.Provider value={{ count1, count2 }}>
            <TouchableOpacity onPress={() => setCount1(c => c + 1)}>
                <Text>{count1}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setCount2(c => c + 2)}>
                <Text>{count2}</Text>
            </TouchableOpacity>
            <Parent />
        </CountContext.Provider>
    )
}

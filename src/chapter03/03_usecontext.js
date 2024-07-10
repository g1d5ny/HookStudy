import { createContext, memo, useContext, useEffect, useRef, useState } from "react"
import { Text, View, TextInput } from "react-native"

const ColorContext = createContext("black")

const ColorComponent = () => {
    const color = useContext(ColorContext)
    const renderCount = useRef(1)

    useEffect(() => {
        renderCount.current += 1
    })

    return <Text style={{ color }}>ColorComponent Hello (renders: {renderCount.current})</Text>
}

const MemoedColorComponent = memo(ColorComponent)

// useContext 사용 안함
const DummyComponent = () => {
    const renderCount = useRef(1)

    useEffect(() => {
        renderCount.current += 1
    })

    return <Text>DummyComponent Hello (renders: {renderCount.current})</Text>
}

const MemoedDummyComponent = memo(DummyComponent)

export const InputColorComponent = () => {
    const [color, setColor] = useState("red")
    return (
        <ColorContext.Provider value={color}>
            <TextInput value={"ㅇㅇㅇ" + color} onChange={e => setColor(e.target.value)} />
            <Parent />
        </ColorContext.Provider>
    )
}

const Parent = () => {
    return (
        <>
            <ColorComponent />
            <MemoedColorComponent />
            <View style={{ backgroundColor: "#ffa" }}>
                <MemoedDummyComponent />
            </View>
            <DummyComponent />
            <View style={{ backgroundColor: "#ffa" }}>
                <MemoedDummyComponent />
            </View>
        </>
    )
}

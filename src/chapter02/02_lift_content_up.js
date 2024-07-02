import { useState } from "react"
import { Text, View, TouchableOpacity } from "react-native"

const AdditionalInfo = () => {
    console.log("AdditionalInfo 렌더링")

    return <Text>Some Information</Text>
}

const Component1 = ({ count, setCount, children }) => {
    console.log("Component1 렌더링!")
    return (
        <Text>
            {count}
            <TouchableOpacity onPress={() => setCount(c => c + 1)}>
                <Text>Component1 Increment Count</Text>
            </TouchableOpacity>
            {children}
        </Text>
    )
}

const Component2 = ({ count, setCount }) => {
    console.log("Component2 렌더링!!")

    return (
        <Text>
            {count}
            <TouchableOpacity onPress={() => setCount(c => c + 1)}>
                <Text>Component2 Increment Count</Text>
            </TouchableOpacity>
        </Text>
    )
}

const Parent = ({ children }) => {
    const [count, setCount] = useState(0)

    return (
        <>
            <Component1 count={count} setCount={setCount}>
                {children}
            </Component1>
            <Component2 count={count} setCount={setCount} />
        </>
    )
}

export const GrandParent = () => {
    return (
        <Parent>
            <AdditionalInfo />
        </Parent>
    )
}

import { useState } from "react"
import { Text, View, TouchableOpacity } from "react-native"

export const createContainer = () => {
    let base = 1
    const addBase = n => n + base
    const changeBase = b => {
        base = b
    }
    return { addBase, changeBase }
}

const useGlobalCountState = () => {
    const [count, setCount] = useState(0)
    const authInfo = { name: "React" }
    return [count, setCount, authInfo]
}

const Component3 = () => {
    const [count, setCount] = useGlobalCountState()
    console.log("Component3 렌더링!")
    return (
        <Text>
            {count}
            <TouchableOpacity onPress={() => setCount(c => c + 1)}>
                <Text>Component3 Increment Count</Text>
            </TouchableOpacity>
        </Text>
    )
}

// 전역상태를 사용해야하는 케이스 1: props를 전달하는 것이 적절하지 않을 때
// props를 전달하는 것이 적절하지 않을 때: 3depth에서 해당 props가 필요하고 루트까지 싱태를 끌어올려야하는 경우, 2depth에서는 props를 알 필요 없음
const Component4 = () => {
    const [count, setCount] = useGlobalCountState()
    console.log("Component4 렌더링!!")

    return (
        <Text>
            {count}
            <TouchableOpacity onPress={() => setCount(c => c + 1)}>
                <Text>Component4 Increment Count</Text>
            </TouchableOpacity>
        </Text>
    )
}

const globalState = {
    authInfo: { name: "jiwon" }
}

// 전역상태를 사용해야하는 케이스 2: 이미 리액트 외부에 상태가 있을 때
// 리액트 외부에 있는 상태: 리액트에서 관리하는 값 이외에 데이터 페칭해서 받아온 값 등
const Component5 = () => {
    const [_, __, authInfo] = useGlobalCountState()
    console.log("authInfo: ", authInfo)

    return (
        <View>
            <Text>{authInfo.name}</Text>
        </View>
    )
}

const Parent = () => {
    return (
        <>
            <Component3 />
            <Component4 />
            <Component5 />
        </>
    )
}

export const GrandGlobalParent = () => {
    return <Parent />
}

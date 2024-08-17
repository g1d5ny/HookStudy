import { Text, TouchableOpacity } from "react-native"
import { proxy, useSnapshot } from "valtio"

const state = proxy({
    count1: 0,
    count2: 0
})

export const Counter1 = () => {
    const snap = useSnapshot(state) // state의 count1 속성에 접근, 추적 정보로 감지됨, 필요한 경우에만 리렌더링 감지
    const inc = () => ++state.count1

    return (
        <>
            <Text>snap.count1: {snap.count1}</Text>
            <TouchableOpacity onPress={inc} style={{ backgroundColor: "#faf" }}>
                <Text>+1</Text>
            </TouchableOpacity>
        </>
    )
}

export const Counter2 = () => {
    const snap = useSnapshot(state) // state의 count1 속성에 접근, 추적 정보로 감지됨, 필요한 경우에만 리렌더링 감지
    const inc = () => ++state.count2

    return (
        <>
            <Text>snap.count2: {snap.count2}</Text>
            <TouchableOpacity onPress={inc} style={{ backgroundColor: "#aaf" }}>
                <Text>+1</Text>
            </TouchableOpacity>
        </>
    )
}

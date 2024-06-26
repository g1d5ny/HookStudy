import { useEffect, useState } from "react"
import { StyleSheet, Text, TouchableOpacity, View } from "react-native"

const useCount = () => {
    const [count, setCount] = useState(0)

    // 다양한 목적에 맞는 사용자 정의 훅 제공 가능
    const inc = () => {
        setCount(c => c + 3)
    }

    // 카운트가 바뀔 때마다 처리할 로직 추가 가능 (사용자 훅으로 분리했을 때의 장점)
    useEffect(() => {
        console.log("count is changed to", count)
    }, [count])

    return [count, inc]
}

export const CountComponent = () => {
    const [count, inc] = useCount()

    return (
        <View>
            <Text>{count}</Text>
            <TouchableOpacity style={{ backgroundColor: "#aaf", padding: 20 }} onPress={inc}>
                <Text>+3</Text>
            </TouchableOpacity>
        </View>
    )
}

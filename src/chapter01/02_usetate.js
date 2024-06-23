import { useEffect, useState } from "react"
import { View, Text, TouchableOpacity, StyleSheet } from "react-native"

export const LocalComponent = () => {
    const [state, setState] = useState()

    return (
        <View>
            <Text>지역 함수 실행</Text>
            <Text>{JSON.stringify(state)}</Text>
            <LocalChild state={state} setState={setState} />
        </View>
    )
}

const LocalChild = ({ state, setState }) => {
    const setFoo = () => setState(prev => ({ ...prev, foo: "foo" }))

    return (
        <View>
            <Text>{JSON.stringify(state)}</Text>
            <TouchableOpacity onPress={setFoo} style={styles.button}>
                <Text>Set Foo</Text>
            </TouchableOpacity>
        </View>
    )
}

// 여전히... 두번 빠르게 클릭해도 한번 증가한다는 부분 이해 안됨
export const BailOutComponent = () => {
    const [count, setCount] = useState(0)

    return (
        <View>
            <Text>여러번 클릭하면 1번만 렌더링</Text>
            <Text>{count}</Text>
            <TouchableOpacity style={styles.button} onPress={() => setCount(count + 1)}>
                <Text>Set Count to {count + 1}</Text>
            </TouchableOpacity>
        </View>
    )
}

export const UpdateRenderComponent = () => {
    const [count, setCount] = useState(0)

    const click = () => {
        setCount(c => {
            if (c % 2 === 0) {
                console.log("클릭했지만 베일아웃!!!" + count)
                return c
            } else {
                console.log("클릭했고 렌더링됨 !!!" + count)
                return c + 1
            }
        })
    }

    useEffect(() => {
        // console.log("count 변해서 렌더링 됨!!" + count)
    }, [count])

    useEffect(() => {
        const id = setInterval(() => setCount(c => c + 1), 1000)
        return () => clearInterval(id)
    }, [])

    return (
        <View>
            <Text>갱신 함수를 통한 베일아웃</Text>
            <Text>{count}</Text>
            <TouchableOpacity style={styles.button} onPress={click}>
                <Text>짝수일 때만 count 증가시키기</Text>
            </TouchableOpacity>
        </View>
    )
}

const init = () => {
    console.log("02: init은 첫 마운트 될 떄 한번 호출됨!!! 이거시 지연 초기화!!")
    return 0
}
export const LateInit = () => {
    const [count, setCount] = useState(init)

    return (
        <View>
            <Text>지연 초기화</Text>
            <Text>{count}</Text>
            <TouchableOpacity style={styles.button} onPress={() => setCount(c => c + 1)}>
                <Text>count 증가</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    button: {
        padding: 20,
        backgroundColor: "#faf"
    }
})

import { useReducer } from "react"
import { View, Text, TouchableOpacity, TextInput, StyleSheet } from "react-native"

const reducer = (state, action) => {
    switch (action.type) {
        case "INCREMENT":
            return { ...state, count: state.count + 1 }
        case "SET_TEXT":
            if (!action.text) {
                // 베일아웃
                console.log("텍스트가 없을 떄는 베일아웃 되도록!!! 무조건 input value가 존재합니다.")
                return state
            }
            return { ...state, text: action.text }
        default:
            throw new Error("unknown action type")
    }
}

export const ReducerComponent = () => {
    // reducer - state를 업데이트 하는 역할
    // dispatch - state 업데이트를 위한 요구
    // action - 요구의 내용
    const [{ count, text }, dispatch] = useReducer(reducer, { count: 0, text: "hi" })

    return (
        <View>
            <Text>useReducer 배우기</Text>
            <Text>
                count: {count}, {text}
            </Text>
            <TouchableOpacity onPress={() => dispatch({ type: "INCREMENT" })} style={styles.padding}>
                <Text>count 증가시키기</Text>
            </TouchableOpacity>
            <TextInput value={text} onChangeText={text => dispatch({ type: "SET_TEXT", text })} />
        </View>
    )
}

const deltaReducer = (count, delta) => {
    if (delta < 0) {
        throw Error("delta cannot be negative")
    }
    if (delta > 10) {
        return count
    }
    if (count < 100) {
        return count + delta + 10
    }
    return count + delta
}

// init의 파라미터는 useReducer의 두번쨰 인자값
const init = text => {
    console.log("03: init은 첫 마운트 될 떄 한번 호출됨!!! 이거시 지연 초기화!!")
    return { count: 0, text }
}

const initReducer = (state, action) => {
    switch (action.type) {
        case "INCREMENT":
            return { ...state, count: state.count + 1 }
        case "SET_TEXT":
            return { ...state, text: action.text }
        default:
            throw new Error("unknown action type")
    }
}

export const InitComponent = () => {
    // reducer - state를 업데이트 하는 역할
    // dispatch - state 업데이트를 위한 요구
    // action - 요구의 내용
    const [{ count, text }, dispatch] = useReducer(initReducer, "hiㅋㅋ", init)

    return (
        <View>
            <Text>지연 초기화 reducer</Text>
            <Text>
                count: {count}, {text}
            </Text>
            <TouchableOpacity onPress={() => dispatch({ type: "INCREMENT" })} style={styles.padding}>
                <Text>count 증가</Text>
            </TouchableOpacity>
            <TextInput value={text} onChangeText={text => dispatch({ type: "SET_TEXT", text })} />
        </View>
    )
}

const styles = StyleSheet.create({
    padding: {
        padding: 20,
        backgroundColor: "#afa"
    }
})

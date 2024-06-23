import { useReducer } from "react"
import { TouchableOpacity, View, Text } from "react-native"

// const useState = initialState => {
// const [state, dispatch] = useReducer((prev, action) => (typeof action === "function" ? action(prev) : action), initialState)
// return [state, dispatch]
// }
const useState = initialState => useReducer(reducer, initialState)

const reducer = (prev, action) => {
    console.log("action: ", prev, typeof action)
    return typeof action === "function" ? action(prev) : action
}

export const UseStateWithUseReducer = () => {
    const [state, dispatch] = useState(0)

    return (
        <View>
            <Text>UseStateWithUseReducer</Text>
            <Text>state: {state}</Text>
            <TouchableOpacity onPress={() => dispatch("action")} style={{ padding: 20, backgroundColor: "#afa" }}>
                <Text>state 값 변경하기: {state}</Text>
            </TouchableOpacity>
        </View>
    )
}

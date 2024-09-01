import { configureStore, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { Text, TouchableOpacity, View } from "react-native"
import { Provider, useDispatch, useSelector } from "react-redux"
import { counterSlice, decrement, increment, useStore } from "./store"

const store = configureStore({
    reducer: {
        counter: counterSlice.reducer
    }
})

const ReduxToolkitCounter = () => {
    const count = useSelector((state: { counter: { value: number } }) => state.counter.value)
    const dispatch = useDispatch()

    return (
        <View style={{ flexDirection: "row", marginBottom: 10 }}>
            <TouchableOpacity style={{ backgroundColor: "#ffa" }} onPress={() => dispatch(increment())}>
                <Text>Increment</Text>
            </TouchableOpacity>
            <Text>count: {count}</Text>
            <TouchableOpacity style={{ backgroundColor: "#aff" }} onPress={() => dispatch(decrement())}>
                <Text>Decrement</Text>
            </TouchableOpacity>
        </View>
    )
}

const ZustandCounter = () => {
    const count = useStore(state => state.counter.value)
    const { increment, decrement } = useStore(state => state.counterActions)

    return (
        <View style={{ flexDirection: "row", marginBottom: 10 }}>
            <TouchableOpacity style={{ backgroundColor: "#ffa" }} onPress={increment}>
                <Text>Increment</Text>
            </TouchableOpacity>
            <Text>count: {count}</Text>
            <TouchableOpacity style={{ backgroundColor: "#aff" }} onPress={decrement}>
                <Text>Decrement</Text>
            </TouchableOpacity>
        </View>
    )
}

export const App11 = () => {
    return (
        <>
            <Provider store={store}>
                <>
                    <Text>React Redux - redux/toolkit</Text>
                    <ReduxToolkitCounter />
                    <ReduxToolkitCounter />
                </>
            </Provider>
            <Text>Zustand</Text>
            <ZustandCounter />
            <ZustandCounter />
        </>
    )
}

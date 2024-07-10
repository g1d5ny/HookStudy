import { Dispatch, ReactNode, createContext, useContext, useReducer } from "react"
import { Text, TouchableOpacity, View } from "react-native"

type Action = { type: "INC1" } | { type: "INC2" }

const Count1Context = createContext<number>(0)
const Count2Context = createContext<number>(0)
const DispatchContext = createContext<Dispatch<Action>>(() => {})

const Counter1 = () => {
    const count1 = useContext(Count1Context)
    const dispatch = useContext(DispatchContext)
    return (
        <View>
            <Text>Count1: {count1}</Text>
            <TouchableOpacity onPress={() => dispatch({ type: "INC1" })}>
                <Text>+1</Text>
            </TouchableOpacity>
        </View>
    )
}

const Counter2 = () => {
    const count2 = useContext(Count2Context)
    const dispatch = useContext(DispatchContext)
    return (
        <View>
            <Text>Count2: {count2} </Text>
            <TouchableOpacity onPress={() => dispatch({ type: "INC2" })}>
                <Text>+1</Text>
            </TouchableOpacity>
        </View>
    )
}

const Parent = () => {
    return (
        <>
            <Counter1 />
            <Counter1 />
            <Counter2 />
            <Counter2 />
        </>
    )
}

const Provider = ({ children }: { children: ReactNode }) => {
    const [state, dispatch] = useReducer(
        (prev: { count1: number; count2: number }, action: Action) => {
            if (action.type === "INC1") {
                return { ...prev, count1: prev.count1 + 1 }
            }
            if (action.type === "INC2") {
                return { ...prev, count2: prev.count2 + 1 }
            }
            throw new Error("no matching action")
        },
        {
            count1: 0,
            count2: 0
        }
    )
    return (
        <DispatchContext.Provider value={dispatch}>
            <Count1Context.Provider value={state.count1}>
                <Count2Context.Provider value={state.count2}>{children}</Count2Context.Provider>
            </Count1Context.Provider>
        </DispatchContext.Provider>
    )
}

export const App6 = () => {
    return (
        <Provider>
            <Parent />
        </Provider>
    )
}

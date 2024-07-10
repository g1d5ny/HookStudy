import { ReactNode, createContext, createElement, useContext, useState } from "react"
import { View, Text, TouchableOpacity } from "react-native"

const createStateContext = <Value, State>(useValue: (init?: Value) => State) => {
    const StateContext = createContext<State | null>(null)
    const StateProvider = ({ initialValue, children }: { initialValue?: Value; children?: ReactNode }) => (
        <StateContext.Provider value={useValue(initialValue)}>{children}</StateContext.Provider>
    )

    const useContextState = () => {
        const value = useContext(StateContext)
        if (value === null) throw new Error("Provider missing")
        return value
    }
    return [StateProvider, useContextState] as const
}

const useNumberState = (init?: number) => useState(init || 0)

const [Count1Provider, useCount1] = createStateContext(useNumberState)
const [Count2Provider, useCount2] = createStateContext(useNumberState)

const Counter1 = () => {
    const [count1, setCount1] = useCount1()
    return (
        <View>
            <Text>Count1: {count1}</Text>
            <TouchableOpacity onPress={() => setCount1(c => c + 1)}>
                <Text>+1</Text>
            </TouchableOpacity>
        </View>
    )
}

const Counter2 = () => {
    const [count2, setCount2] = useCount2()
    return (
        <View>
            <Text>Count2: {count2} </Text>
            <TouchableOpacity onPress={() => setCount2(c => c + 1)}>
                <Text>+1</Text>
            </TouchableOpacity>
        </View>
    )
}

const Parent = () => (
    <View>
        <Counter1 />
        <Counter1 />
        <Counter2 />
        <Counter2 />
    </View>
)

export const App7 = () => (
    <Count1Provider>
        <Count2Provider>
            <Parent />
        </Count2Provider>
    </Count1Provider>
)

export const App8 = () => {
    const providers = [[Count1Provider], [Count2Provider, { initialValue: 20 }]] as const
    return providers.reduceRight((children, [Component, props]) => createElement(Component, props, children), <Parent />)
    // <Count1Provider>
    //  <Count2Provider initialValue={20}>
    //   <Parent />
    //  </Count2Provider>
    // </Count1Provider>
}

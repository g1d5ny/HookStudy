import { useEffect, useState } from "react"
import { Text, TouchableOpacity } from "react-native"

type Store<T> = {
    getState: () => T
    setState: (action: T | ((prev: T) => T)) => void
    subscribe: (callback: () => void) => () => void
}

const createStore = <T extends unknown>(initialState: T): Store<T> => {
    let state = initialState
    const callbacks = new Set<() => void>()

    const getState = () => state

    const setState = (nextState: T | ((prev: T) => T)) => {
        state = typeof nextState === "function" ? (nextState as (prev: T) => T)(state) : nextState
        callbacks.forEach(callback => callback())
    }

    const subscribe = (callback: () => void) => {
        callbacks.add(callback)
        console.log("callback: ", callback)
        return () => {
            callbacks.delete(callback)
        }
    }
    return { getState, setState, subscribe }
}

const store = createStore({ count: 0 })

const useStore = <T extends unknown>(store: Store<T>) => {
    const [state, setState] = useState(store.getState()) // useState({ count: 0 })
    console.log("store.getState(): ", store.getState())

    useEffect(() => {
        // store가 이미 새로운 상태를 가지고 있을 가능성이 있기 때문에 한번 호출
        const unsubscribe = store.subscribe(() => {
            setState(store.getState())
        })
        setState(store.getState())
        console.log("333 store: ", store)
        return unsubscribe
    }, [store])

    return [state, store.setState] as const
}

const Component1 = () => {
    const [state, setState] = useStore(store)
    const inc = () => {
        setState(prev => ({
            ...prev,
            count: prev.count + 1
        }))
    }
    return (
        <Text>
            {state.count}
            <TouchableOpacity onPress={inc}>
                <Text>+1</Text>
            </TouchableOpacity>
        </Text>
    )
}

const Component2 = () => {
    const [state, setState] = useStore(store)
    const inc2 = () => {
        setState(prev => ({
            ...prev,
            count: prev.count + 2
        }))
    }
    return (
        <Text>
            {state.count}
            <TouchableOpacity onPress={inc2}>
                <Text>+2</Text>
            </TouchableOpacity>
        </Text>
    )
}

export const App4_1 = () => (
    <>
        <Component1 />
        <Component2 />
    </>
)

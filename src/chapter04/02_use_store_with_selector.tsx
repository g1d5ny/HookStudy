import { useCallback, useEffect, useState } from "react"
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
        return () => {
            callbacks.delete(callback)
        }
    }
    return { getState, setState, subscribe }
}

const store = createStore({ count1: 0, count2: 0 })

const useStoreSelector = <T, S>(store: Store<T>, selector: (state: T) => S) => {
    const [state, setState] = useState(() => selector(store.getState()))
    // 1. () => selector(store.getState()) = () => store.getState().count1
    // 2. const [state, setState] = useState(store.getState().count1)
    // 3. const [state, setState] = useState(0)

    useEffect(() => {
        // store가 이미 새로운 상태를 가지고 있을 가능성이 있기 때문에 한번 호출
        const unsubscribe = store.subscribe(() => {
            setState(selector(store.getState()))
        })
        // 1. const unsubscribe = store.subscribe(() => {
        //      setState(0)
        //    })
        console.log("구독!!>_< " + selector(store.getState()))

        // 2. createStore 내 callbacks의 Set에 () => {setState(0)}를 추가
        setState(selector(store.getState())) // setState(0)
        return unsubscribe // createStore 내 callbacks에 있는 () => {setState(selector(store.getState()))} 지움
    }, [store, selector])
    return state
}

const Component1 = () => {
    const selector = a => a.count1
    const state = useStoreSelector(
        store,
        // selector
        useCallback(selector, [])
    )

    const inc = () => {
        store.setState(prev => ({
            ...prev,
            count1: prev.count1 + 1
        }))
    }

    console.log("Component1 rendering ")
    return (
        <Text>
            count1: {state}
            <TouchableOpacity onPress={inc}>
                <Text>+1</Text>
            </TouchableOpacity>
        </Text>
    )
}

const selectCount2 = (state: ReturnType<typeof store.getState>) => state.count2

const Component2 = () => {
    const state = useStoreSelector(store, selectCount2)
    const inc = () => {
        store.setState(prev => ({
            ...prev,
            count2: prev.count2 + 1
        }))
    }
    return (
        <Text>
            count2: {state}
            <TouchableOpacity onPress={inc}>
                <Text>+1</Text>
            </TouchableOpacity>
        </Text>
    )
}

export const App4_2 = () => (
    <>
        <Component1 />
        {/* <Component1 />
        <Component2 /> */}
        <Component2 />
    </>
)

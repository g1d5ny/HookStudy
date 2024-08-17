import { useCallback, useEffect, useMemo, useSyncExternalStore } from "react"
import { useSubscription } from "use-subscription"
import { Text, TouchableOpacity } from "react-native"

type Store<T> = {
    getState: () => T
    setState: (action: T | ((prev: T) => T)) => void
    subscribe: (callback: () => void) => () => void
}

export const createStore = <T extends unknown>(initialState: T): Store<T> => {
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

export const useStoreSelector = <T, S>(store: Store<T>, selector: (state: T) => S) =>
    // useSubscription(
    //     useMemo(
    //         () => ({
    //             getCurrentValue: () => selector(store.getState()), // () => store.getState().count1
    //             subscribe: store.subscribe
    //         }),
    //         [store, selector]
    //     )
    // )
    useSyncExternalStore(
        store.subscribe,
        () => selector(store.getState()) // () => store.getState().count1
    )

const Component1 = () => {
    const state = useStoreSelector(
        store,
        useCallback(state => state.count1, [])
    )
    /*
  const state = useSubscription(useMemo(() => ({            
    getCurrentValue: () => store.getState().count1,        
    subscribe: store.subscribe,                            
  }), []));                                           
  */
    const inc = () => {
        store.setState(prev => ({
            ...prev,
            count1: prev.count1 + 1
        }))
    }

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

    useEffect(() => {
        console.log("count1이 바뀌어도 렌더링 안 됨")
    })

    return (
        <Text>
            ㅋㅋcount2: {state}
            <TouchableOpacity onPress={inc}>
                <Text>+1</Text>
            </TouchableOpacity>
        </Text>
    )
}

export const App4_3 = () => (
    <>
        <Component1 />
        {/* <Component1 />
        <Component2 /> */}
        <Component2 />
    </>
)

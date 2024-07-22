import { ReactNode, createContext, useContext, useRef, useMemo } from "react"
import { View, Text, TouchableOpacity } from "react-native"
import { useSubscription } from "use-subscription"

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

type State = { count: number; text?: string }

const StoreContext = createContext<Store<State>>(createStore<State>({ count: 0, text: "hello" }))

const StoreProvider = ({ initialState, children }: { initialState: State; children: ReactNode }) => {
    const storeRef = useRef<Store<State>>()
    if (!storeRef.current) {
        storeRef.current = createStore(initialState)
    }
    return <StoreContext.Provider value={storeRef.current}>{children}</StoreContext.Provider>
}

const useSelector = <S extends unknown>(selector: (state: State) => S) => {
    const store = useContext(StoreContext)
    // useSyncExternalStore 수정 ㄱ
    return useSubscription(
        useMemo(
            () => ({
                getCurrentValue: () => selector(store.getState()),
                subscribe: store.subscribe
            }),
            [store, selector]
        )
    )
}

const useSetState = () => {
    const store = useContext(StoreContext)
    return store.setState // createStore.setState
}

const selectCount = (state: State) => state.count

const Component = () => {
    const count = useSelector(selectCount)
    const setState = useSetState()
    const inc = () => {
        setState(prev => ({
            ...prev,
            count: prev.count + 1
        }))
    }
    return (
        <View>
            <Text>count: {count} </Text>
            <TouchableOpacity onPress={inc}>
                <Text>+1</Text>
            </TouchableOpacity>
        </View>
    )
}

export const App5_2 = () => (
    <View>
        <Text>Using default store</Text>
        <Component />
        <Component />
        <StoreProvider initialState={{ count: 10 }}>
            <Text>Using store provider</Text>
            <Component />
            <Component />
            {/* 공급자는 중첩될 수 있고 가장 안쪽에 위치한 공급자의 값을 사용함, 중첩됐지만 가장 가까운 count: 20 사용함 */}
            <StoreProvider initialState={{ count: 20 }}>
                <Text>Using inner store provider</Text>
                <Component />
                <Component />
            </StoreProvider>
        </StoreProvider>
    </View>
)

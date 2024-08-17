import { View } from "react-native"
import { create } from "zustand"

// 잘 되는디
export const App7_1 = () => {
    const store = create(() => ({ count: 0 }))
    console.log(store.getState())
    store.setState({ count: 1 })
    console.log(store.getState())

    console.log("=============")

    const state1 = store.getState()
    console.log("state1: ", state1)
    state1.count = 2
    console.log("state1: ", state1)
    ++state1.count
    console.log("state1: ", state1)

    console.log("=============")

    store.setState(prev => ({ count: prev.count + 1 })) // 함수 갱신
    console.log(store.getState())
    return <></>
}

export const App7_2 = () => {
    console.log("App 7_2!!!!!!")
    const store = create(() => ({ count: 0, text: "hello" }))
    console.log("store: ", store.getState())
    store.setState({ count: 2 })
    console.log(store.getState())
    store.subscribe(() => {
        console.log("store state is changed!!")
    })
    store.setState({ count: 3 })
    console.log(store.getState())
    store.setState({ count: 3 })
    console.log(store.getState())
    store.setState({ count: 100 })
    console.log(store.getState())

    return <></>
}

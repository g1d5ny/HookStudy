import { useEffect } from "react"
import { Text, TouchableOpacity, View } from "react-native"
import { create } from "zustand"

type StoreState = {
    count1: number
    count2: number
    total: number
    inc1: () => void
    inc2: () => void
}

const useStore = create<StoreState>(set => ({
    count1: 0,
    count2: 0,
    total: 0,
    inc1: () =>
        set(prev => ({
            ...prev,
            count1: prev.count1 + 1,
            total: prev.count1 + 1 + prev.count2
        })),
    inc2: () =>
        set(prev => ({
            ...prev,
            count2: prev.count2 + 1,
            total: prev.count2 + 1 + prev.count1
        }))
}))

const selectCount1 = (state: StoreState) => state.count1
const selectCount2 = (state: StoreState) => state.count2
const selectTotal = (state: StoreState) => state.count1 + state.count2
const inc1 = (state: StoreState) => state.inc1
const inc2 = (state: StoreState) => state.inc2

export const App7_5 = () => {
    const count1 = useStore(selectCount1)
    const count2 = useStore(selectCount2)
    const total = useStore(selectTotal)
    const increase1 = useStore(inc1)
    const increase2 = useStore(inc2)

    useEffect(() => {
        useStore.subscribe(e => {
            console.log("store state is changed!!: " + count1, JSON.stringify(e))
        })
    }, [])

    useStore.subscribe(e => {
        // wow??... count1 클릭한 횟수만큼 들어옴
        console.log("store state is changed!!: " + count1, JSON.stringify(e))
    })

    return (
        <View>
            <Text>count1: {count1}</Text>
            <TouchableOpacity onPress={increase1} style={{ padding: 4, backgroundColor: "#faf" }}>
                <Text>count1 +1</Text>
            </TouchableOpacity>
            <Text>count2: {count2}</Text>
            <TouchableOpacity onPress={increase2} style={{ padding: 4, backgroundColor: "#aff" }}>
                <Text>count2 +1</Text>
            </TouchableOpacity>
            <Text>total:{total}</Text>
        </View>
    )
}

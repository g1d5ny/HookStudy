import { atom, useAtom } from "jotai"
import { Text, TouchableOpacity, View } from "react-native"

const countAtom = atom(0)
const doubledCountAtom = atom(
    get => get(countAtom) * 2,
    (get, set, args: number) => set(countAtom, args / 2)
)
const incrementCountAtom = atom(null, (get, set, arg) => set(countAtom, c => c + 1))

export const Writer = () => {
    const [count, setCount] = useAtom(countAtom)
    const [doubledCount, setDoubleCount] = useAtom(doubledCountAtom)

    return (
        <View>
            <Text>count: {count}</Text>
            <Text>doubledCount: {doubledCount}</Text>
            <TouchableOpacity style={{ backgroundColor: "#faf" }} onPress={() => setCount(count + 1)}>
                <Text>count up!!</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{ backgroundColor: "#aff" }} onPress={() => setDoubleCount(doubledCount + 1)}>
                <Text>double count up!!</Text>
            </TouchableOpacity>
        </View>
    )
}

export const ActionAtom = () => {
    const [count] = useAtom(countAtom)
    const [_, incrementCount] = useAtom<any>(incrementCountAtom)

    countAtom.onMount = () => {
        console.log("count atom 사용을 시작합니다.")

        const onUnmount = () => {
            console.log("count atom 사용이 끝났습니다.")
        }
        return onUnmount
    }

    return (
        <View>
            <Text>count: {count}</Text>
            <TouchableOpacity style={{ backgroundColor: "#aff" }} onPress={incrementCount}>
                <Text>incrementCount count up!!</Text>
            </TouchableOpacity>
        </View>
    )
}

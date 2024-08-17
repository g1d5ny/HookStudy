import { atom, Provider, useAtom } from "jotai"
import { useEffect } from "react"
import { Text, TouchableOpacity } from "react-native"

const countAtom = atom(0) // 값을 갖고 있는 것은 아님, 변수에 갖다 쓰기 위한 정의일 뿐
const Counter = () => {
    const [count, setCount] = useAtom(countAtom)
    const inc = () => setCount(c => c + 1)

    useEffect(() => {
        console.log("count 변경되어 렌더링 됨!")
    })
    return (
        <>
            <Text>Counter: {count}</Text>
            <TouchableOpacity onPress={inc}>
                <Text>+1</Text>
            </TouchableOpacity>
        </>
    )
}

export const App8_3 = () => {
    // 같은 값인 count3Atom을 넣어도 같은 Provider내에 있는 atom값만 갱신됨
    return (
        <>
            {/* countAtom은 상태값이 없고 상태는 Provider 내에서 실제로 저장되고 관리됨 */}
            <Provider>
                <Text>First Provider</Text>
                <Counter />
                <Counter />
            </Provider>
            <Provider>
                <Text>Second Provider</Text>
                <Counter />
                <Counter />
            </Provider>
        </>
    )
}

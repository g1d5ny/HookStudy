import { atom, PrimitiveAtom, Provider, useAtom } from "jotai"
import { Text, TouchableOpacity } from "react-native"

const firstNameAtom = atom("React")
const lastNameAtom = atom("Hooks")
const ageAtom = atom(3)

// personAtom은 세 값 중 하나가 변경될 때마다 갱신 (의존성 추적)
// 리렌더링 최적화 위해서는 사용하는 값만 포함하는 파생 아톰을 만들어야 함
const personAtom = atom(get => ({
    firstName: get(firstNameAtom),
    lastName: get(lastNameAtom),
    age: get(ageAtom)
}))

// ageAtom을 구독하지 않았으므로 ageAtom의 값이 변경되더라도 리렌더링 되지 않음
export const PersonComponent = () => {
    const [firstName] = useAtom(firstNameAtom)
    const [lastName] = useAtom(lastNameAtom)

    return (
        <Text>
            {firstName} {lastName}
        </Text>
    )
}

// 파생 아톰이어서 ageAtom을 구독했으므로 ageAtom의 값이 변경되면 리렌더링 됨
export const PersonComponent2 = () => {
    const person = useAtom(personAtom)

    return (
        <Text>
            {person[0].firstName} {person[0].lastName}
        </Text>
    )
}

const count1Atom = atom(0)
const count2Atom = atom(0)
const count3Atom = atom(0)
const count4Atom = atom(0)

const Counter = ({ countAtom }: { countAtom: PrimitiveAtom<number> }) => {
    const [count, setCount] = useAtom(countAtom)
    const inc = () => setCount(c => c + 1)
    return (
        <>
            <Text>Counter: {count}</Text>
            <TouchableOpacity onPress={inc}>
                <Text>+1</Text>
            </TouchableOpacity>
        </>
    )
}

const totalAtom = atom(get => get(count1Atom) + get(count2Atom)) // totalAtom:파생 아톰
const Total = () => {
    const [total] = useAtom(totalAtom) // total: read 함수의 결과이며 읽기 전용
    return <Text>Total: {total}</Text>
}

export const App8_2 = () => {
    return (
        <Text>
            <Counter countAtom={count1Atom} />+<Counter countAtom={count2Atom} /> = <Total />
        </Text>
    )
}

export const App8_3 = () => {
    // 같은 값인 count3Atom을 넣어도 같은 Provider내에 있는 atom값만 갱신됨
    return (
        <>
            <Provider>
                <Text>First Provider</Text>
                <Counter countAtom={count3Atom} />
                <Counter countAtom={count3Atom} />
            </Provider>
            <Provider>
                <Text>Second Provider</Text>
                <Counter countAtom={count3Atom} />
                <Counter countAtom={count3Atom} />
            </Provider>
        </>
    )
}

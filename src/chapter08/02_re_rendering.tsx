import { atom, PrimitiveAtom, Provider, useAtom } from "jotai"
import { useEffect } from "react"
import { Text, TouchableOpacity } from "react-native"
import { createStore, useStoreSelector } from "../chapter04/03_use_subscription_with_store"

const firstNameAtom = atom("React")
const lastNameAtom = atom("Hooks")
const ageAtom = atom(3)

// personAtom은 세 값 중 하나가 변경될 때마다 갱신 (의존성 추적)
// 리렌더링 최적화 위해서는 사용하는 값만 포함하는 파생 아톰을 만들어야 함
const personAtom = atom(get => ({
    // read 함수: atom 함수의 첫번쨰 인수로 들어가는 함수
    firstName: get(firstNameAtom),
    lastName: get(lastNameAtom),
    age: get(ageAtom)
}))

// ageAtom을 구독하지 않았으므로 ageAtom의 값이 변경되더라도 리렌더링 되지 않음
export const PersonComponent = () => {
    const [firstName, _] = useAtom(firstNameAtom)
    const [lastName] = useAtom(lastNameAtom)

    useEffect(() => {
        console.log("PersonComponent isRender!")
    })

    return (
        <>
            <Text>=== Person Component ===</Text>
            <Text>
                {firstName} {lastName}
            </Text>
        </>
    )
}

// 파생 아톰이어서 ageAtom을 구독했으므로 ageAtom의 값이 변경되면 리렌더링 됨
export const PersonComponent2 = () => {
    const person = useAtom(personAtom)

    useEffect(() => {
        console.log("age 값 변함에따라 PersonComponent2 isRender!")
    })

    return (
        <Text>
            {person[0].firstName} {person[0].lastName} {person[0].age}
        </Text>
    )
}

export const PersonComponent3 = () => {
    const [age, setAge] = useAtom(ageAtom)

    return (
        <>
            <Text>age: {age}</Text>
            <TouchableOpacity style={{ backgroundColor: "#faf" }} onPress={() => setAge(age + 1)}>
                <Text>age up!</Text>
            </TouchableOpacity>
        </>
    )
}

const count1Atom = atom(0)
const count2Atom = atom(0)

const Counter = ({ countAtom }: { countAtom: PrimitiveAtom<number> }) => {
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

const totalAtom = atom(get => get(count1Atom) + get(count2Atom)) // totalAtom:파생 아톰
const Total = () => {
    const [total] = useAtom(totalAtom) // total: read 함수의 결과이며 읽기 전용
    return <Text>Total: {total}</Text>
}

export const App8_2 = () => {
    // ❗️❗️count1Atom, count2Atom 값이 변화해도 렌더링 안됨
    // 이유: count1Atom을 구독하고 있지 않음. 구독 방법: useAtom(count1Atom)

    useEffect(() => {
        console.log("countAtom up1!!")
    })
    return (
        <Text>
            <Counter countAtom={count1Atom} />+<Counter countAtom={count2Atom} /> = <Total />
        </Text>
    )
}

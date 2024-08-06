import { Text } from "react-native"
import { create } from "zustand"

const useStore = create(() => ({
    count: 0,
    text: "hello"
}))

export const App7_3 = () => {
    const { count, text } = useStore() // count, text가 바뀔 때마다 렌더링, 화면엔 count만 필요하므로 불필요한 렌더링 발생함
    return <Text>count: {count}</Text>
}

export const App7_4 = () => {
    const count = useStore(({ count }) => count) // 수동 렌더링 최적화: 선택자 함수가 반환하는 결과 비교하는 방식
    return <Text>count: {count}</Text>
}

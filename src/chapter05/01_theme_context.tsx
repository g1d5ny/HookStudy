import { createContext, useContext } from "react"
import { Text } from "react-native"

const ThemeContext = createContext("light")

const Component = () => {
    const theme = useContext(ThemeContext)
    return <Text>Theme: {theme}</Text>
}

export const App5_1 = () => {
    return (
        <ThemeContext.Provider value='dark'>
            <Component />
        </ThemeContext.Provider>
    )
}

export const App5_1_2 = () => {
    // 공급자는 중첩될 수 있고 가장 안쪽에 위치한 공급자의 값을 사용함
    // 전체 컴포넌트 트리의 하위 트리에 대해 다른 값을 제공할 필요가 있다면 공급자를 사용함
    return (
        <ThemeContext.Provider value='this value is not used'>
            <ThemeContext.Provider value='this value is not used'>
                <ThemeContext.Provider value='this is the value used'>
                    <Component />
                </ThemeContext.Provider>
            </ThemeContext.Provider>
        </ThemeContext.Provider>
    )
}

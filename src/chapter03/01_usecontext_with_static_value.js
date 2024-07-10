import { createContext, useContext } from "react"
import { Text } from "react-native"

const ColorContext = createContext("black")

const Component = () => {
    const color = useContext(ColorContext)
    return <Text style={{ color }}>Hello {color}</Text>
}

export const UseContextBasicComponent = () => {
    return (
        <>
            <Component />
            <ColorContext.Provider value='red'>
                <Component />
            </ColorContext.Provider>
            <ColorContext.Provider value='green'>
                <Component />
            </ColorContext.Provider>
            <ColorContext.Provider value='blue'>
                <Component />
            </ColorContext.Provider>
            <ColorContext.Provider value='skyblue'>
                <Component />
            </ColorContext.Provider>
        </>
    )
}

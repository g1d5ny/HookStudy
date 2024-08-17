import { useEffect, useState } from "react"
import { Text, TouchableOpacity } from "react-native"

const countObj = { value: 0 }
export const App7_7 = () => {
    const [count, setCount] = useState(countObj)
    const handleClick = () => {
        countObj.value += 1
        console.log("countObj.value: ", countObj.value)
        const newCountObj = countObj
        setCount(newCountObj)
    }

    useEffect(() => {
        console.log("component update!")
    }, [])

    return (
        <>
            <Text>====== 7-7 ======</Text>
            <Text>count value: {count.value}</Text>
            <TouchableOpacity style={{ backgroundColor: "#aaf" }} onPress={handleClick}>
                <Text>Update!!!!</Text>
            </TouchableOpacity>
        </>
    )
}

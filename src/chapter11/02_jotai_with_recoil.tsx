import { RecoilRoot, useRecoilState, useRecoilValue } from "recoil"
import { charCountState, textState } from "./store"
import { Text, TextInput, View } from "react-native"
import { atom, useAtom } from "jotai"

const RecoilTextInput = () => {
    const [text, setText] = useRecoilState(textState)

    return (
        <View style={{ flexDirection: "row" }}>
            <TextInput value={text} onChangeText={text => setText(text)} style={{ minWidth: 100, marginRight: 10, borderWidth: 2 }} />
            <Text>Echo: {text}</Text>
        </View>
    )
}

const RecoilCharacterCount = () => {
    const count = useRecoilValue(charCountState)
    return <Text>Character Count: {count}</Text>
}

const textAtom = atom("")
const charCountAtom = atom(get => get(textAtom).length)

const JotaiTextInput = () => {
    const [text, setText] = useAtom(textAtom)

    return (
        <View style={{ flexDirection: "row" }}>
            <TextInput value={text} onChangeText={text => setText(text)} style={{ minWidth: 100, marginRight: 10, borderWidth: 2 }} />
            <Text>Echo: {text}</Text>
        </View>
    )
}

const JotaiCharacterCount = () => {
    const [count] = useAtom(charCountAtom)
    return <Text>Character Count: {count}</Text>
}

export const App11_2 = () => {
    return (
        <>
            <RecoilRoot>
                <Text>Recoil</Text>
                <RecoilTextInput />
                <RecoilCharacterCount />
            </RecoilRoot>
            <JotaiTextInput />
            <JotaiCharacterCount />
        </>
    )
}

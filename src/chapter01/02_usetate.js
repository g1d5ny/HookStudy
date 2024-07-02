import { useEffect, useState } from "react"
import { View, Text, TouchableOpacity, StyleSheet } from "react-native"

export const LocalComponent = () => {
    const [state, setState] = useState()

    useEffect(() => {
        // 클릭할 때마다 계속해서 로그가 찍힐 것임.
        // 자바스크립트의 모든 값은 데이터 타입을 가지고 있음 (원시 타입과 객체 타입)
        // 원시 타입과 객체 타입은 각각 저장 방식이 다름
        // 원시 타입 : 할당되는 시점에 메모리에서 값을 직접 저장
        // ex) let a = 2, let b = 2 // a === b (true)
        // a, b는 원시타입이므로 메모리에 값 2가 저장됨. 동등 비교하면 같은 값 취급함.
        // 객체(참조) 타입 : 할당되는 시점에 메모리에서 참조값(주소값)을 저장
        // ex) let a = {foo: 'foo'}, let b = {foo: 'foo'} // a === b (false), a.foo === b.foo (true)
        // a, b는 객체타입이므로 메모리에 주소값이 저장됨. 동등 비교하면 객체 내용이 같아도 다른 값 취급함.
        console.log("state: " + JSON.stringify(state))
    }, [state])

    return (
        <View>
            <Text>지역 함수 실행</Text>
            <Text>{JSON.stringify(state)}</Text>
            <LocalChild state={state} setState={setState} />
        </View>
    )
}

const LocalChild = ({ state, setState }) => {
    const setFoo = () => setState(prev => ({ foo: "foo" }))

    return (
        <View>
            <Text>{JSON.stringify(state)}</Text>
            <TouchableOpacity onPress={setFoo} style={styles.button}>
                <Text>Set Foo</Text>
            </TouchableOpacity>
        </View>
    )
}

// 여전히... 두번 빠르게 클릭해도 한번 증가한다는 부분 이해 안됨
export const BailOutComponent = () => {
    const [count, setCount] = useState(0)

    return (
        <View>
            <Text>여러번 클릭하면 1번만 렌더링</Text>
            <Text>{count}</Text>
            <TouchableOpacity style={styles.button} onPress={() => setCount(count + 1)}>
                <Text>Set Count to {count + 1}</Text>
            </TouchableOpacity>
        </View>
    )
}

export const UpdateRenderComponent = () => {
    const [count, setCount] = useState(0)

    const click = () => {
        setCount(c => {
            if (c % 2 === 0) {
                console.log("클릭했지만 베일아웃!!!" + count)
                return c
            } else {
                console.log("클릭했고 렌더링됨 !!!" + count)
                return c + 1
            }
        })
    }

    useEffect(() => {
        // console.log("count 변해서 렌더링 됨!!" + count)
    }, [count])

    useEffect(() => {
        const id = setInterval(() => setCount(c => c + 1), 1000)
        return () => clearInterval(id)
    }, [])

    return (
        <View>
            <Text>갱신 함수를 통한 베일아웃</Text>
            <Text>{count}</Text>
            <TouchableOpacity style={styles.button} onPress={click}>
                <Text>짝수일 때만 count 증가시키기</Text>
            </TouchableOpacity>
        </View>
    )
}

// const init = () => {
//     console.log("02: init은 첫 마운트 될 떄 한번 호출됨!!! 이거시 지연 초기화!!")
//     return 0
// }
export const LateInit = () => {
    const [count, setCount] = useState(init)
    console.log("init: ", init)

    console.log("111varr: " + varr)
    let varr = 1
    console.log("222varr: " + varr)
    if (true) {
        var abc = 2
        console.log(abc)
    }
    console.log("ab", abc)

    // 1. 요기에 init이 있으면 count의 초기값은 undefined임
    // 이유: init은 함수를 변수 init에 할당한 함수 표현식이자 변수임. js에서 함수 표현식은 호이스팅의 영향을 받음
    // init 함수의 선언과 초기화
    const init = () => {
        console.log("02: init은 첫 마운트 될 떄 한번 호출됨!!! 이거시 지연 초기화!!")
        return 0
    }

    return (
        <View>
            <Text>지연 초기화</Text>
            <Text>{count}</Text>
            <TouchableOpacity style={styles.button} onPress={() => setCount(c => c + 1)}>
                <Text>count 증가</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    button: {
        padding: 20,
        backgroundColor: "#faf"
    }
})

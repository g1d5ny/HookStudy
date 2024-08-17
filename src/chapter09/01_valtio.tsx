import { proxy, snapshot } from "valtio"
import { create } from "zustand"

const store = create(() => ({
    count: 0,
    text: "hello"
}))

store.setState(prev => ({ count: prev.count + 1 }))

export const proxyObject = new Proxy(
    {
        count: 0,
        text: "hello"
    },
    {
        set: (target, prop, value) => {
            console.log("start setting", prop)
            target[prop] = value
            console.log("end setting", prop)
        }
    }
)

const state = proxy({ count: 0 }) // state: 변경을 감지하는 프락시 객체
// 불변 객체 생성, state와 값은 같지만 참조가 다름
const snap1 = snapshot(state) // count: 0
++state.count
const snap2 = snapshot(state) // count: 1

const state2 = proxy({
    obj1: { c: 0 },
    obj2: { c: 0 }
})

const snap12 = snapshot(state2)
++state2.obj1.c
const snap22 = snapshot(state2)

import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { atom, selector } from "recoil"
import { proxy, useSnapshot } from "valtio"
import { create } from "zustand"

const initialState = {
    value: 0
}

export const counterSlice = createSlice({
    name: "counter",
    initialState,
    reducers: {
        increment: state => {
            state.value += 1
        },
        decrement: state => {
            state.value -= 1
        },
        incrementByAmount: (state, action: PayloadAction<number>) => {
            state.value += action.payload
        }
    }
})

export const { increment, decrement, incrementByAmount } = counterSlice.actions

type State = {
    counter: {
        value: number
    }
    counterActions: {
        increment: () => void
        decrement: () => void
        incrementByAmount: (amount: number) => void
    }
}

export const useStore = create<State>(set => ({
    counter: { value: 0 },
    counterActions: {
        increment: () =>
            set(state => ({
                counter: { value: state.counter.value + 1 }
            })),
        decrement: () =>
            set(state => ({
                counter: { value: state.counter.value - 1 }
            })),
        incrementByAmount: (amount: number) =>
            set(state => ({
                counter: { value: state.counter.value + amount }
            }))
    }
}))

export const textState = atom({
    key: "textState",
    default: ""
})

export const charCountState = selector({
    key: "charCountState",
    get: ({ get }) => get(textState).length
})

export const valtioTimer = proxy({
    secondsPassed: 0,
    increase: () => {
        valtioTimer.secondsPassed += 1
    },
    reset: () => {
        valtioTimer.secondsPassed = 0
    }
})

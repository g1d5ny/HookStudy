import { makeAutoObservable } from "mobx"
import { observer } from "mobx-react"
import { Text, TouchableOpacity } from "react-native"
import { valtioTimer } from "./store"
import { useSnapshot } from "valtio"

class Timer {
    secondsPassed = 0

    constructor() {
        makeAutoObservable(this) // myTimer 인스턴스를 관찰 가능한 객체로 만드는 데 사용됨
    }

    increase() {
        this.secondsPassed += 1
    }

    reset() {
        this.secondsPassed = 0
    }
}

const MobxTimerView = observer(({ timer }: { timer: Timer }) => {
    return (
        <TouchableOpacity onPress={() => timer.reset()}>
            <Text>Reset seconds passed: {timer.secondsPassed}</Text>
        </TouchableOpacity>
    )
})

const ValtioTimerView = ({ timer }: { timer: typeof valtioTimer }) => {
    const snap = useSnapshot(timer)

    return (
        <TouchableOpacity onPress={() => timer.reset()}>
            <Text>Reset seconds passed: {snap.secondsPassed}</Text>
        </TouchableOpacity>
    )
}

const MobxTimer = new Timer()
export const App11_3 = () => {
    setInterval(() => {
        MobxTimer.increase()
        valtioTimer.increase()
    }, 1000)

    return (
        <>
            <Text style={{ marginTop: 10 }}>Mobx</Text>
            <MobxTimerView timer={MobxTimer} />
            <Text style={{ marginTop: 10 }}>Valtio</Text>
            <ValtioTimerView timer={valtioTimer} />
        </>
    )
}

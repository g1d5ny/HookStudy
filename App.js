import { ScrollView, StyleSheet, Text, View } from "react-native"
import { CountComponent } from "./src/chapter01/01_globalusestate"
import { LateInit, BailOutComponent, LocalComponent, UpdateRenderComponent } from "./src/chapter01/02_usetate"
import { InitComponent, ReducerComponent } from "./src/chapter01/03_usereducer"
import { UseStateWithUseReducer } from "./src/chapter01/04_usestate_with_usereducer"
import { UseReducerWithUseState } from "./src/chapter01/05_reducer_with_usestate"
import { GrandParent } from "./src/chapter02/02_lift_content_up"
import { GrandGlobalParent, createContainer } from "./src/chapter02/03_globalstate"
import { UseContextBasicComponent } from "./src/chapter03/01_usecontext_with_static_value"
import { UseContextWithUseStateComponent } from "./src/chapter03/02_usecontenxt_with_usestate"
import { InputColorComponent } from "./src/chapter03/03_usecontext"
import { App4 } from "./src/chapter03/04_pitfall-when-using-context-for-object"
import { App5 } from "./src/chapter03/05_creating-small-state-pieces"
import { App6 } from "./src/chapter03/06_creating-one-state-with-userreducer-and-propagate-with-multiple-contexts"
import { App7, App8 } from "./src/chapter03/07_factory-pattern-with-custom-hook"
import { App4_1 } from "./src/chapter04/01_use_store_with_subscription"
import { App4_2 } from "./src/chapter04/02_use_store_with_selector"
import { App4_3 } from "./src/chapter04/03_use_subscription_with_store"
import { App5_1, App5_1_2 } from "./src/chapter05/01_theme_context"
import { App5_2 } from "./src/chapter05/02_context_subscription"
import { App7_1, App7_2 } from "./src/chapter07/01_store"
import { App7_3, App7_4 } from "./src/chapter07/02_useStore"
import { App7_5, App7_6 } from "./src/chapter07/03_store_update"
import { Todo } from "./src/chapter07/04_todo"
import { App8_1 } from "./src/chapter08/01_atom"
import { App8_2, PersonComponent, PersonComponent2, PersonComponent3, PersonComponent4 } from "./src/chapter08/02_re_rendering"
import { App7_7 } from "./src/chapter07/05_zustand"
import { App8_3 } from "./src/chapter08/03_provider"
import { App8_4_after } from "./src/chapter08/04_todo_after"
import { App8_4 } from "./src/chapter08/04_todo_before"
import { ActionAtom, Writer } from "./src/chapter08/05_etc"
import { proxyObject } from "./src/chapter09/01_valtio"
import { proxy, snapshot } from "valtio"
import { Counter1, Counter2 } from "./src/chapter09/02_use_snapshot"
import { App9_1 } from "./src/chapter09/03_todo"
import { App10_1 } from "./src/chapter10/01_with_useState"
import { App10_2 } from "./src/chapter10/02_with_useReducer"
import { App10_3 } from "./src/chapter10/03_with_reactRedux"
import { App11, ReduxToolkitCounter } from "./src/chapter11/01_redux_with_zustand"
import { App11_2 } from "./src/chapter11/02_jotai_with_recoil"
import { App11_3 } from "./src/chapter11/03_mobx_with_valtio"

export default function App() {
    // 싱글턴이 아닌 전역 상태가 어떻게 작동하는지
    // const container1 = createContainer()
    // const container2 = createContainer()

    // container1.changeBase(10)

    // console.log(container1.addBase(2)) // shows "12"
    // console.log(container2.addBase(2)) // shows "3"

    // console.log(++proxyObject.count)
    // start setting count
    // end setting count
    // 1

    // const state2 = proxy({
    //     obj1: { c: 0 },
    //     obj2: { c: 0 }
    // })

    // const snap12 = snapshot(state2)
    // ++state2.obj1.c
    // const snap22 = snapshot(state2)
    // --state2.obj1.c

    // console.log("snap test: ", snap12.obj1.c, snap22.obj1.c)
    return (
        <ScrollView>
            <View style={styles.container}>
                {/* chapter11 */}
                <App11 />
                <App11_2 />
                <App11_3 />
                {/* chapter10 */}
                {/* <App10_1 />
                <App10_2 />
                <App10_3 /> */}
                {/* chaptoer09 */}
                {/* <Counter1 />
                <Counter2 />
                <Text style={{ paddingVertical: 10 }}>=== App9_1 ===</Text>
                <App9_1 /> */}
                {/* chapter08 */}
                {/* <App8_1 /> */}
                {/* <PersonComponent />
                <Text style={{ paddingVertical: 10 }}>=== PersonComponent2 ===</Text>
                <PersonComponent2 />
                <Text style={{ paddingVertical: 10 }}>=== PersonComponent3 ===</Text>
                <PersonComponent3 />
                <Text style={{ paddingVertical: 10 }}>=== App8_2 ===</Text>
                <App8_2 />
                <Text style={{ paddingVertical: 10 }}>=== App8_3 ===</Text>
                <App8_3 />
                <Text style={{ paddingVertical: 10 }}>=== App8_4 ===</Text>
                <App8_4 />
                <Text style={{ paddingVertical: 10 }}>=== App8_4_after ===</Text>
                <App8_4_after />
                <Text style={{ paddingVertical: 10 }}>=== Writer ===</Text>
                <Writer />
                <Text style={{ paddingVertical: 10 }}>=== ActionAtom ===</Text>
                <ActionAtom /> */}
                {/* chapter07 */}
                {/* <App7_1 />
                <App7_2 />
                <App7_3 />
                <App7_4 />*/}
                {/* <App7_5 />
                <App7_6 /> */}
                {/* <App7_7 /> */}
                {/* <Todo /> */}
                {/* chapter05 */}
                {/* <App5_1 />
                <App5_1_2 />
                <App5_2 /> */}
                {/* chapter04 */}
                {/* <App4_1 />
                <App4_2 />
                <App4_3 /> */}
                {/* chapter03 */}
                {/* <UseContextBasicComponent />
                <UseContextWithUseStateComponent />
                <InputColorComponent />
                <Text>====== app4 =====</Text>
                <App4 />
                <Text>====== app5 =====</Text>
                <App5 />
                <Text>====== app6 =====</Text>
                <App6 />
                <Text>====== app7 =====</Text>
                <App7 />
                <Text>====== app8 =====</Text>
                <App8 /> */}
                {/* chapter02 */}
                {/* <GrandParent /> */}
                {/*전역상태를 사용해야하는 케이스*/}
                {/* <GrandGlobalParent /> */}
                {/* chapter01 */}
                {/* <UseReducerWithUseState />
                <UseStateWithUseReducer />
                <InitComponent />
                <ReducerComponent />
                <LateInit />
                <UpdateRenderComponent />
                <BailOutComponent />
                <LocalComponent />
                <CountComponent /> */}
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 100,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "space-between"
    }
})

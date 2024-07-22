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

export default function App() {
    // 싱글턴이 아닌 전역 상태가 어떻게 작동하는지
    // const container1 = createContainer()
    // const container2 = createContainer()

    // container1.changeBase(10)

    // console.log(container1.addBase(2)) // shows "12"
    // console.log(container2.addBase(2)) // shows "3"

    return (
        <ScrollView>
            <View style={styles.container}>
                {/* chapter05 */}
                <App5_1 />
                <App5_1_2 />
                <App5_2 />
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

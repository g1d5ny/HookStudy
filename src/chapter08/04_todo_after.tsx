import Checkbox from "expo-checkbox"
import { atom, PrimitiveAtom, useAtom } from "jotai"
import { memo, useCallback, useState } from "react"
import { Text, TextInput, TextInputBase, TouchableOpacity, View } from "react-native"

type Todo = { title: string; done: boolean }
type TodoAtom = PrimitiveAtom<Todo>
const todoAtomsAtom = atom<TodoAtom[]>([])

interface IProps {
    todoAtom: TodoAtom
    remove: (todoAtom: TodoAtom) => void
}

const TodoItem = ({ todoAtom, remove }: IProps) => {
    const [todo, setTodo] = useAtom(todoAtom) // toggleTodo 대신 useAtom으로 todoAtom 값 구독함, todoAtom은 객체이며, id값 리턴함
    return (
        <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Checkbox value={todo.done} onValueChange={() => setTodo(prev => ({ ...prev, done: !prev.done }))} /> {/* useAtom 덕에 setTodo 간단해짐 */}
            <Text style={{ textDecorationLine: todo.done ? "line-through" : "none" }}>{todo.title}</Text>
            <TouchableOpacity style={{ backgroundColor: "#aaf" }} onPress={() => remove(todoAtom)}>
                <Text>Delete</Text>
            </TouchableOpacity>
        </View>
    )
}

// todo, removeTodo, toggleTodo를 변경하는 것이 아니라면 리렌더링 되지 않음
const MemoedTodoItem = memo(TodoItem)

const TodoList = () => {
    const [todoAtoms, setTodoAtoms] = useAtom(todoAtomsAtom) // todoAtoms를 값으로 반환하는 todoAtomsAtom 사용, todoAtoms: todoAtom을 여러개 가진 배열
    const remove = useCallback((todoAtom: TodoAtom) => setTodoAtoms(prev => prev.filter(item => item !== todoAtom)), [setTodoAtoms]) // todoAtomsAtom의 todoAtom 배열 필터링함

    return (
        <>
            {todoAtoms.map(todoAtom => (
                // todoAtom은 id값 리턴함 (아톰 구성은 문자열로 평가될때 uid 반환)
                <MemoedTodoItem key={`${todoAtom}`} todoAtom={todoAtom} remove={remove} />
            ))}
        </>
    )
}

const NewTodo = () => {
    const [, setTodoAtoms] = useAtom(todoAtomsAtom)
    const [text, setText] = useState("")

    const onPress = () => {
        setTodoAtoms(prev => [...prev, atom<Todo>({ title: text, done: false })])
    }

    return (
        <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text>Todo After</Text>
            <TextInput value={text} onChangeText={e => setText(e)} style={{ minWidth: 100, borderWidth: 2 }} />
            <TouchableOpacity disabled={!text} style={{ backgroundColor: "#afa" }} onPress={onPress}>
                <Text>Add</Text>
            </TouchableOpacity>
        </View>
    )
}

export const App8_4_after = () => {
    return (
        <>
            <TodoList />
            <NewTodo />
        </>
    )
}

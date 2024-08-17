import Checkbox from "expo-checkbox"
import { atom, useAtom } from "jotai"
import { memo, useCallback, useState } from "react"
import { Text, TextInput, TextInputBase, TouchableOpacity, View } from "react-native"

type Todo = {
    id: string
    title: string
    done: boolean
}

const todosAtom = atom<Todo[]>([])

interface IProps {
    todo: Todo
    removeTodo: (id: string) => void
    toggleTodo: (id: string) => void
}

const TodoItem = ({ todo, removeTodo, toggleTodo }: IProps) => {
    return (
        <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Checkbox value={todo.done} onValueChange={() => toggleTodo(todo.id)} />
            <Text style={{ textDecorationLine: todo.done ? "line-through" : "none" }}>{todo.title}</Text>
            <TouchableOpacity style={{ backgroundColor: "#aaf" }} onPress={() => removeTodo(todo.id)}>
                <Text>Delete</Text>
            </TouchableOpacity>
        </View>
    )
}

// todo, removeTodo, toggleTodo를 변경하는 것이 아니라면 리렌더링 되지 않음
const MemoedTodoItem = memo(TodoItem)

const TodoList = () => {
    const [todos, setTodos] = useAtom(todosAtom)

    const removeTodo = useCallback((id: string) => setTodos(prev => prev.filter(item => item.id !== id)), [setTodos])
    // 전체 배열 순회해야하며 배열 자체를 갱신해야하는 문제 있음
    const toggleTodo = useCallback((id: string) => setTodos(prev => prev.map(item => (item.id === id ? { ...item, done: !item.done } : item))), [setTodos])

    return (
        <>
            {todos.map(todo => (
                <MemoedTodoItem key={todo.id} todo={todo} removeTodo={removeTodo} toggleTodo={toggleTodo} />
            ))}
        </>
    )
}

let todoId = 0
const NewTodo = () => {
    const [, setTodos] = useAtom(todosAtom)
    const [text, setText] = useState("")
    const onPress = () => {
        setTodos(prev => [...prev, { id: String(todoId++), title: text, done: false }])
    }

    return (
        <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text>Todo Before</Text>
            <TextInput value={text} onChangeText={e => setText(e)} style={{ minWidth: 100, borderWidth: 2 }} />
            <TouchableOpacity disabled={!text} style={{ backgroundColor: "#afa" }} onPress={onPress}>
                <Text>Add</Text>
            </TouchableOpacity>
        </View>
    )
}

export const App8_4 = () => {
    return (
        <>
            <TodoList />
            <NewTodo />
        </>
    )
}

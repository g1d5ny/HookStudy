// 새로운 할 일 생성
// 할 일 목록 표시
// 할 일 완료 상태로 전환
// 할 일 제거

import Checkbox from "expo-checkbox"
import { memo, useState } from "react"
import { Text, TextInput, TouchableOpacity, View } from "react-native"
import { create } from "zustand"

type Todo = {
    id: number
    title: String
    done: boolean
}

type StoreState = {
    todos: Todo[]
    addTodo: (title: String) => void
    removeTodo: (id: number) => void
    toggleTodo: (id: number) => void
}

let nextId = 0
const useStore = create<StoreState>(set => ({
    todos: [],
    addTodo: title =>
        set(prev => ({
            todos: [...prev.todos, { id: ++nextId, title, done: false }]
        })),
    removeTodo: id =>
        set(prev => ({
            todos: prev.todos.filter(todo => todo.id !== id)
        })),
    toggleTodo: id =>
        set(prev => ({
            todos: prev.todos.map(todo => (todo.id === id ? { ...todo, done: !todo.done } : todo))
        }))
}))

const selectRemoveTodo = (state: StoreState) => state.removeTodo
const selectToggleTodo = (state: StoreState) => state.toggleTodo

const TodoItem = ({ todo }: { todo: Todo }) => {
    const removeTodo = useStore(selectRemoveTodo)
    const toggleTodo = useStore(selectToggleTodo)

    return (
        <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Checkbox style={{ margin: 8 }} value={todo.done} onValueChange={() => toggleTodo(todo.id)} />
            <Text style={{ textDecorationLine: todo.done ? "line-through" : "none" }}>{todo.title}</Text>
            <TouchableOpacity style={{ margin: 8, backgroundColor: "#afa" }} onPress={() => removeTodo(todo.id)}>
                <Text>Delete</Text>
            </TouchableOpacity>
        </View>
    )
}

const MemoedTodoItem = memo(TodoItem)

const selectTodos = (state: StoreState) => state.todos
const selectAddTodo = (state: StoreState) => state.addTodo

const TodoList = () => {
    const todos = useStore(selectTodos)
    return (
        <View>
            {todos.map(todo => (
                <MemoedTodoItem key={todo.id} todo={todo} />
            ))}
        </View>
    )
}

const NewTodo = () => {
    const addTodo = useStore(selectAddTodo)
    const [text, setText] = useState("")
    const onClick = () => {
        addTodo(text)
        setText("")
    }

    return (
        <View>
            <TextInput value={text} onChangeText={e => setText(e)} />
            <TouchableOpacity style={{ width: 50, margin: 8, backgroundColor: "#faa" }} onPress={onClick} disabled={!text}>
                <Text>Add</Text>
            </TouchableOpacity>
        </View>
    )
}

export const Todo = () => {
    return (
        <>
            <TodoList />
            <NewTodo />
        </>
    )
}

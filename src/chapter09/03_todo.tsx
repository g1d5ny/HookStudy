import Checkbox from "expo-checkbox"
// import { nanoid } from "nanoid"
import { memo, useState } from "react"
import { Text, TextInput, TextInputBase, TouchableOpacity, View } from "react-native"
import { proxy, useSnapshot } from "valtio"

type Todo = {
    id: string
    title: string
    done: boolean
}

const state = proxy<{ todos: Todo[] }>({
    todos: []
})

let todoId = 0
const createTodo = (title: string) => {
    state.todos.push({
        id: String(todoId++),
        title,
        done: false
    })
}

const removeTodo = (id: string) => {
    const index = state.todos.findIndex(item => item.id === id)
    state.todos.splice(index, 1)
}

const toggleTodo = (id: string) => {
    const index = state.todos.findIndex(item => item.id === id)
    state.todos[index].done = !state.todos[index].done
}

const TodoItem = ({ id, title, done }: Todo) => {
    return (
        <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Checkbox value={done} onValueChange={() => toggleTodo(id)} />
            <Text style={{ textDecorationLine: done ? "line-through" : "none" }}>{title}</Text>
            <TouchableOpacity style={{ backgroundColor: "#aaf" }} onPress={() => removeTodo(id)}>
                <Text>Delete</Text>
            </TouchableOpacity>
        </View>
    )
}

const MemoedTodoItem = memo(TodoItem)

const TodoList = () => {
    const { todos } = useSnapshot(state)
    const todoIds = todos.map(todo => todo.id)

    return (
        <>
            {todos.map(todo => (
                <MemoedTodoItem key={todo.id} id={todo.id} title={todo.title} done={todo.done} />
            ))}
            {/* 배열에서 id의 순서가 변경되거나 id가 추가 또는 제거되는 경우에만 리렌더링 됨, done 상태가 변경되는 경우 리렌더링 X */}
            {todoIds.map(todoId => (
                <MemoedTodoItem key={todoId} id={todoId} title={todoId} done={todos[todoId].done} />
            ))}
        </>
    )
}

const NewTodo = () => {
    const [text, setText] = useState("")
    const onClick = () => {
        createTodo(text)
        setText("")
    }

    return (
        <View style={{ flexDirection: "row", alignItems: "center" }}>
            <TextInput value={text} onChangeText={e => setText(e)} style={{ borderWidth: 2, minWidth: 100 }} />
            <TouchableOpacity onPress={onClick} disabled={!text} style={{ backgroundColor: "#afa" }}>
                <Text>Add</Text>
            </TouchableOpacity>
        </View>
    )
}

export const App9_1 = () => {
    return (
        <>
            <TodoList />
            <NewTodo />
        </>
    )
}

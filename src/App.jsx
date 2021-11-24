import './App.css';
import React from 'react';
import Dashboard from './Components/Dashboard';

const nextId = arr => arr.reduce((acc, obj)=>Math.max(acc, obj.id), 0) + 1

const demoDashboards= [
    {id: 1, name: "Bevásárlás" },
    {id: 2, name: "Tanulás" },
  ]

const demoTodos = [
    { id: 2, dashId: 1, name: "Lidl", description: "Tej, kenyér" },
    { id: 3, dashId: 1, name: "Decathlon", description: "Kosárlabda" },
    { id: 4, dashId: 1, name: "Media Markt", description: "Laptop" },
    { id: 6, dashId: 2, name: "Codecool", description: "React, jest" },
    { id: 7, dashId: 2, name: "Egyetem", description: "Vezetésszervezés" },
]

const App = () => {
    const [dashboards, setDashboards] = React.useState(demoDashboards)
    const [todos, setTodos] = React.useState(demoTodos)

    const addDashboard = () => setDashboards([...dashboards, {id: nextId(dashboards), name: 'Untilted dashboard'}])
    const addTodo = (id) => setTodos([...todos, {id: nextId(todos), dashId: id}])
    const removeTodo = (id) => setTodos(todos.filter(todo=>todo.id !== id))
    const renameDashboard = (id, name) => {
        const newArr = [...dashboards]
        const obj = newArr.find(item=>item.id===id)
        obj.name = name
        setDashboards(newArr)
    }
    const modifyTodo = (id, name, description) => {
        const newArr = [...todos]
        const obj = newArr.find(item=>item.id===id)
        obj.name = name
        obj.description = description
        setTodos(newArr)
    }
    const functions = { addDashboard, addTodo, removeTodo, renameDashboard, modifyTodo }

    function handleOnDragEnd(result) {
        const newArr = [...todos]
        const obj = newArr.find(item=>item.id===result.draggableId*1)
        obj.dashId = result.destination.droppableId*1
        setTodos(newArr)
    }

    return (
        <div id="app-container">
            {dashboards.map(dashboard => 
                <Dashboard key={dashboard.id} dashboard={dashboard} todos={todos.filter(todo=>todo.dashId===dashboard.id)} {...functions} />)}
            <button onClick={addDashboard}>+</button>
        </div>
    )
}

export default App;
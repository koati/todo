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
    const renameDashboard = (id, name) => setDashboards(dashboards.map(board=>board.id===id ? {...board, name: name} : board))
    const modifyTodo = (id, name, description) => setTodos(todos.map(todo=>todo.id===id ? {...todo, name: name, description: description} : todo))
    const functions = { addTodo, removeTodo, renameDashboard, modifyTodo }

    return (
        <div id="app-container">
            {dashboards.map(dashboard => 
                <Dashboard key={dashboard.id} dashboard={dashboard} todos={todos.filter(todo=>todo.dashId===dashboard.id)} {...functions} />)}
            <button onClick={addDashboard}>+</button>
        </div>
    )
}

export default App;
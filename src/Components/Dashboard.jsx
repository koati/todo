import React from 'react';
import Card from './Card';

const Dashboard = ({dashboard, todos, ...fn}) => {
    const [value, setValue] = React.useState(dashboard.name)
    const [edit, setEdit] = React.useState(false)
    
    const addCard = () => fn.addTodo(dashboard.id)
    const save = () => {
        fn.renameDashboard(dashboard.id, value)
        setEdit(false)
    }
    const cancel = () => {
        setValue(dashboard.name)
        setEdit(false)
    }

    return (
        <div className="dashboard">
            {edit && <input value={value} onChange={e=>setValue(e.target.value)} />}
            {!edit && <h2>{dashboard.name}</h2>}
            <div className='card-holder'>
                {todos.map(card => <Card key={card.id} card={card} removeTodo={fn.removeTodo} modifyTodo={fn.modifyTodo}/>)}
            </div>
            {!edit && <button onClick={()=>setEdit(true)}>Edit</button>}
            {edit && <button onClick={cancel}>Cancel</button>}
            {edit && <button onClick={save}>Save</button>}
            {!edit && <button onClick={addCard}>Create card</button>}
        </div>
    )
}

export default Dashboard
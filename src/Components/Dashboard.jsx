import React from 'react';
import Card from './Card';
import { Droppable, Draggable } from 'react-beautiful-dnd';


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
        <Droppable droppableId={''+dashboard.id}>
            {(provided) => (
                <div className="dashboard" {...provided.droppableProps} ref={provided.innerRef}>
                    {edit && <input value={value} onChange={e=>setValue(e.target.value)} />}
                    {!edit && <h2>{dashboard.name}</h2>}
                    <div className='card-holder'>
                        {todos.map((card, index) => {
                            return (
                                <Draggable key={card.id} draggableId={''+card.id} index={index}>
                                    {(provided) => (  
                                        <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                                            <Card card={card} removeTodo={fn.removeTodo} modifyTodo={fn.modifyTodo}/>
                                        </div>
                                    )}
                                </Draggable>
                            )
                        })}
                    </div>
                    {!edit && <button onClick={()=>setEdit(true)}>Edit</button>}
                    {edit && <button onClick={cancel}>Cancel</button>}
                    {edit && <button onClick={save}>Save</button>}
                    {!edit && <button onClick={addCard}>Create card</button>}
                    {provided.placeholder}
                </div>
            )}
        </Droppable>
    )
}

export default Dashboard
import React from 'react';

const Card = ({card, removeTodo, modifyTodo}) => {
    const [name, setName] = React.useState(card.name)
    const [desc, setDesc] = React.useState(card.description)
    const [edit, setEdit] = React.useState(false)
    const [visible, setVisible] = React.useState(true)

    const save = () => {
        modifyTodo(card.id, name, desc)
        setEdit(false)
    }
    const cancel = () => {
        setName(card.name)
        setDesc(card.description)
        setEdit(false)
    }

    return (
        <div className="card" onClick={(e)=> {if (e.target === e.currentTarget) setVisible(!visible)} } >
            {edit && <input value={name} onChange={(e)=>setName(e.target.value)} placeholder='Type a name' />}
            {!edit && <h3>{card.name}</h3>}

            {edit && visible && <textarea value={desc} onChange={(e)=>setDesc(e.target.value)} cols="30" rows="10" placeholder='Type the description' />}
            {!edit && visible && <p>{card.description}</p>}

            <div className="buttonbar">
            {!edit && <button onClick={()=>setEdit(true)}>Edit</button>}
            {edit && <button onClick={cancel}>Cancel</button>}
            {edit && <button onClick={save}>Save</button>}
            <button onClick={()=>removeTodo(card.id)}>Delete card</button>
            </div>
        </div>
    )
}

export default Card

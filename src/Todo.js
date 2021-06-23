import React from 'react'
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
function Todo({ todos,deleteItem,editItem }) {
    return (
        <div>
            {todos.map((data) => {
                return (
                    <article>
                        <p className='todo'>{data.title}</p>
                        <div className='btns'>

                       <button onClick={()=>{editItem(data.id)}}> <FaEdit style={{color:'green'}}/></button>
                       <button onClick={()=>{deleteItem(data.id)}}><FaTrashAlt style={{color:'red'}}/></button>
                        </div>
                    </article>
                )
            })}
        </div>
    )
}

export default Todo

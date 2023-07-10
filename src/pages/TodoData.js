import React, { useState } from 'react'
import Todo from './Todo';

function TodoData() {
    let [todo,setTodo]=useState([]);
  return (
    <div>
      <Todo todo={todo} setTodo={setTodo}/>
    </div>
  )
}

export default TodoData

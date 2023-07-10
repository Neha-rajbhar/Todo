import React, { useEffect, useState } from "react";
import "./Todo.css";
import { AiFillDelete } from "react-icons/ai";
import { GrFormAdd } from "react-icons/gr";
import { FcOk } from "react-icons/fc";
import { FiEdit } from "react-icons/fi";

function Todo({ todo, setTodo }) {
  const [input, setInput] = useState("");
  const [isEditable, setEditable] = useState(true);
  const [isCurrent, setCurrentData] = useState(null);
  const [checked, setChecked] = useState("");

  const handleAddItem = () => {
    if (!input) {
      alert("please fill the cell");
    } else if (input && !isEditable) {
      setTodo(
        todo.map((elem) => {
          if (elem.id === isCurrent) {
            return { ...elem, name: input };
          }
          return elem;
        })
      );

      setInput("");
      setCurrentData(null);
      setEditable(true);
    } else {
      const data = {
        id: new Date().getTime().toString(),
        name: input,
        isCompleted: false,
        isEditable: false,
      };
      setTodo([...todo, data]);
      setInput("");
    }
  };

  const handleDelete = (id) => {
    let deleteData = todo.filter((elem) => {
      return elem.id !== id;
    });

    setTodo(deleteData);
  };

  const handleEdit = (id) => {
    let newData = todo.find((elem) => {
      return elem.id === id;
      //   if (elem.id === id) {
      //     setInput(elem.name);
      //     //elem.name = input;
      //     //return elem;
      //   }
    });
    setEditable(false);
    setInput(newData.name);
    setCurrentData(id);
  };
  useEffect(() => {
    console.log(todo);
  }, [todo]);

  const handleComplete = (id) => {
    setTodo(
      todo.map((elem) => {
        if (elem.id === id) {
          return { ...elem, isCompleted: true };
        }
        return elem;
      })
    );
  };

  return (
    <div className="mainDiv">
        <h2 className="h2">Task's List</h2>
      <div className="mainForm">
        <div>
          <input
            type="text"
            value={input}
            placeholder="Enter the task"
            onChange={(e) => setInput(e.target.value)}
          />

          {isEditable ? (
            <button  className="add addsColor" id="add" onClick={handleAddItem}>
              <GrFormAdd />
            </button>
          ) : (
            <button className="edit editss" onClick={handleAddItem}>
              <FiEdit />
            </button>
          )}
        </div>

        {todo.map((task) => {
          return (
            <>
              <div className="task" key={task.id}>
                {task.isCompleted ? (
                  <s>
                    <p className="p">{task.name}</p>
                  </s>
                ) : (
                  <p className="p">{task.name}</p>
                )}

                <div className="innerTask">
                  <button
                    className="icons"
                    onClick={() => handleComplete(task.id)}
                  >
                    <FcOk />
                  </button>
                  <button
                    className="icons edit"
                    onClick={() => handleEdit(task.id)}
                  >
                    <FiEdit />
                  </button>
                  <button
                    className="icons delete"
                    onClick={() => handleDelete(task.id)}
                  >
                    <AiFillDelete />
                  </button>
                </div>
              </div>
            </>
          );
        })}
      </div>
    </div>
  );
}

export default Todo;

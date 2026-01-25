import { useState } from "react";

const todoList = () => { 
    const [list, setList] = useState([])
    const [value, setValue] = useState("")

    const addTodo = (e) =>{
        if(e.key === "Enter" && value.trim() !== ""){
            setList([...list, value]);
            setValue("");
        }
    };

    const deleteTodo = (indexToDelete) => {
        setList(list.filter((_,index) => index !== indexToDelete));
    }
    return(
        <div className="todoList">
            <input 
            type="text"
            placeholder="What needs to be done?"
            value={value} 
            onChange={(e) => setValue(e.target.value)}
            />

            <ul>
                {list.map((item,index) => (
                    <li key={index}>
                        <span>{item}</span>
                        <button onClick={() => deleteTodo(index)}>x</button>
                    </li>
                ))}
            </ul>

            <p>{list.length} item left</p>
        </div>
    )
}

export default TodoList;
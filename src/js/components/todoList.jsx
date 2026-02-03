import { useState, useEffect } from "react";

const USERNAME = "manu_todo";

const TodoList = () => {
    const [list, setList] = useState([]);
    const [value, setValue] = useState("");

    const createUser = () => {
        fetch(`https://playground.4geeks.com/todo/users/${USERNAME}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify([])
        }).catch(() => {});
    };

    const getTodos = () => {
        fetch(`https://playground.4geeks.com/todo/users/${USERNAME}`)
            .then(resp => resp.json())
            .then(data => setList(data.todos))
            .catch(err => console.log(err));
    };

    const addTodo = (e) => {
        if (e.key === "Enter" && value.trim() !== "") {
            const newTask = { label: value, done: false };

            fetch(`https://playground.4geeks.com/todo/todos/${USERNAME}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newTask)
            })
            .then(() => {
                getTodos();
                setValue("");
            });
        }
    };

    const deleteTodo = (id) => {
        fetch(`https://playground.4geeks.com/todo/todos/${id}`, {
            method: "DELETE"
        })
        .then(() => getTodos())
        .catch(err => console.log(err));
    };

    useEffect(() => {
        createUser();
        getTodos();
    }, []);

    return (
        <>
            <h1 className="tittle">Todos</h1>
            <div className="todoList">
                <input
                    type="text"
                    placeholder="What needs to be done?"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    onKeyDown={addTodo}
                />

                <ul>
                    {list.map(item => (
                        <li key={item.id}>
                            <span>{item.label}</span>
                            <button onClick={() => deleteTodo(item.id)}>x</button>
                        </li>
                    ))}
                </ul>

                <p>{list.length} items left</p>
            </div>
        </>
    );
};

export default TodoList;


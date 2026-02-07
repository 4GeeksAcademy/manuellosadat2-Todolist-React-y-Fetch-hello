import { useState, useEffect } from "react";
import React, { useRef } from 'react';
import emailjs from '@emailjs/browser';


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

    const clearAll = () => {
        const deletePromises = list.map(task => {
            return fetch(`https://playground.4geeks.com/todo/todos/${task.id}`,{
                method: "DELETE"
            })
        })

        Promise.all(deletePromises)
        .then(() => {
            getTodos()
        })
        .catch(error => {
            console.log("ERROR AL BORRAR TODO", error);
        })
    }

    const sendEmail = () => {
    if (list.length === 0) {
        alert("No hay tareas para enviar 😅");
        return;
    }

    const todosText = list
        .map(task => `• ${task.label}`)
        .join("\n");

    console.log("ENVIANDO EMAIL CON:", todosText); // 👈 DEBUG

    emailjs.send(
        "service_vppyo7g",        // ✅ TU SERVICE
        "template_6akm30n",        // ⚠️ TU TEMPLATE REAL
        {
            todos: todosText
        },
        "cHFTu0TxS2OEjV4qo"      // ⚠️ TU PUBLIC KEY REAL
    )
    .then(() => {
        alert("📧 Lista enviada correctamente");
    })
    .catch(error => {
        console.error("ERROR AL ENVIAR EMAIL:", error);
        alert("❌ Error enviando el email");
    });
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
                <button className="clearAll" onClick={clearAll}>Clear all</button>
            
                <button className="botonEmail" onClick={sendEmail}>
                    Enviar lista por email 📧
                </button>
            </div>
        </>
    );
};

export default TodoList;


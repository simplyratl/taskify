import React, { useState } from "react";
import InputFields from "./components/InputFields";
import ToDoList from "./components/ToDoList";
import { ToDo } from "./model";

const App: React.FC = () => {
    const [todo, setTodo] = useState<string>("");
    const [todos, setTodos] = useState<ToDo[]>([]);

    const handleAdd = (e: React.FormEvent) => {
        e.preventDefault();

        if (todo) {
            setTodos([...todos, { id: Date.now(), todo, isDone: false }]);
            setTodo("");
        }
    };

    return (
        <div className="container">
            <h1>Taskify</h1>

            <InputFields todo={todo} setTodo={setTodo} handleAdd={handleAdd} />

            <ToDoList todos={todos} setTodos={setTodos} />
        </div>
    );
};

export default App;

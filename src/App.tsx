import React, { useState } from "react";
import InputFields from "./components/InputFields";
import ToDoList from "./components/ToDoList";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { ToDo } from "./model";

const App: React.FC = () => {
    const [todo, setTodo] = useState<string>("");
    const [todos, setTodos] = useState<ToDo[]>([]);
    const [completedTodos, setCompletedTodos] = useState<ToDo[]>([]);

    const handleAdd = (e: React.FormEvent) => {
        e.preventDefault();

        if (todo) {
            setTodos([...todos, { id: Date.now(), todo, isDone: false }]);
            setTodo("");
        }
    };

    const onDragEnd = (result: DropResult) => {
        const { source, destination } = result;

        if (!destination) return;

        if (destination.droppableId === source.droppableId && destination.index === source.index) return;

        let add;
        const active = todos;
        const completed = completedTodos;

        if (source.droppableId === "ToDoList") {
            add = active[source.index];
            active.splice(source.index, 1);
        } else {
            add = completed[source.index];
            completed.splice(source.index, 1);
        }

        if (destination.droppableId === "ToDoList") {
            active.splice(destination.index, 0, add);
        } else {
            completed.splice(destination.index, 0, add);
        }

        setCompletedTodos(completed);
        setTodos(active);
    };

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <div className="container">
                <h1>Taskify</h1>

                <InputFields todo={todo} setTodo={setTodo} handleAdd={handleAdd} />

                <ToDoList
                    todos={todos}
                    setTodos={setTodos}
                    completedTodos={completedTodos}
                    setCompletedTodos={setCompletedTodos}
                />
            </div>
        </DragDropContext>
    );
};

export default App;

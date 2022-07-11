import React, { useRef, useState, useEffect } from "react";
import { ToDo } from "../model";
import { MdOutlineDelete, MdOutlineEdit } from "react-icons/md";
import { IoCheckmarkOutline } from "react-icons/io5";
import ToDoList from "./ToDoList";

interface Props {
    index: number;
    todo: ToDo;
    todos: ToDo[];
    setTodos: React.Dispatch<React.SetStateAction<ToDo[]>>;
}

const SingleToDo: React.FC<Props> = ({ index, todo, todos, setTodos }) => {
    const [editMode, setEditMode] = useState<boolean>(false);
    const [editText, setEditText] = useState<string>(todo.todo);

    const inputRef = useRef<HTMLInputElement>(null);

    const handleDone = (id: number) => {
        setTodos(todos.map((todo) => (todo.id === id ? { ...todo, isDone: !todo.isDone } : todo)));
    };

    const handleDelete = (id: number) => {
        setTodos(todos.filter((todo) => todo.id !== id));
    };

    const handleEdit = (e: React.FormEvent, id: number) => {
        e.preventDefault();

        if (editText.length === 0) {
            setEditMode(false);
            setEditText(todo.todo);
            return;
        }

        setTodos(todos.map((todo) => (todo.id === id ? { ...todo, todo: editText } : todo)));
        setEditMode(false);
    };

    useEffect(() => {
        inputRef.current?.focus();
    }, [editMode]);

    return (
        <li className="todos__element" key={index}>
            <form className="todo__single" onSubmit={(e) => handleEdit(e, todo.id)}>
                <div className="empty"></div>

                {editMode ? (
                    <input
                        value={editText}
                        className="todos__single-input-edit"
                        onChange={(e) => setEditText(e.target.value)}
                        ref={inputRef}
                    />
                ) : (
                    <span className={`todo__single-text ${todo.isDone && "checked"}`}>{todo.todo}</span>
                )}

                <div className="todo__single-icons">
                    <span className="todo__single-icon delete" onClick={() => handleDelete(todo.id)}>
                        <MdOutlineDelete />
                    </span>

                    <span className="todo__single-icon edit" onClick={() => setEditMode(!editMode)}>
                        <MdOutlineEdit />
                    </span>

                    <span
                        className={`todo__single-icon check ${todo.isDone && "checked"}`}
                        onClick={() => handleDone(todo.id)}
                    >
                        <IoCheckmarkOutline />
                    </span>
                </div>
            </form>
        </li>
    );
};

export default SingleToDo;

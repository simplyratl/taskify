import React from "react";
import { ToDo } from "../model";
import { motion } from "framer-motion";
import SingleToDo from "./SingleToDo";

interface Props {
    todos: ToDo[];
    setTodos: React.Dispatch<React.SetStateAction<ToDo[]>>;
}

const ToDoList: React.FC<Props> = ({ todos, setTodos }) => {
    return (
        <div className="todos">
            <ul className="todos__list">
                {todos.map((todo, index) => (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                        <SingleToDo todo={todo} index={index} todos={todos} setTodos={setTodos} />
                    </motion.div>
                ))}
            </ul>
        </div>
    );
};

export default ToDoList;

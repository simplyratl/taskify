import React from "react";
import { ToDo } from "../model";
import { motion } from "framer-motion";
import { Droppable } from "react-beautiful-dnd";
import SingleToDo from "./SingleToDo";

interface Props {
    todos: ToDo[];
    setTodos: React.Dispatch<React.SetStateAction<ToDo[]>>;
    completedTodos: ToDo[];
    setCompletedTodos: React.Dispatch<React.SetStateAction<ToDo[]>>;
}

const ToDoList: React.FC<Props> = ({ todos, setTodos, completedTodos, setCompletedTodos }) => {
    return (
        <div className="todos">
            <Droppable droppableId="ToDoList">
                {(provided, snapshot) => (
                    <div
                        className={`todos__list ${snapshot.isDraggingOver ? "dragactive" : ""}`}
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                    >
                        <p className="todos__list-heading">Active Tasks</p>

                        <ul className="todos__list">
                            {todos.map((todo, index) => (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    key={index}
                                >
                                    <SingleToDo todo={todo} index={index} todos={todos} setTodos={setTodos} />
                                </motion.div>
                            ))}
                        </ul>
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
            <Droppable droppableId="ToDoDone">
                {(provided, snapshot) => (
                    <div
                        className={`todos__list done ${snapshot.isDraggingOver ? "dragcomplete" : ""}`}
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                    >
                        <p className="todos__list-heading">Finished Tasks</p>

                        <ul className="todos__list">
                            {completedTodos.map((todo, index) => (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    key={index}
                                >
                                    <SingleToDo
                                        todo={todo}
                                        index={index}
                                        todos={todos}
                                        setTodos={setCompletedTodos}
                                    />
                                </motion.div>
                            ))}
                        </ul>
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </div>
    );
};

export default ToDoList;

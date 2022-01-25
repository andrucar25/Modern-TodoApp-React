import React, { useState } from "react";

import TaskList from "./TaskList";
import { v4 as uuidv4 } from "uuid";

import iconsun from "../images/icon-sun.svg";
import iconmoon from "../images/icon-moon.svg";

const AddTask = ({ lightTheme, setLightTheme }) => {
  const [tasks, setTasks] = useState([
    { id: 1, description: "Complete online JS course", state: false },
    { id: 2, description: "Jog around the park 3x", state: true },
    { id: 3, description: "10 minutes meditation", state: true },
    { id: 4, description: "Read for 1 hour", state: true },
    { id: 5, description: "Complete Todo App on Frontend Mentor", state: true },
  ]);

  const [inputTask, setInputTask] = useState("");

  const [temporalTasks, setTemporalTasks] = useState([...tasks]);

  //Agregar una tarea
  const handleAddButtonClick = () => {
    const newTask = {
      id: uuidv4(),
      description: inputTask,
      state: true,
    };

    const newTasks = [...tasks, newTask];

    setTasks(newTasks);
    setInputTask("");
    setTemporalTasks(newTasks);
  };

  //Cambiar el color del theme
  const ChangeTheme = () => {
    setLightTheme(!lightTheme);
  };

  return (
    <>
      <div className="todo__container">
        <div className="todo__header">
          <p className="todo__header__title">TODO</p>
          {lightTheme ? (
            <img
              src={iconmoon}
              className="todo__header__icon"
              alt="icon"
              onClick={ChangeTheme}
            />
          ) : (
            <img
              src={iconsun}
              className="todo__header__icon"
              alt="icon"
              onClick={ChangeTheme}
            />
          )}
        </div>
        <div className="todo__add__task">
          <div
            className={
              lightTheme
                ? "todo__label__container__light"
                : "todo__label__container"
            }
          >
            <div
              className={
                lightTheme ? "todo__checkbox__light" : "todo__checkbox"
              }
              onClick={handleAddButtonClick}
            ></div>
            <input
              type="text"
              placeholder="Create a new todo..."
              className={lightTheme ? "todo__text__light" : "todo__text"}
              value={inputTask}
              onChange={(e) => setInputTask(e.target.value)}
            />
          </div>
        </div>

        <TaskList
          tasks={tasks}
          setTasks={setTasks}
          lightTheme={lightTheme}
          temporalTasks={temporalTasks}
          setTemporalTasks={setTemporalTasks}
        ></TaskList>
        <div className="todo__bot__text">
          <p className="todo__bot__text__style">
            Drag and drop to reorder list
          </p>
        </div>
      </div>
    </>
  );
};

export default AddTask;

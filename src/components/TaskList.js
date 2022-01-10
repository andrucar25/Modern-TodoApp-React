import React, {useState, useEffect} from 'react';


import icondelete from '../images/icon-cross.svg';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const TaskList = ({tasks, setTasks, lightTheme}) => {

   
    
    const [itemsLeft, setItemsLeft] = useState(0);
    const [appearIcon, setAppearIcon] = useState(false);

    const [temporalTasks, setTemporalTasks] = useState([...tasks]);

    //Filtrar las tareas que estan pendientes
    const filterItemsLeft =(tasks)=>{
       const itemsPending = tasks.filter(arrayTask => arrayTask.state === true);
        setItemsLeft(itemsPending.length);
    }

    //Mostrar el numero de tareas pendientes
    useEffect(() => {
        filterItemsLeft(tasks);
    }, [tasks, setTasks]);

    const [allState, setAllState] = useState(true);
    const [activeState, setActiveState] = useState(false);
    const [completedState, setCompletedState] = useState(false);


    //Cambiar el estado del objeto 
    const changeStateCheckButton = (index) =>{

        const newTasks = [...tasks];

		newTasks[index].state = !newTasks[index].state;

		setTasks(newTasks);

    }


    //Listar todas las tareas
    const listAllTasks = () => {
        setAllState(true);
        setActiveState(false);
        setCompletedState(false);
        setTemporalTasks(tasks);
        setTasks(temporalTasks);
        
 
    }

    //Listar tareas activas
    const listActiveTasks = () => {
        setAllState(false);
        setActiveState(true);
        setCompletedState(false);

   
        setTasks(temporalTasks);
        
        setTemporalTasks([...tasks]);
        const activeTasks = tasks.filter(task=> task.state === true);
        
        setTasks(activeTasks);
    
        
    }

    //Listar tareas completadas
    const listcompletedTasks = () => {
        setAllState(false);
        setActiveState(false);
        setCompletedState(true);

        setTasks(temporalTasks);
        setTemporalTasks([...tasks]);
        const completedTasks = tasks.filter(task=> task.state === false);
        
        setTasks(completedTasks);
    }

    //Eliminar una tarea
    const deleteTask = (id) => {
        const newTasks = tasks.filter(task=> task.id !== id);
        setTasks(newTasks); 
    }

    //Eliminar tareas completadas
    const clearCompleted = () =>{
        const newDeletedTasks = tasks.filter(task => task.state === true);
        setTasks(newDeletedTasks);
        
    }

    //Aparecer el icono de delete
    // const appearDeleteIcon = (index) => {
    //     const newTasks = [...tasks];
		
    //     if(index === newTasks[index]){
    //         setAppearIcon(!appearIcon);
    //     }
        
    // }

    //Desaparecer el icono de delete

    // const disappearDeleteIcon = (index) => {
    //     setAppearIcon(!appearIcon);
    //     setAppearIcon(!appearIcon);
    // }

    //Funcion para reordenar un listado de un punto inicial a un punto final
    const reorder = (list, startIndex, endIndex) => {
        const result = [...list];
        const [removed] = result.splice(startIndex, 1);
        result.splice(endIndex, 0, removed);
      
        return result;
      };

    return (  
        <>
         <DragDropContext onDragEnd={(result) => {
            const {source, destination} = result;
            if(!destination){
                return;
            }
            if(source.index === destination.index && source.droppableId === destination.droppableId){
                return;
            }

            setTasks(prevTasks => reorder(prevTasks, source.index, destination.index));
         }}>
            <div className={lightTheme ? "container__task__list__light" : "container__task__list"}>
                <Droppable droppableId="tasksdroppable">
                    {(droppableProvided) => (
                    <div 
                        {...droppableProvided.droppableProps}
                        ref={droppableProvided.innerRef}
                        className="div__task__list">
                            {tasks.map((task, index)=>(
                                <Draggable key={task.id} draggableId={`${task.id}`} index={index}>
                                   {(draggableProvided) =>(
                                        <div 
                                            {...draggableProvided.draggableProps}
                                            ref={draggableProvided.innerRef}
                                            {...draggableProvided.dragHandleProps}
                                            className={lightTheme ? "div_task__light" : "div_task" }
                                            // onMouseEnter={()=>appearDeleteIcon(index)}
                                            // onMouseLeave={()=>disappearDeleteIcon(index)}
                                           >
                                                {task.state ? (
                                                    <div className={lightTheme ?"todo__checkbox__light" :"todo__checkbox"} onClick={()=>changeStateCheckButton(index)}></div>
                                                ):   <div className="todo__checkbox__false" onClick={()=>changeStateCheckButton(index)}></div>}
                                                
                                                {task.state ? (
                                                    <input type="text" value={task.description} className={lightTheme ? "task__text__light":"task__text"}
                                                        disabled 
                                                    />
                                                ) : 
                                                    <input type="text" value={task.description} className={lightTheme ? "task__text__false__light":"task__text__false"}
                                                        disabled 
                                                    />
                                                }
                                                {
                                                    activeState || completedState ? null : (
                                                        <img src={icondelete} className="todo__task__deleteicon" alt="icon" onClick={()=>deleteTask(task.id)}/>
                                                    )
                                                }
                                            {/* {appearIcon ? 
                                                <img src={icondelete} className="todo__task__deleteicon" alt="icon" onClick={()=>deleteTask(task.id)}/>
                                            : null
                                            
                                            } */}
                                    
                                    </div>
                                    )}
                                </Draggable>
                             
                            ))}
                            {droppableProvided.placeholder}
                    </div>
                    )}
                </Droppable>
               
                <div className="options__task">
                        <p className="options__itemsleft">{itemsLeft} items left</p>
                    <div className="options__main">
                        {allState ? (
                            <button className="options__button__active">All</button>
                        ):
                             <button className={lightTheme ? "options__button__light" : "options__button"} onClick={listAllTasks}>All</button>
                        }
                        {activeState ? (
                            <button className="options__button__active" onClick={listActiveTasks} disabled >Active</button>
                        ):
                          <button className={lightTheme ? "options__button__light" : "options__button"} onClick={listActiveTasks} disabled={completedState ? true : false}>Active</button>
                        }
                        {completedState ? (
                            <button  className="options__button__active" onClick={listcompletedTasks} disabled >Completed</button>
                        ):
                             <button  className={lightTheme ? "options__button__light" : "options__button"} onClick={listcompletedTasks} disabled={activeState ? true : false}>Completed</button>
                        }
                        
                    </div>
                        <button className={lightTheme ? "options__button__light" : "options__button"} onClick={clearCompleted} disabled={activeState || completedState ? true : false}>Clear completed</button>
                </div>
            </div>  
          </DragDropContext>
        </>
    );
}
 
export default TaskList;
<>
</>
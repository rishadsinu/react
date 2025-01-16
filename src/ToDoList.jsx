import React, { useState } from 'react'

function ToDoList() {

    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState("");

    function handleInputChange(event) {
        setNewTask(event.target.value);
    }

    function addTask() {
        if (newTask.trim() !== "") {
            setTasks(t => [...t, {text:newTask, completed:false}]);
            setNewTask("")
        }
    }

    function deleteTask(index) {
        const updateTasks = tasks.filter((_, i) => i !== index);
        setTasks(updateTasks);
    }

    function moveTaskUp(index) {
        if (index > 0) {
            const updateTasks = [...tasks];
            [updateTasks[index], updateTasks[index-1]] = 
            [updateTasks[index-1], updateTasks[index]];
            setTasks(updateTasks);
        }
    }

    function moveTaskDown(index) {
        if (index < tasks.length -1) {
            const updateTasks = [...tasks];
            [updateTasks[index], updateTasks[index+1]] = 
            [updateTasks[index+1], updateTasks[index]];
            setTasks(updateTasks);
        }
    }

    function toggleTaskCompletion(index) {
        const updatedTasks = [...tasks]
        updatedTasks[index].completed = !updatedTasks[index].completed
        setTasks(updatedTasks)
    }

    return (
        <div className='to-do-list'>
            <h1>DAY PLANNER</h1>

            <div>
                <input
                    type="text"
                    placeholder='Enter a task...'
                    value={newTask}
                    onChange={handleInputChange}
                />
                <button
                    className='add-button'
                    onClick={addTask}>
                    Add
                </button>
            </div>

            <ol>
                {tasks.map((task, index) =>
                    <li key={index} className={task.completed ? 'completed': ''}>
                        <span className='text'>{task.text}</span>
                        
                        <button
                            className='move-button'
                            onClick={() => moveTaskUp(index)}>
                            ☝️
                        </button>
                        <button
                            className='move-button'
                            onClick={() => moveTaskDown(index)}>
                            👇
                        </button>
                        <button
                            className='delete-button'
                            onClick={() => deleteTask(index)}>
                            Delete
                        </button>
                        <button
                            className='complete-button'
                            onClick={() => toggleTaskCompletion(index)}>
                            {task.completed ? 'Completed🎊' : 'Uncompleted'}
                        </button>
                    </li>
                )}
            </ol>

        </div>
    );
}
export default ToDoList














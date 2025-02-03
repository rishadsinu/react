import React, { useState } from 'react'
import Swal from 'sweetalert2';

function ToDoList() {
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState("");
    const [editIndex, setEditIndex] = useState(null); 

    function handleInputChange(event) {
        setNewTask(event.target.value);
    }

    function addTask() {
        if (newTask.trim() !== "") {
            const duplicateCount = countDuplicates(newTask);
            if (duplicateCount>=1) {
                Swal.fire({
                    title: 'Duplicate Task!',
                    text: 'This task already exists in your list.',
                    icon: 'warning',
                    confirmButtonText: ' Okay ',
                });
                return; 
            }
            if (editIndex !== null) {
                const updatedTasks = tasks.map((task, index) => 
                    index === editIndex ? { ...task, text: newTask } : task
                );
                setTasks(updatedTasks);
                setEditIndex(null); 
            } else {
                setTasks(t => [...t, { text: newTask, completed: false }]);
            }
            setNewTask(""); 
        }
    }

    function countDuplicates(taskText) {
        return tasks.filter(
          task => task.text.trim().toLowerCase() === taskText.trim().toLowerCase()
        ).length;
      }

    function deleteTask(index) {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'Cancel',
        }).then((result) => {
            if (result.isConfirmed) {
                const updatedTasks = tasks.filter((_, i) => i !== index);
                setTasks(updatedTasks);
            }
        });
    }
    function moveTaskUp(index) {
        if (index > 0) {
            const updatedTasks = [...tasks];
            [updatedTasks[index], updatedTasks[index - 1]] = [updatedTasks[index - 1], updatedTasks[index]];
            setTasks(updatedTasks);
        }
    }

    function moveTaskDown(index) {
        if (index < tasks.length - 1) {
            const updatedTasks = [...tasks];
            [updatedTasks[index], updatedTasks[index + 1]] = [updatedTasks[index + 1], updatedTasks[index]];
            setTasks(updatedTasks);
        }
    }

    function toggleTaskCompletion(index) {
        const updatedTasks = [...tasks];
        updatedTasks[index].completed = !updatedTasks[index].completed;
        setTasks(updatedTasks);
    }

    function editTask(index) {
        setNewTask(tasks[index].text); 
        setEditIndex(index); 
    }

    return (
        <div className="to-do-list">
            <h1>DAY PLANNER</h1>

            <div>
                <input
                    type="text"
                    placeholder="Enter a task..."
                    value={newTask}
                    onChange={handleInputChange}
                />
                <button className="add-button" onClick={addTask}>
                    {editIndex === null ? "Add" : "Save"}
                </button>
            </div>

            <ol>
                {tasks.map((task, index) => (
                    <li key={index} className={task.completed ? "completed" : ""}>
                        <span className="text">{task.text}</span>

                        <button className="move-button" onClick={() => moveTaskUp(index)}>
                            ☝️
                        </button>
                        <button className="move-button" onClick={() => moveTaskDown(index)}>
                            👇
                        </button>
                        <button className="delete-button" onClick={() => deleteTask(index)}>
                            Delete
                        </button>
                        <button className="edit-button" onClick={() => editTask(index)}>
                            Edit
                        </button>
                        <button
                            className="complete-button"
                            onClick={() => toggleTaskCompletion(index)}
                        >
                            {task.completed ? "Completed🎊" : "Uncompleted"}
                        </button>
                    </li>
                ))}
            </ol>
        </div>
    );
}
export default ToDoList














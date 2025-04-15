import React, { useState } from 'react';
import BigTaskComponent from '../components/BigTaskComponent';
import TaskComponent from '../components/TaskComponent';
import { useParams } from 'react-router-dom';
import { BigTask } from '../lib/types';
//When clicked big tasks populate tasks panel with tasks from this bigTask
//When put big task in sprint get tasks from bigtask and put them in sprint


// Initial list of tasks.
const initialBigTasks: BigTask[] = [
    { done: true, name: "SIEMA1", taskToDo: 120, donesTasks: 33, id: 1 },
    { done: false, name: "SIEMA2", taskToDo: 120, donesTasks: 33, id: 2 },
    { done: false, name: "SIEMA3", taskToDo: 120, donesTasks: 33, id: 3 },
    { done: false, name: "SIEMA4", taskToDo: 120, donesTasks: 33, id: 4 },
    { done: true, name: "SIEMA5", taskToDo: 120, donesTasks: 33, id: 5 },
    { done: false, name: "SIEMA6", taskToDo: 120, donesTasks: 33, id: 6 },
    { done: false, name: "SIEMA7", taskToDo: 120, donesTasks: 33, id: 7 },
    { done: true, name: "SIEMA8", taskToDo: 120, donesTasks: 33, id: 8 },
    { done: false, name: "SIEMA9", taskToDo: 120, donesTasks: 33, id: 9 },
    { done: true, name: "SIEMA10", taskToDo: 120, donesTasks: 33, id: 10 },
    { done: true, name: "SIEMA11", taskToDo: 120, donesTasks: 33, id: 11 },
    { done: false, name: "SIEMA12", taskToDo: 120, donesTasks: 33, id: 12 },
    { done: false, name: "SIEMA13", taskToDo: 120, donesTasks: 33, id: 13 },
    { done: false, name: "SIEMA15", taskToDo: 120, donesTasks: 33, id: 14 },
    { done: true, name: "SIEMA14", taskToDo: 120, donesTasks: 33, id: 15 },
    { done: true, name: "SIEMA16", taskToDo: 120, donesTasks: 33, id: 16 },
];

const CreateSprint: React.FC = () => {
    const [tasks] = useState<BigTask[]>(initialBigTasks);
    const [sprintTasks, setSprintTasks] = useState<BigTask[]>([]); // initially empty sprint
    const params = useParams();

    const [inputValue, setInputValue] = useState(params.id);

    // Set task data on drag start.
    const handleDragStart = (event: React.DragEvent<HTMLDivElement>, task: BigTask) => {
        event.dataTransfer.setData('task', JSON.stringify(task));
    };

    // Allow drop by preventing the default behavior.
    const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
    };

    // On drop, retrieve the task data and add it to the sprintTasks.
    const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        const data = event.dataTransfer.getData('task');
        console.log(data)
        if (data) {
            const droppedTask: BigTask = JSON.parse(data);

            // Optionally, check if the task already exists in sprintTasks.
            if (!sprintTasks.find(task => task.id === droppedTask.id)) {
                setSprintTasks([...sprintTasks, droppedTask]);
            }
        }
    };

    return (
        <div className="h-screen bg-gray-100 p-4">
            {/* Top-left input area */}
            <div className="mb-4">
                <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Enter task or search..."
                    className="border border-gray-300 rounded p-2 w-full md:w-1/2 text-2xl"
                />
            </div>

            {/* Two side-by-side panels */}
            <div className="flex flex-col md:flex-row gap-4 h-11/12">
                {/* Left Panel */}
                <div className="flex-1 bg-white rounded shadow p-4">
                    <h2 className="text-xl font-bold mb-2">Tasks</h2>
                    {tasks.length === 0 ? (
                        <p className="text-gray-500">No tasks added yet.</p>
                    ) : (
                        <>
                            {tasks.map((task) => (
                                // Wrap each BigTaskComponent in a draggable div.
                                <div
                                    key={task.id}
                                    draggable
                                    onDragStart={(e) => handleDragStart(e, task)}
                                    className="cursor-move"
                                >
                                    <BigTaskComponent
                                        name={task.name}
                                        id={task.id}
                                        done={task.done}
                                        donesTasks={task.donesTasks}
                                        taskToDo={task.taskToDo}
                                    />
                                </div>
                            ))}
                        </>
                    )}
                </div>

                {/* Right Panel */}
                <div
                    className="flex-1 bg-white rounded shadow p-4"
                    onDrop={handleDrop}
                    onDragOver={handleDragOver}
                >
                    <h2 className="text-xl font-bold mb-2">Sprint Tasks</h2>
                    {sprintTasks.length === 0 ? (
                        <p className="text-gray-500">Drop tasks here to add them to the sprint.</p>
                    ) : (
                        <>
                            {sprintTasks.map((task) => (
                                <TaskComponent
                                    key={task.id}
                                    name={task.name}
                                    id={task.id}
                                    done={task.done}
                                />
                            ))}
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CreateSprint;

import React, { useState } from 'react';
import BigTaskComponent from '../components/BigTaskComponent'
import TaskComponent from '../components/TaskComponent';

interface BigTask {
    done: boolean;
    name: string;
    taskToDo: number;
    donesTasks: number;
    key_my: number;
  }

  //When put big task in sprint get tasks from bigtask and put them in sprint
  
  // Initial list of tasks.
  const initialBigTasks: BigTask[] = [
    { done: true, name: "SIEMA1", taskToDo: 120, donesTasks: 33, key_my: 1 },
    { done: false, name: "SIEMA2", taskToDo: 120, donesTasks: 33, key_my: 2 },
    { done: false, name: "SIEMA3", taskToDo: 120, donesTasks: 33, key_my: 3 },
    { done: false, name: "SIEMA4", taskToDo: 120, donesTasks: 33, key_my: 4 },
    { done: true, name: "SIEMA5", taskToDo: 120, donesTasks: 33, key_my: 5 },
    { done: false, name: "SIEMA6", taskToDo: 120, donesTasks: 33, key_my: 6 },
    { done: false, name: "SIEMA7", taskToDo: 120, donesTasks: 33, key_my: 7 },
    { done: true, name: "SIEMA8", taskToDo: 120, donesTasks: 33, key_my: 8 },
    { done: false, name: "SIEMA9", taskToDo: 120, donesTasks: 33, key_my: 9 },
    { done: true, name: "SIEMA10", taskToDo: 120, donesTasks: 33, key_my: 10 },
    { done: true, name: "SIEMA11", taskToDo: 120, donesTasks: 33, key_my: 11 },
    { done: false, name: "SIEMA12", taskToDo: 120, donesTasks: 33, key_my: 12 },
    { done: false, name: "SIEMA13", taskToDo: 120, donesTasks: 33, key_my: 13 },
    { done: false, name: "SIEMA15", taskToDo: 120, donesTasks: 33, key_my: 14 },
    { done: true, name: "SIEMA14", taskToDo: 120, donesTasks: 33, key_my: 15 },
    { done: true, name: "SIEMA16", taskToDo: 120, donesTasks: 33, key_my: 16 },
  ];

const CreateSprint: React.FC = () => {
    const [tasks, setTasks] = useState<BigTask[]>(initialBigTasks);
    const [sprintTasks, setSprintTasks] = useState<BigTask[]>(initialBigTasks);
    const [inputValue, setInputValue] = useState('');
    const [taskMode, setTaskMode] = useState<'single' | 'multiple' | 'loop'>('single');
    const [loopCount, setLoopCount] = useState<number>(1);
    const [editText, setEditText] = useState('');


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
                    {/* Example task list */}
                    {tasks.length === 0 ? (
                        <p className="text-gray-500">No tasks added yet.</p>
                    ) : (
                        <>
                            {tasks.map((task) => (
                                <BigTaskComponent
                                    name={task.name}
                                    key={task.key_my}
                                    key_my={task.key_my}
                                    done={false} 
                                    donesTasks={5}
                                    taskToDo={10}/>
                            ))}
                        </>
                    )}
                </div>

                {/* Right Panel */}
                <div className="flex-1 bg-white rounded shadow p-4">
                    <h2 className="text-xl font-bold mb-2">Sprint Tasks</h2>
                    {/* Example task list */}
                    {tasks.length === 0 ? (
                        <p className="text-gray-500">No tasks added yet.</p>
                    ) : (
                        <>
                            {sprintTasks.map((task) => (
                                <TaskComponent
                                    name={task.name}
                                    key={task.key_my}
                                    key_my={task.key_my}
                                    done={false} />
                            ))}
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CreateSprint;

import React, { useState, useEffect } from 'react';
import BigTaskComponent from '../components/BigTaskComponent';
import TaskComponent from '../components/TaskComponent';
import { useParams } from 'react-router-dom';
import { BigTask, Sprint } from '../lib/types';
import { createSprint, getBigTask, getTask, getSprint, editSprint } from '../lib/apiCalls';
import { useAuth0 } from '@auth0/auth0-react';

//When clicked big tasks populate tasks panel with tasks from this bigTask
//When put big task in sprint get tasks from bigtask and put them in sprint

const CreateSprint: React.FC = () => {
    const [tasks, setTasks] = useState<BigTask[]>([]);
    const [sprintTasks, setSprintTasks] = useState<BigTask[]>([]); // initially empty sprint
    const params = useParams();

    const [inputValue, setInputValue] = useState('');
    const [hourValue, setHourValue] = useState(0);
    const [minuteValue, setMinuteValue] = useState(0);

    const { getAccessTokenSilently } = useAuth0();

    useEffect(() => {
        const fetchData = async () => {
            const token = await getAccessTokenSilently();
            const initialBigTasks = await getBigTask(token);
            setTasks(initialBigTasks.filter((e: BigTask) => e.done === false))

            if (params.id != undefined) {
                const sprint = await getSprint(token, params.id)
                console.log("NICE: " + sprint.hours)
                setSprintTasks(sprint.tasks)
                setInputValue(sprint.name)
                setHourValue(sprint.hours)
                setMinuteValue(sprint.minutes)
            }
        };

        fetchData();
    }, []);

    // Set task data on drag start.
    const handleDragStart = (event: React.DragEvent<HTMLDivElement>, task: BigTask) => {
        event.dataTransfer.setData('task', JSON.stringify(task));
    };

    // Allow drop by preventing the default behavior.
    const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
    };

    // On drop, retrieve the task data and add it to the sprintTasks.
    const handleDrop = async (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        const data = event.dataTransfer.getData('task');
        console.log(data)
        if (data) {
            const droppedTask: BigTask = JSON.parse(data);
            const droppedTasks = await getTask(await getAccessTokenSilently(), droppedTask.id)
            setSprintTasks([...sprintTasks, ...droppedTasks])
            setTasks(tasks.filter(task => task.id != droppedTask.id))
        }
    };

    const handleSave = async () => {
        if (!inputValue) {
            alert("You need to name Sprint")
            return
        }
        if (sprintTasks.length == 0) {
            alert("Add tasks to sprint.")
            return
        }
        if (!minuteValue && !hourValue) {
            alert("Specify duration of sprint")
            return
        }
        const sprint: Sprint = { tasks: sprintTasks.map(item => item.id), name: inputValue, done: false, id: "", hours: hourValue, minutes: minuteValue }
        if(params.id != undefined){
            try{
                await editSprint(sprint, await getAccessTokenSilently(), params.id)
            } catch(e) {
                console.error(e)
            }
            return 
        }
        try {
            await createSprint(sprint, await getAccessTokenSilently());
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <div className="h-screen bg-gray-100 p-4">
            <div className="flex mb-4 w-full justify-between items-center">
                <input
                    value={inputValue}
                    maxLength={15}
                    onChange={(e) => setInputValue(e.target.value)}
                    className="border border-gray-300 rounded p-2 w-1/3 text-2xl"
                    placeholder="Sprint name"
                />
                <p className='text-2xl'>Sprint duration:</p>
                <div className='flex'>
                    <input
                        value={hourValue}
                        maxLength={22}
                        onChange={(e) => setHourValue(+e.target.value)}
                        className="border border-gray-300 rounded p-2 w-1/12 text-2xl text-center"
                        placeholder="HH"
                    />
                    <p className='text-2xl m-2'>:</p>
                    <input
                        value={minuteValue}
                        maxLength={22}
                        onChange={(e) => setMinuteValue(+e.target.value)}
                        className="border border-gray-300 rounded p-2 w-1/12 text-2xl text-center"
                        placeholder="MM"
                    />
                </div>
                <button className="bg-[#3366CC] hover:bg-[#254A99] text-white text-lg px-8 py-4 rounded-2xl shadow-md" onClick={handleSave}>
                    Save
                </button>
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

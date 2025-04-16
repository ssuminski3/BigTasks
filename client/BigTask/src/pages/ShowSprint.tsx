import { useEffect, useState } from 'react';
import '../App.css';
import TimePanel from '../components/TimePanel';
import { useParams } from 'react-router-dom';
import { Task } from '../lib/types';
import TaskList from '../components/TaskList';
import { useAuth0 } from '@auth0/auth0-react';
import { getSprint } from '../lib/apiCalls';

function ShowSprint() {
    const params = useParams();

    const { getAccessTokenSilently } = useAuth0()

    const [sprintName, setSprintName] = useState('');
    const [tasks, setTasks] = useState<Task[]>([]);
    const [initialSeconds, setInitialSeconds] = useState(0)
    const [seconds, setSeconds] = useState(initialSeconds);

    useEffect(() => {
        const fetchData = async () => {
            if (params.id != undefined) {
                const token = await getAccessTokenSilently()
                const sprint = await getSprint(token, params.id)
                console.log("NICE: " + sprint.hours)
                setTasks(sprint.tasks)
                setSprintName(sprint.name)
                setInitialSeconds((sprint.hours * 3600) + (sprint.minutes * 60))
            }
        }
        fetchData()
    }, [])

    useEffect(() => {
        setSeconds(initialSeconds);
    }, [initialSeconds]);


    // Remove task by key
    const remove = (key: string) => {
        setTasks(prevTasks => prevTasks.filter(task => task.id !== key));
    };

    // Toggle task done status by key
    const toggleDone = (key: string) => {
        setTasks(prevTasks =>
            prevTasks.map(task =>
                task.id === key ? { ...task, done: !task.done } : task
            )
        );
    };



    const completed = tasks.filter(task => task.done).length;
    const progress = tasks.length === 0 ? 0 : (completed / tasks.length) * 100;

    return (
        <div className='back w-full h-screen'>

            {/* Header with sprint name and timer */}
            <div className='w-full md:flex md:flex-row p-5'>
                <div className='text-4xl font-bold p-2'>{sprintName}</div>
                <div className='w-full flex flex-row-reverse'>
                    {initialSeconds > 0 ? (
                        <TimePanel initialSeconds={initialSeconds} />
                    ) : (
                        <div>Loading timer...</div>
                    )}
                </div>
            </div>

            {/* Progress bar */}
            <div className="md:w-4/5 mt-1 bg-indigo-300 m-auto">
                <div
                    style={{
                        width: `${progress}%`,
                        height: '10px',
                        backgroundColor: '#FFD700',
                        transition: 'width 0.3s ease'
                    }}
                />
            </div>

            {/* Task list */}

            <TaskList remove={remove} toggleDone={toggleDone} tasks={tasks} />
        </div>
    );
}

export default ShowSprint;

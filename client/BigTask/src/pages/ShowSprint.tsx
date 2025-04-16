import { useState } from 'react';
import '../App.css';
import TimePanel from '../components/TimePanel';
import { useParams } from 'react-router-dom';
import { Task } from '../lib/types';
import TaskList from '../components/TaskList';

function ShowSprint() {
    const params = useParams();

    const [sprintName] = useState(params.id);

    const initialTasks: Task[] = [
        { name: "Write project proposal", done: false, id: '1' },
        { name: "Review pull requests", done: true, id: '2' },
        { name: "Update documentation", done: false, id: '3' },
        { name: "Fix login bug", done: true, id: '4' },
        { name: "Design new feature mockups", done: false, id: '5' },
        { name: "Deploy to staging", done: true, id: '6' },
        { name: "Prepare sprint demo", done: false, id: '7' },
    ];

    const [tasks, setTasks] = useState<Task[]>(initialTasks);

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
                    <TimePanel initialSeconds={3600} />
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

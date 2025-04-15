import { useState } from 'react';
import "../App.css"
import TaskList from '../components/TaskList';
import { useParams } from 'react-router-dom';
import { Task } from '../lib/types';


const ShowBigTask = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const params = useParams();
  const [text] = useState(params.id);

  // Remove task by key
  const remove = (key: number) => {
    setTasks(prevTasks => prevTasks.filter(task => task.id !== key));
  };

  // Toggle task done status by key
  const toggleDone = (key: number) => {
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === key ? { ...task, done: !task.done } : task
      )
    );
  };

  return (
    <div className="h-screen back p-4 flex flex-col">
      {/* Top right text edit section */}
      <div className="flex justify-start mb-4">
        <p className="w-1/3 text-2xl">
          {text}
        </p>
      </div>

      {/* Tasks list display */}
      <div style={{ backgroundColor: '#EBF0F7' }} className="flex-grow rounded shadow p-4 overflow-auto">
        <h2 className="text-xl font-bold mb-2">Tasks</h2>
        <TaskList remove={remove} toggleDone={toggleDone} tasks={tasks} />
      </div>
    </div>
  );
};

export default ShowBigTask;

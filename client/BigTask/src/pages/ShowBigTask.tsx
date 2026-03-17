import { useState, useEffect } from 'react';
import "../App.css"
import TaskList from '../components/TaskList';
import BigTaskList from '../components/BigTaskList';
import { useParams } from 'react-router-dom';
import { Task, BigTask } from '../lib/types';
import { useAuth0 } from '@auth0/auth0-react';
import { getTask, getChildrenBigTask } from '../lib/apiCalls';

const ShowBigTask = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [bigtasks, setBigTasks] = useState<BigTask[]>([]);
  const params = useParams();
  const [text, setText] = useState('');
  const { getAccessTokenSilently } = useAuth0()

  useEffect(() => {
    const fetchData = async () => {
      if (params.id != undefined) {
        const token = await getAccessTokenSilently()
        const { tasks, name } = await getTask(token, params.id)
        const bigtask = await getChildrenBigTask(token, params.id)

        console.log("NICE: " + JSON.stringify(tasks))
        setText(name)
        setBigTasks(bigtask)
        setTasks(tasks)
      }
    }
    fetchData()
  }, [getAccessTokenSilently])

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

  function removeBigTaks(key: string) {
    console.log("Before removal:", bigtasks.length);
    const updatedTasks = bigtasks.filter(task => task.id !== key);
    setBigTasks(updatedTasks);
    console.log("After removal:", updatedTasks.length);
  }

  const toggleBigTaskDone = (key: string) => {
    setTasks(prevTasks => {
      const taskToMove = prevTasks.find(task => task.id === key);
      if (!taskToMove) return prevTasks; // safety check
      // Move the task to doneTasks with 'done: true'
      console.log("Task marked as done");
      return prevTasks.filter(task => task.id !== key);
    });
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
        <div className="md:w-4/5 m-auto h-11/12 p-5 overflow-y-scroll" style={{ backgroundColor: '#EBF0F7' }}>
          <BigTaskList removeBigTaks={removeBigTaks} toggleDone={toggleBigTaskDone} tasks={bigtasks} />
          <TaskList remove={remove} toggleDone={toggleDone} tasks={tasks} />
        </div>
      </div>
    </div>
  );
};

export default ShowBigTask;

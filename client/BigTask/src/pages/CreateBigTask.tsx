import { useEffect, useState } from 'react';
import "../App.css"
import { useParams, useSearchParams } from 'react-router-dom';
import { Task, BigTask } from '../lib/types';
import { createBigTask, editBigTask, getChildrenBigTask } from '../lib/apiCalls';
import { BigTaskAdd } from '../lib/types';
import { useAuth0 } from '@auth0/auth0-react';
import { getTask } from '../lib/apiCalls';
import { useNavigate } from "react-router-dom";
import TaskList from '../components/TaskList';
import BigTaskList from '../components/BigTaskList';

const CreateBigTask = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [bigtasks, setBigTasks] = useState<BigTask[]>([]);
  const [oldTasks, setOldTasks] = useState<Task[]>([])
  const [inputValue, setInputValue] = useState('');
  const [taskMode, setTaskMode] = useState<'single' | 'multiple' | 'loop'>('single');
  const [loopCount, setLoopCount] = useState<number>(1);
  const params = useParams();
  const [searchParams] = useSearchParams();
  const parent = searchParams.get("parent")
  const [editText, setEditText] = useState('');
  const { getAccessTokenSilently } = useAuth0();
  const navigate = useNavigate();

  useEffect(() => {
    console.log(params.id)
    const fetchData = async () => {
      if (params.id != undefined) {
        const token = await getAccessTokenSilently()
        const { tasks, name } = await getTask(token, params.id)
        const bigtask = await getChildrenBigTask(token, params.id)
        console.log("NICE: " + JSON.stringify(tasks), name)
        setEditText(name)
        setOldTasks(tasks)
        setBigTasks(bigtask)
        console.log(bigtask)
      }
    }
    fetchData()
  }, [params.id, getAccessTokenSilently])

  const handleAddTask = () => {
    const trimmed = inputValue.trim();
    if (!trimmed) return;

    if (taskMode === 'single') {
      // Create one task
      const newTask: Task = {
        name: trimmed,
        done: false,
        id: Date.now().toString(),
      };
      setTasks([...tasks, newTask]);
    } else if (taskMode === 'multiple') {
      // Split by newline and create tasks for each non-empty line
      const lines = trimmed.split('\n').map(line => line.trim()).filter(line => line !== '');
      const newTasks = lines.map(line => ({
        name: line,
        done: false,
        id: (Date.now() + Math.random()).toString(),
      }));
      setTasks([...tasks, ...newTasks]);
    } else if (taskMode === 'loop') {
      // Generate tasks based on the loop count, append index to each task name
      const newTasks = [];
      for (let i = 1; i <= loopCount; i++) {
        newTasks.push({
          name: `${trimmed} ${i}`,
          done: false,
          id: (Date.now() + i).toString(),
        });
      }
      setTasks([...tasks, ...newTasks]);
    }

    // Clear input after adding tasks
    setInputValue('');
  };

  const handleSave = async () => {
    if (!editText) {
      alert("You need to name Big Task")
      return
    }
    const bigTask: BigTaskAdd = {
      name: editText || '',
      done: false,
      tasks: tasks,
      parent: parent
    }
    console.log("Send")
    if (params.id != undefined) {
      await editBigTask(bigTask, await getAccessTokenSilently(), params.id.toString())
      console.log("Do dodania: " + bigTask.tasks)
      navigate('/dashboard/');
      return;
    }
    await createBigTask(bigTask, await getAccessTokenSilently())
    navigate('/dashboard/');
  }

  function removeTask(key: string) {
    console.log("Before removal:", tasks.length);
    const updatedTasks = tasks.filter(task => task.id !== key);
    setTasks(updatedTasks);
    console.log("After removal:", updatedTasks.length);
  }

  function removeBigTaks(key: string) {
    console.log("Before removal:", bigtasks.length);
    const updatedTasks = bigtasks.filter(task => task.id !== key);
    setBigTasks(updatedTasks);
    console.log("After removal:", updatedTasks.length);
  }


  return (
    <div className="h-screen back p-4 flex flex-col">
      {/* Top right text edit section */}
      <div className="flex mb-4 w-full justify-between items-center">
        <input
          value={editText}
          maxLength={15}
          onChange={(e) => setEditText(e.target.value)}
          className="border border-gray-300 rounded p-2 w-1/3 text-2xl"
          placeholder="Edit text here..."
        />
        <button className="bg-[#3366CC] hover:bg-[#254A99] text-white text-lg px-8 py-4 rounded-2xl shadow-md" onClick={handleSave}>
          Save
        </button>
      </div>
      {/* Tasks list display */}
      <div className="flex-grow bg-white rounded shadow p-4 overflow-auto">
        <BigTaskList removeBigTaks={removeBigTaks} toggleDone={() => { return }} tasks={bigtasks} />
        <TaskList tasks={[...tasks, ...oldTasks]} remove={removeTask} toggleDone={() => { return }} />
      </div>
      {/* Bottom input area for task adding */}
      <div className="mt-4 bg-white rounded shadow p-4">
        <h3 className="text-lg font-semibold mb-2">Add Task</h3>

        {/* Task mode selection */}
        <div className="mb-2">
          <label className="mr-2">
            <input
              type="radio"
              name="taskMode"
              value="single"
              checked={taskMode === 'single'}
              onChange={() => setTaskMode('single')}
              className="mr-1"
            />
            Single
          </label>
          <label className="mr-2">
            <input
              type="radio"
              name="taskMode"
              value="multiple"
              checked={taskMode === 'multiple'}
              onChange={() => setTaskMode('multiple')}
              className="mr-1"
            />
            Multiple
          </label>
          <label>
            <input
              type="radio"
              name="taskMode"
              value="loop"
              checked={taskMode === 'loop'}
              onChange={() => setTaskMode('loop')}
              className="mr-1"
            />
            Loop
          </label>
        </div>

        {/* Loop count input appears only for loop mode */}
        {taskMode === 'loop' && (
          <div className="mb-2">
            <label className="block text-sm mb-1">Loop Count:</label>
            <input
              type="number"
              value={loopCount}
              onChange={(e) => setLoopCount(Number(e.target.value))}
              className="border border-gray-300 rounded p-1 w-20"
              min={1}
            />
          </div>
        )}

        {/* Task input */}
        <textarea
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder={
            taskMode === 'single'
              ? 'Enter a task...'
              : taskMode === 'multiple'
                ? 'Enter tasks separated by new lines...'
                : 'Enter task name to repeat...'
          }
          className="w-full border border-gray-300 rounded p-2 mb-2"
          rows={3}
        />
        <button
          onClick={handleAddTask}
          className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
        >
          Add Task
        </button>
        {params.id ? <a href={"/createbigtask?parent=" + params.id} className="bg-orange-500 hover:bg-orange-600 text-white py-2 px-4 rounded ml-2">
          Add Big Task
        </a> : <></>}
      </div>
    </div>
  );
};

export default CreateBigTask;

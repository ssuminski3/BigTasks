import { useState } from 'react';
import "../App.css"
import TaskComponent from '../components/TaskComponent';

type Task = {
  name: string;
  done: boolean;
  key_my: number;
};

const CreateBigTask = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [taskMode, setTaskMode] = useState<'single' | 'multiple' | 'loop'>('single');
  const [loopCount, setLoopCount] = useState<number>(1);
  const [editText, setEditText] = useState('');

  const handleAddTask = () => {
    const trimmed = inputValue.trim();
    if (!trimmed) return;

    if (taskMode === 'single') {
      // Create one task
      const newTask: Task = {
        name: trimmed,
        done: false,
        key_my: Date.now(),
      };
      setTasks([...tasks, newTask]);
    } else if (taskMode === 'multiple') {
      // Split by newline and create tasks for each non-empty line
      const lines = trimmed.split('\n').map(line => line.trim()).filter(line => line !== '');
      const newTasks = lines.map(line => ({
        name: line,
        done: false,
        key_my: Date.now() + Math.random(),
      }));
      setTasks([...tasks, ...newTasks]);
    } else if (taskMode === 'loop') {
      // Generate tasks based on the loop count, append index to each task name
      const newTasks = [];
      for (let i = 1; i <= loopCount; i++) {
        newTasks.push({
          name: `${trimmed} ${i}`,
          done: false,
          key_my: Date.now() + i,
        });
      }
      setTasks([...tasks, ...newTasks]);
    }

    // Clear input after adding tasks
    setInputValue('');
  };

  return (
    <div className="h-screen back p-4 flex flex-col">
      {/* Top right text edit section */}
      <div className="flex justify-start mb-4">
        <input
          value={editText}
          maxLength={15}
          onChange={(e) => setEditText(e.target.value)}
          className="border border-gray-300 rounded p-2 w-1/3 text-2xl"
          placeholder="Edit text here..."
        />
      </div>

      {/* Tasks list display */}
      <div className="flex-grow bg-white rounded shadow p-4 overflow-auto">
        <h2 className="text-xl font-bold mb-2">Tasks</h2>
        {tasks.length === 0 ? (
          <p className="text-gray-500">No tasks added.</p>
        ) : (
          <ul>
            {tasks.map((task) => (
              <TaskComponent
                name={task.name}
                key={task.key_my}
                key_my={task.key_my}
                done={false} />
            ))}
          </ul>
        )}
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
      </div>
    </div>
  );
};

export default CreateBigTask;

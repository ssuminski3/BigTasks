import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import "../App.css";
import BigTaskComponent from '../components/BigTaskComponent';

// Define a TypeScript interface for a task.
interface BigTask {
  done: boolean;
  name: string;
  taskToDo: number;
  donesTasks: number;
  key_my: number;
}

// Initial list of tasks.
const initialBigTasks: BigTask[] = [
  { done: false, name: "SIEMA1", taskToDo: 120, donesTasks: 33, key_my: 1 },
  { done: false, name: "SIEMA2", taskToDo: 120, donesTasks: 33, key_my: 2 },
  { done: false, name: "SIEMA3", taskToDo: 120, donesTasks: 33, key_my: 3 },
  { done: false, name: "SIEMA4", taskToDo: 120, donesTasks: 33, key_my: 4 },
  { done: false, name: "SIEMA5", taskToDo: 120, donesTasks: 33, key_my: 5 },
  { done: false, name: "SIEMA6", taskToDo: 120, donesTasks: 33, key_my: 6 },
  { done: false, name: "SIEMA7", taskToDo: 120, donesTasks: 33, key_my: 7 },
  { done: false, name: "SIEMA8", taskToDo: 120, donesTasks: 33, key_my: 8 },
  { done: false, name: "SIEMA9", taskToDo: 120, donesTasks: 33, key_my: 9 },
  { done: false, name: "SIEMA10", taskToDo: 120, donesTasks: 33, key_my: 10 },
  { done: false, name: "SIEMA11", taskToDo: 120, donesTasks: 33, key_my: 11 },
  { done: false, name: "SIEMA12", taskToDo: 120, donesTasks: 33, key_my: 12 },
  { done: false, name: "SIEMA13", taskToDo: 120, donesTasks: 33, key_my: 13 },
  { done: false, name: "SIEMA15", taskToDo: 120, donesTasks: 33, key_my: 14 },
  { done: false, name: "SIEMA14", taskToDo: 120, donesTasks: 33, key_my: 15 },
  { done: false, name: "SIEMA16", taskToDo: 120, donesTasks: 33, key_my: 16 },
];

function MainPage() {
  // Set up state for managing tasks.
  const [tasks, setTasks] = useState<BigTask[]>(initialBigTasks);

  // Remove a task based on its key.
  function remove(key: number, ) {
    console.log("Before removal:", tasks.length);
    const updatedTasks = tasks.filter(task => task.key_my !== key);
    setTasks(updatedTasks);
    console.log("After removal:", updatedTasks.length);
  }

  return (
    <>
      <div className="sm:flex h-screen m-auto">
        {/* Left Sidebar - Big Tasks */}
        <div style={{ backgroundColor: '#EBF0F7' }} className="m-5 p-5 sm:w-1/4 flex-none">
          <p className="font-bold text-3xl m-5">Big Tasks</p>
          <div className="overflow-y-scroll h-11/12 m-auto">
            {tasks.map((task) => (
              <BigTaskComponent
                key={task.key_my}
                name={task.name}
                done={task.done}
                taskToDo={task.taskToDo}
                donesTasks={task.donesTasks}
                key_my={task.key_my}
                dl={remove}
              />
            ))}
          </div>
        </div>

        {/* Central Area - Sprints */}
        <div style={{ backgroundColor: '#EBF0F7' }} className="m-5 p-5 flex-1">
          <p className="font-bold text-3xl">Sprints</p>
        </div>

        {/* Right Sidebar - Finished Tasks */}
        <div className="m-5 sm:w-1/4 flex flex-col space-y-5">
          <div style={{ backgroundColor: '#EBF0F7' }} className="p-5 flex-1">
            <p className="font-bold text-3xl">Finished Big Tasks</p>
          </div>
          <div style={{ backgroundColor: '#EBF0F7' }} className="p-5 flex-1">
            <p className="font-bold text-3xl">Finished Sprints</p>
          </div>
        </div>
      </div>

      {/* Render nested routes */}
      <Outlet />
    </>
  );
}

export default MainPage;

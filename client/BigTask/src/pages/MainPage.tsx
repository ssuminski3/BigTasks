import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import "../App.css";
import BigTaskComponent from '../components/BigTaskComponent';
import SprintComponent from '../components/SprintComponent';
import LogOut from '../components/LogOut';

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
type Sprint = {
  name: string,
  key_my: number,
  done: boolean
}
const sprintes: Sprint[] = [
  { name: "Sprint Alpha", key_my: 1, done: true },
  { name: "Sprint Beta", key_my: 2, done: true },
  { name: "Sprint Gamma", key_my: 3, done: true },
  { name: "Sprint Delta", key_my: 4, done: true },
  { name: "Sprint Epsilon", key_my: 5, done: true },
  { name: "Sprint Alpha", key_my: 1, done: false },
  { name: "Sprint Beta", key_my: 2, done: true },
  { name: "Sprint Gamma", key_my: 3, done: true },
  { name: "Sprint Delta", key_my: 4, done: false },
  { name: "Sprint Epsilon", key_my: 5, done: true },
];


function MainPage() {
  // Set up state for managing tasks.
  const [tasks, setTasks] = useState<BigTask[]>(initialBigTasks.filter(e => e.done === false));
  const [sprints, setSprints] = useState<Sprint[]>(sprintes.filter(e => e.done === false))
  const [doneTasks, setDoneTasks] = useState<BigTask[]>(initialBigTasks.filter(e => e.done === true))
  const [doneSprints] = useState<Sprint[]>(sprintes.filter(e => e.done === true))


  // Remove a task based on its key.
  function removeBigTaks(key: number,) {
    console.log("Before removal:", tasks.length);
    const updatedTasks = tasks.filter(task => task.key_my !== key);
    setTasks(updatedTasks);
    console.log("After removal:", updatedTasks.length);
  }

  function removeDoneBigTaks(key: number,) {
    console.log("Before removal:", doneTasks.length);
    const updatedTasks = doneTasks.filter(task => task.key_my !== key);
    setDoneTasks(updatedTasks);
    console.log("After removal:", updatedTasks.length);
  }

  function removeSprint(key: number) {
    console.log("Before removal:", tasks.length);
    const updatedSprints = sprints.filter(sprint => sprint.key_my !== key);
    setSprints(updatedSprints);
    console.log("After removal:", updatedSprints.length);
  }

  const toggleDone = (key: number) => {
    setTasks(prevTasks => {
      const taskToMove = prevTasks.find(task => task.key_my === key);
      if (!taskToMove) return prevTasks; // safety check

      // Move to doneTasks with 'done: true'
      setDoneTasks(prevDone => [...prevDone, { ...taskToMove, done: true }]);
      console.log("DONE")
      // Filter it out from tasks
      return prevTasks.filter(task => task.key_my !== key);
    });
  };


  return (
    <>
      <div className="h-screen back">
        <LogOut />
        <div className='md:flex h-[calc(100vh-80px)]'>
          {/* Left Sidebar - Big Tasks */}
          <div style={{ backgroundColor: '#EBF0F7' }} className="md:m-5 md:p-5 md:w-1/4 flex-none">
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
                  dl={removeBigTaks}
                  dof={() => toggleDone(task.key_my)}
                />
              ))}
            </div>
          </div>

          {/* Central Area - Sprints */}
          <div style={{ backgroundColor: '#EBF0F7' }} className="m-5 p-5 flex-1">
            <p className="font-bold text-3xl m-5">Sprints</p>
            <div className="overflow-y-scroll h-11/12 m-auto">
              {sprints.map((sprint) => (
                <SprintComponent
                  name={sprint.name}
                  key_my={sprint.key_my}
                  dl={removeSprint}
                  done={sprint.done}
                />
              ))}
            </div>
          </div>

          {/* Right Sidebar - Finished Tasks */}
          <div className="m-5 w-1/4 flex flex-col flex-none h-[calc(100vh-120px)] space-y-5">
            <div style={{ backgroundColor: '#EBF0F7' }} className="p-5 flex-1 overflow-hidden">
              <p className="font-bold text-3xl m-5">Finished Big Tasks</p>
              <div className="overflow-y-scroll h-full m-auto">
                {doneTasks.map((task) => (
                  <BigTaskComponent
                    key={task.key_my}
                    name={task.name}
                    done={task.done}
                    taskToDo={task.taskToDo}
                    donesTasks={task.donesTasks}
                    key_my={task.key_my}
                    dl={removeDoneBigTaks}
                    dof={() => toggleDone(task.key_my)}
                  />
                ))}
              </div>
            </div>

            <div style={{ backgroundColor: '#EBF0F7' }} className="p-5 flex-1 overflow-hidden">
              <p className="font-bold text-3xl m-5">Finished Sprints</p>
              <div className="overflow-y-scroll h-full m-auto">
                {doneSprints.map((sprint) => (
                  <SprintComponent
                    name={sprint.name}
                    key_my={sprint.key_my}
                    dl={removeSprint}
                    done={sprint.done}
                  />
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
      {/* Render nested routes */}
      <Outlet />
    </>
  );
}

export default MainPage;

// MainPage.tsx
import { useEffect, useState } from 'react';
import { Outlet, Link } from 'react-router-dom';
import "../App.css";
import BigTaskList from '../components/BigTaskList';
import SprintList from '../components/SprintList'; // Import the new SprintList component
import LogOut from '../components/LogOut';
import { CiCirclePlus } from "react-icons/ci";
import { BigTask, Sprint } from '../lib/types';
import { getBigTask } from '../lib/apiCalls';
import { useAuth0 } from '@auth0/auth0-react';


const sprintes: Sprint[] = [
  { name: "Sprint Alpha", id: '1', done: true },
  { name: "Sprint Beta", id: '2', done: true },
  { name: "Sprint Gamma", id: '3', done: true },
  { name: "Sprint Delta", id: '4', done: true },
  { name: "Sprint Epsilon", id: '5', done: true },
  { name: "Sprint Alpha", id: '1', done: false },
  { name: "Sprint Beta", id: '2', done: true },
  { name: "Sprint Gamma", id: '3', done: true },
  { name: "Sprint Delta", id: '4', done: false },
  { name: "Sprint Epsilon", id: '5', done: true },
];

function MainPage() {
  // Set up state for managing tasks.
  const [tasks, setTasks] = useState<BigTask[]>([]);
  const [sprints, setSprints] = useState<Sprint[]>(sprintes.filter(e => e.done === false));
  const [doneTasks, setDoneTasks] = useState<BigTask[]>([]);
  const [doneSprints] = useState<Sprint[]>(sprintes.filter(e => e.done === true));
  const {getAccessTokenSilently} = useAuth0();
  useEffect(() => {
    const fetchData = async () => {
      const token = await getAccessTokenSilently();
      const initialBigTasks = await getBigTask(token);
      setTasks(initialBigTasks.filter((e: BigTask) => e.done === false))
      setDoneTasks(initialBigTasks.filter((e: BigTask) => e.done === true))
    };
  
    fetchData();
  }, []);
  

  // Remove a task based on its key.
  function removeBigTaks(key: string) {
    console.log("Before removal:", tasks.length);
    const updatedTasks = tasks.filter(task => task.id !== key);
    setTasks(updatedTasks);
    console.log("After removal:", updatedTasks.length);
  }

  function removeDoneBigTaks(key: string) {
    console.log("Before removal:", doneTasks.length);
    const updatedTasks = doneTasks.filter(task => task.id !== key);
    setDoneTasks(updatedTasks);
    console.log("After removal:", updatedTasks.length);
  }

  function removeSprint(key: string) {
    console.log("Before removal (sprints):", sprints.length);
    const updatedSprints = sprints.filter(sprint => sprint.id !== key);
    setSprints(updatedSprints);
    console.log("After removal:", updatedSprints.length);
  }

  const toggleDone = (key: string) => {
    setTasks(prevTasks => {
      const taskToMove = prevTasks.find(task => task.id === key);
      if (!taskToMove) return prevTasks; // safety check
      // Move the task to doneTasks with 'done: true'
      setDoneTasks(prevDone => [...prevDone, { ...taskToMove, done: true }]);
      console.log("Task marked as done");
      return prevTasks.filter(task => task.id !== key);
    });
  };

  return (
    <>
      <div className="h-screen back">
        <LogOut />
        <div className='md:flex h-[calc(100vh-80px)]'>

          {/* Left Sidebar - Big Tasks */}
          <div style={{ backgroundColor: '#EBF0F7' }} className="md:m-5 md:p-5 md:w-1/4 flex-none">
            <div className='flex w-full'>
              <p className="font-bold text-3xl w-full m-5">Big Tasks</p>
              <Link to={"/createbigtask/"} className='items-end m-5'>
                <CiCirclePlus color={'#3366CC'} size={'30px'} />
              </Link>
            </div>
            <BigTaskList
              removeBigTaks={removeBigTaks}
              toggleDone={toggleDone}
              tasks={tasks}
            />
          </div>

          {/* Central Area - Sprints */}
          <div style={{ backgroundColor: '#EBF0F7' }} className="m-5 p-5 flex-1">
            <div className='flex w-full'>
              <p className="font-bold text-3xl w-full m-5">Sprints</p>
              <Link to={"/createsprint/"} className='items-end m-5'>
                <CiCirclePlus color={'#3366CC'} size={'30px'} />
              </Link>
            </div>
            {/* Use the new SprintList component here */}
            <SprintList
              sprints={sprints}
              removeSprint={removeSprint}
            />
          </div>

          {/* Right Sidebar - Finished Tasks */}
          <div className="m-5 w-1/4 flex flex-col flex-none h-[calc(100vh-120px)] space-y-5">
            <div style={{ backgroundColor: '#EBF0F7' }} className="p-5 flex-1 overflow-hidden">
              <p className="font-bold text-3xl m-5">Finished Big Tasks</p>
              <BigTaskList
                removeBigTaks={removeDoneBigTaks}
                toggleDone={toggleDone}
                tasks={doneTasks} />
            </div>

            <div style={{ backgroundColor: '#EBF0F7' }} className="p-5 flex-1 overflow-hidden">
              <p className="font-bold text-3xl m-5">Finished Sprints</p>
              <SprintList
                sprints={doneSprints}
                removeSprint={removeSprint} />
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

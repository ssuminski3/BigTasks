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
import { getSprints } from '../lib/apiCalls';

function MainPage() {
  // Set up state for managing tasks.
  const [tasks, setTasks] = useState<BigTask[]>([]);
  const [sprints, setSprints] = useState<Sprint[]>([]);
  const [doneTasks, setDoneTasks] = useState<BigTask[]>([]);
  const [doneSprints, setDoneSprints] = useState<Sprint[]>([]);
  const {getAccessTokenSilently} = useAuth0();
  useEffect(() => {
    const fetchData = async () => {
      const token = await getAccessTokenSilently();

      const initialBigTasks = await getBigTask(token);
      setTasks(initialBigTasks.filter((e: BigTask) => e.done === false))
      setDoneTasks(initialBigTasks.filter((e: BigTask) => e.done === true))

      const initialSprints = await getSprints(token);
      setSprints(initialSprints.filter((e: Sprint) => e.done === false))
      setDoneSprints(initialSprints.filter((e: Sprint) => e.done === true))
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
  function removeDoneSprint(key: string) {
    console.log("Before removal (sprints):", doneSprints.length);
    const updatedSprints = doneSprints.filter(sprint => sprint.id !== key);
    setDoneSprints(updatedSprints);
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

  const toggleUnDone = (key: string) => {
    setDoneTasks(prevTasks => {
      const taskToMove = prevTasks.find(task => task.id === key);
      if (!taskToMove) return prevTasks; // safety check
      // Move the task to doneTasks with 'done: true'
      setTasks(prevDone => [...prevDone, { ...taskToMove, done: false }]);
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
                toggleDone={toggleUnDone}
                tasks={doneTasks} />
            </div>

            <div style={{ backgroundColor: '#EBF0F7' }} className="p-5 flex-1 overflow-hidden">
              <p className="font-bold text-3xl m-5">Finished Sprints</p>
              <SprintList
                sprints={doneSprints}
                removeSprint={removeDoneSprint} />
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

import { useEffect, useState, useRef, useMemo } from 'react';
import '../App.css';
import TimePanel from '../components/TimePanel';
import { useParams, useNavigate } from 'react-router-dom';
import { Task } from '../lib/types';
import TaskList from '../components/TaskList';
import { useAuth0 } from '@auth0/auth0-react';
import { getSprint, doSprint } from '../lib/apiCalls';

function ShowSprint() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getAccessTokenSilently } = useAuth0();

  const tokenRef = useRef<string | null>(null);
  const [sprintName, setSprintName] = useState('');
  const [tasks, setTasks] = useState<Task[]>([]);
  const [initialSeconds, setInitialSeconds] = useState(0);

  // 1) Fetch the sprint when `id` or `getAccessTokenSilently` changes
  useEffect(() => {
    if (!id) {
      navigate('/dashboard');
      return;
    }
    (async () => {
      const token = await getAccessTokenSilently();
      tokenRef.current = token;
      const sprint = await getSprint(token, id);
      setSprintName(sprint.name);
      setTasks(sprint.tasks);
      setInitialSeconds(sprint.hours * 3600 + sprint.minutes * 60);
    })();
  }, [id, getAccessTokenSilently, navigate]);

  // 2) Derive completion stats from `tasks`
  const completed = useMemo(
    () => tasks.filter((t) => t.done).length,
    [tasks]
  );
  const progress = useMemo(
    () => (tasks.length ? (completed / tasks.length) * 100 : 0),
    [tasks.length, completed]
  );

  // 3) When progress hits 100%, call doSprint() and navigate
  useEffect(() => {
    if (progress === 100 && id && tokenRef.current) {
      alert('Congratulations, you made it!');
      doSprint(tokenRef.current, id).then(() => navigate('/dashboard'));
    }
  }, [progress, id, navigate]);

  // 4) Handlers to update `tasks`
  const remove = (key: string) =>
    setTasks((prev) => prev.filter((t) => t.id !== key));

  const toggleDone = (key: string) =>
    setTasks((prev) =>
      prev.map((t) => (t.id === key ? { ...t, done: !t.done } : t))
    );

  // 5) Timer end callback
  const onEnd = () => {
    if (progress >= 50) {
      alert('You almost did it');
    } else {
      alert('You tried');
    }
    navigate('/dashboard');
  };

  return (
    <div className="back w-full h-screen">
      <div className="w-full md:flex md:flex-row p-5">
        <h1 className="text-4xl font-bold p-2">{sprintName}</h1>
        <div className="w-full flex flex-row-reverse">
          {initialSeconds > 0 ? (
            <TimePanel initialSeconds={initialSeconds} onEnd={onEnd} />
          ) : (
            <div>Loading timer...</div>
          )}
        </div>
      </div>

      <div className="md:w-4/5 mt-1 bg-indigo-300 m-auto">
        <div
          style={{
            width: `${progress}%`,
            height: '10px',
            backgroundColor: '#FFD700',
            transition: 'width 0.3s ease',
          }}
        />
      </div>

      <TaskList remove={remove} toggleDone={toggleDone} tasks={tasks} />
    </div>
  );
}

export default ShowSprint;

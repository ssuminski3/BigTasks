import { useState } from 'react';
import "../App.css"
import TaskComponent from '../components/TaskComponent';
import { useParams } from 'react-router-dom';
import { Task } from '../lib/types';


const ShowBigTask = () => {
  const [tasks] = useState<Task[]>([]);
  const params = useParams();
  const [text] = useState(params.id);

  return (
    <div className="h-screen back p-4 flex flex-col">
      {/* Top right text edit section */}
      <div className="flex justify-start mb-4">
        <p className="w-1/3 text-2xl">
            {text}
        </p>
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
    </div>
  );
};

export default ShowBigTask;

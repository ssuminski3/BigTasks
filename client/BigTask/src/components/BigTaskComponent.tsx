import TaskComponent from './TaskComponent';
import { useNavigate } from 'react-router-dom';

type BigTask = {
  name: string;
  done: boolean;
  key_my: number;
  donesTasks: number;
  taskToDo: number;
  dl?: (index: number) => void,
  dof?: () => void,
};

function BigTaskComponent(props: BigTask) {
  const progressPercent = (props.donesTasks / props.taskToDo) * 100;
  const navigate = useNavigate();
  const edit = () => {
    navigate(`/createbigtask/${props.key_my}`)
  }

  return (
    <TaskComponent color="#FF9800" name={props.name} done={props.done} key_my={props.key_my} inputClass='input-bigtask-color' dl={props.dl} dof={props.dof} edit={edit}>
      <div className="w-full mt-1 bg-indigo-300">
        <div style={{ width: `${progressPercent}%`, height: '10px', backgroundColor: '#FF9800' }}></div>
      </div>
    </TaskComponent>
  );
}

export default BigTaskComponent;

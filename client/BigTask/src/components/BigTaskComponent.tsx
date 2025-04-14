import TaskComponent from './TaskComponent';
import { useNavigate } from 'react-router-dom';
import React from 'react';
import { BigTask } from '../lib/types';

function BigTaskComponent(props: BigTask) {
  const progressPercent = (props.donesTasks / props.taskToDo) * 100;
  const navigate = useNavigate();

  const edit = (e: React.MouseEvent) => {
    e.stopPropagation()
    navigate(`/createbigtask/${props.key_my}`)
  }

  const show = (e: React.MouseEvent) => {
    e.stopPropagation()
    navigate(`/showbigtask/${props.key_my}`)
}

  return (
    <div onClick={show}>
      <TaskComponent color="#FF9800" name={props.name} done={props.done} key_my={props.key_my} inputClass='input-bigtask-color' dl={props.dl} dof={props.dof} edit={edit}>
        <div className="w-full mt-1 bg-indigo-300">
          <div style={{ width: `${progressPercent}%`, height: '10px', backgroundColor: '#FF9800' }}></div>
        </div>
      </TaskComponent>
    </div>
  );
}

export default BigTaskComponent;

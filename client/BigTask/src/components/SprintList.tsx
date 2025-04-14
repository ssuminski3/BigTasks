// SprintList.tsx
import SprintComponent from './SprintComponent';
import { Sprint } from '../lib/types';
import { SprintListType } from '../lib/types';


function SprintList(props: SprintListType) {
  return (
    <div className="overflow-y-scroll h-11/12 m-auto">
      {props.sprints.map((sprint: Sprint) => (
        <SprintComponent 
          key={sprint.key_my} 
          name={sprint.name} 
          done={sprint.done} 
          key_my={sprint.key_my} 
          dl={props.removeSprint} 
        />
      ))}
    </div>
  );
}

export default SprintList;

// SprintList.tsx
import SprintComponent from './SprintComponent';
import { Sprint } from '../lib/types';
import { SprintListType } from '../lib/types';


function SprintList(props: SprintListType) {
  return (
    <div className="overflow-y-scroll h-11/12 m-auto">
      {props.sprints.length === 0 ? (
        <p className="text-gray-500">No sprints available. Start by adding one!</p>
      ) : (
        props.sprints.map((sprint: Sprint) => (
          <SprintComponent
            key={sprint.id}
            name={sprint.name}
            done={sprint.done}
            id={sprint.id}
            hours={sprint.hours}
            minutes={sprint.minutes}
            dl={props.removeSprint}
          />
        ))
      )}
    </div>
  );
}


export default SprintList;

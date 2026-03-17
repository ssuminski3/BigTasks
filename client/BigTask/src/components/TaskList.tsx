import TaskComponent from "./TaskComponent";
import { TaskListType } from "../lib/types";


const TaskList = (props: TaskListType) => {
    if (!props.tasks || props.tasks.length === 0) {
        return <p className="text-gray-500">No tasks added.</p>;
    }

    return (
        <ul>
            {props.tasks.map((task) => (
                <TaskComponent
                    key={task.id}
                    name={task.name}
                    id={task.id}
                    done={task.done ?? false}
                    dl={props.remove}
                    dof={props.toggleDone}
                />
            ))}
        </ul>
    );
};

export default TaskList;

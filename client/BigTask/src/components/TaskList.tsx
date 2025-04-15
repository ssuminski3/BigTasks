import TaskComponent from "./TaskComponent";
import { TaskListType } from "../lib/types";


const TaskList = (props: TaskListType) => {
    if (!props.tasks || props.tasks.length === 0) {
        return <p className="text-gray-500">No tasks added.</p>;
    }

    return (
        <div className="md:w-4/5 m-auto h-2/3 p-5 overflow-y-scroll" style={{ backgroundColor: '#EBF0F7' }}>
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
        </div>
    );
};

export default TaskList;

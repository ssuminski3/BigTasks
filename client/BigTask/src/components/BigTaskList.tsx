import BigTaskComponent from './BigTaskComponent'
import { BigTask } from '../lib/types'
import { BigTaskListType } from '../lib/types'

function BigTaskList(props: BigTaskListType) {

    return (
        <div className="overflow-y-scroll h-11/12 m-auto">
            {props.tasks.map((task: BigTask) => (
                <BigTaskComponent
                    key={task.key_my}
                    name={task.name}
                    done={task.done}
                    taskToDo={task.taskToDo}
                    donesTasks={task.donesTasks}
                    key_my={task.key_my}
                    dl={props.removeBigTaks}
                    dof={props.toggleDone}
                />
            ))}
        </div>
    )
}

export default BigTaskList

import BigTaskComponent from './BigTaskComponent'
import { BigTask } from '../lib/types'
import { BigTaskListType } from '../lib/types'

function BigTaskList(props: BigTaskListType) {

    return (
        <div className="overflow-y-scroll h-11/12 m-auto">
            {props.tasks.length === 0 ? (
                <p className="text-gray-500">No big tasks yet. Add one to get started!</p>
            ) : (
                props.tasks.map((task: BigTask) => (
                    <BigTaskComponent
                        key={task.id}
                        name={task.name}
                        done={task.done}
                        taskToDo={task.taskToDo}
                        donesTasks={task.donesTasks}
                        id={task.id}
                        dl={props.removeBigTaks}
                        dof={props.toggleDone}
                    />
                ))
            )}
        </div>
    )
}

export default BigTaskList

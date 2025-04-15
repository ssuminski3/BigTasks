export type Task = {
    name: string,
    done: boolean,
    id: number,
    color?: string,
    inputClass?: string
    children?: React.ReactNode,
    dl?: (index: number) => void, //function on delete
    dof?: (index: number) => void, //function on done
    edit?: (e: React.MouseEvent) => void
}

export type BigTask = {
    name: string;
    done: boolean;
    id: number;
    donesTasks: number;
    taskToDo: number;
    dl?: (index: number) => void,
    dof?: (index: number) => void,
};

export type Sprint = {
    name: string,
    id: number,
    done: boolean,
    dl?: (index: number) => void
}

export type BigTaskListType = {
    removeBigTaks: (index: number) => void,
    toggleDone: (index: number) => void,
    tasks: BigTask[]
}

export type SprintListType = {
    sprints: Sprint[];
    removeSprint: (key: number) => void;
}

export type TaskListType = {
    tasks: Task[],
    remove: (index: number) => void,
    toggleDone: (index: number) => void
}

export type BigTaskAdd = {
    name: string,
    done: boolean,
    tasks: Task[]
}
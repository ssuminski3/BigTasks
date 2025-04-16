export type Task = {
    name: string,
    done: boolean,
    id: string,
    color?: string,
    inputClass?: string
    children?: React.ReactNode,
    dl?: (index: string) => void, //function on delete
    dof?: (index: string) => void, //function on done
    edit?: (e: React.MouseEvent) => void
}

export type BigTask = {
    name: string;
    done: boolean;
    id: string;
    donesTasks: number;
    taskToDo: number;
    dl?: (index: string) => void,
    dof?: (index: string) => void,
};

export type Sprint = {
    name: string,
    id: string,
    done: boolean,
    dl?: (index: string) => void
}

export type BigTaskListType = {
    removeBigTaks: (index: string) => void,
    toggleDone: (index: string) => void,
    tasks: BigTask[]
}

export type SprintListType = {
    sprints: Sprint[];
    removeSprint: (key: string) => void;
}

export type TaskListType = {
    tasks: Task[],
    remove: (index: string) => void,
    toggleDone: (index: string) => void
}

export type BigTaskAdd = {
    name: string,
    done: boolean,
    tasks: Task[]
}
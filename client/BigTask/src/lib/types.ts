export type Task = {
    name: string,
    done: boolean,
    key_my: number,
    color?: string,
    inputClass?: string
    children?: React.ReactNode,
    dl?: (index: number) => void, //function on delete
    dof?: () => void, //function on done
    edit?: (e: React.MouseEvent) => void
}

export type BigTask = {
    name: string;
    done: boolean;
    key_my: number;
    donesTasks: number;
    taskToDo: number;
    dl?: (index: number) => void,
    dof?: () => void,
};

export type Sprint = {
    name: string,
    key_my: number,
    done: boolean,
    dl?: (index: number) => void
}
import axios from "axios";
import { BigTaskAdd, Sprint } from "./types";

export async function createBigTask(bigTask: BigTaskAdd, token: string) {
    console.log('bigTask to send:', bigTask);
    try {
        const response = await axios.post(import.meta.env.VITE_API_URL+'createbigtask/', bigTask, {
            headers: {
                authorization: `Bearer ${token}`
            }
        });
        console.log('Response:', response.data);
    } catch (e) {
        console.error('Error sending data:', e);
    }
}


export async function editBigTask(bigTask: BigTaskAdd, token: string, id: string) {
    console.log('bigTask to send:', bigTask);
    try {
        const response = await axios.put(import.meta.env.VITE_API_URL+'editbigtask/', {...bigTask, id}, {
            headers: {
                authorization: `Bearer ${token}`
            }
        });
        console.log('Response:', response.data);
    } catch (e) {
        console.error('Error sending data:', e);
    }
}

export async function getBigTask( token: string ) {
    try {
        const response = await axios.get(import.meta.env.VITE_API_URL+'bigtasks/', {
            headers: {
                authorization: `Bearer ${token}`
            }
        });
        console.log('Response:', response.data);
        return response.data
    } catch (e) {
        console.error('Error sending data:', e);
    }
}

export async function getTask( token: string, bigTaskId: string ) {
    try {
        const response = await axios.get(import.meta.env.VITE_API_URL+'tasks/', {
            params: { bigTaskId },
            headers: {
                authorization: `Bearer ${token}`
            }
        });
        console.log('Response:', response.data);
        return response.data
    } catch (e) {
        console.error('Error sending data:', e);
    }
}

export async function doTask( token: string, id: string){
    try {
        const response = await axios.put(import.meta.env.VITE_API_URL+'dotask/', {id}, {
            headers: {
                authorization: `Bearer ${token}`
            }
        });
        console.log('Response:', response.data);
    } catch (e) {
        console.error('Error sending data:', e);
    }
}

export async function doBigTask( token: string, id: string){
    try {
        const response = await axios.put(import.meta.env.VITE_API_URL+'dobigtask/', {id}, {
            headers: {
                authorization: `Bearer ${token}`
            }
        });
        console.log('Response:', response.data);
    } catch (e) {
        console.error('Error sending data:', e);
    }
}

export async function doSprint( token: string, id: string){
    try {
        const response = await axios.put(import.meta.env.VITE_API_URL+'dosprint/', {id}, {
            headers: {
                authorization: `Bearer ${token}`
            }
        });
        console.log('Response:', response.data);
    } catch (e) {
        console.error('Error sending data:', e);
    }
}

export async function createSprint(sprint: Sprint, token: string) {
    console.log('sprint to send:', sprint);
    try {
        const response = await axios.post(import.meta.env.VITE_API_URL+'createsprint/', sprint, {
            headers: {
                authorization: `Bearer ${token}`
            }
        });
        console.log('Response:', response.data);
    } catch (e) {
        console.error('Error sending data:', e);
    }
}

export async function getSprints(token: string){
    try {
        const response = await axios.get(import.meta.env.VITE_API_URL+'getsprints/', {
            headers: {
                authorization: `Bearer ${token}`
            }
        })
        console.log("Response: ", response.data)
        return response.data
    } catch (error) {
        console.error("Error getting data: ", error)
    }
}

export async function getSprint( token: string, sprintId: string ) {
    try {
        const response = await axios.get(import.meta.env.VITE_API_URL+'getsprint/', {
            params: { sprintId },
            headers: {
                authorization: `Bearer ${token}`
            }
        });
        console.log('Response:', response.data);
        return response.data
    } catch (e) {
        console.error('Error sending data:', e);
    }
}

export async function editSprint(sprint: Sprint, token: string, id: string) {
    console.log('sprint to send:', sprint);
    try {
        const response = await axios.put(import.meta.env.VITE_API_URL+'editsprint/', {sprint, id}, {
            headers: {
                authorization: `Bearer ${token}`
            }
        });
        console.log('Response:', response.data);
    } catch (e) {
        console.error('Error sending data:', e);
    }
}

export async function editTask(taskId: string, name: string, token: string) {
    console.log('task to send:', name);
    try {
        const response = await axios.put(import.meta.env.VITE_API_URL+'edittask/', {name, taskId}, {
            headers: {
                authorization: `Bearer ${token}`
            }
        });
        console.log('Response:', response.data);
    } catch (e) {
        console.error('Error sending data:', e);
    }
    
}

export async function deleteTask(taskId: string, token: string) {
    try {
        const response = await axios.delete(import.meta.env.VITE_API_URL+'deletetask/', {
            params: { taskId },
            headers: {
                authorization: `Bearer ${token}`
            }
        });
        console.log('Response:', response.data);
        if(response.status === 422)
            return 422
    } catch (e) {
        console.error('Error sending data:', e);
    }
    
}

export async function deleteSprint(sprintId: string, token: string) {
    try {
        const response = await axios.delete(import.meta.env.VITE_API_URL+'deletesprint/', {
            params: { sprintId },
            headers: {
                authorization: `Bearer ${token}`
            }
        });
        console.log('Response:', response.data);
    } catch (e) {
        console.error('Error sending data:', e);
    }
    
}

export async function deleteBigTask(bigTaskId: string, token: string) {
    try {
        const response = await axios.delete(import.meta.env.VITE_API_URL+'deletebigtask/', {
            params: { bigTaskId },
            headers: {
                authorization: `Bearer ${token}`
            }
        });
        console.log('Response:', response.data);
    } catch (e) {
        console.error('Error sending data:', e);
    }
    
}
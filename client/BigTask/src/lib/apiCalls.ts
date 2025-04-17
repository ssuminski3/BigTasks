import axios from "axios";
import { BigTaskAdd, Sprint } from "./types";

export async function callApi(token: any) {
    try {
        const res = await axios.get(import.meta.env.VITE_URL, {
            headers: {
                authorization: `Bearer ${token}`
            }
        })
        console.log(res.data)
    }
    catch (e) {
        console.error(e)
    }
}
export async function createBigTask(bigTask: BigTaskAdd, token: string) {
    console.log('bigTask to send:', bigTask);
    try {
        const response = await axios.post('http://localhost:3000/createbigtask/', bigTask, {
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
        const response = await axios.put('http://localhost:3000/editbigtask/', {...bigTask, id}, {
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
        const response = await axios.get('http://localhost:3000/bigtasks/', {
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
        const response = await axios.get('http://localhost:3000/tasks/', {
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
        const response = await axios.put('http://localhost:3000/dotask/', {id}, {
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
        const response = await axios.post('http://localhost:3000/createsprint/', sprint, {
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
        const response = await axios.get('http://localhost:3000/getsprints/', {
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
        const response = await axios.get('http://localhost:3000/getsprint/', {
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
        const response = await axios.put('http://localhost:3000/editsprint/', {sprint, id}, {
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
        const response = await axios.put('http://localhost:3000/edittask/', {name, taskId}, {
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
        const response = await axios.delete('http://localhost:3000/deletetask/', {
            params: { taskId },
            headers: {
                authorization: `Bearer ${token}`
            }
        });
        console.log('Response:', response.data);
    } catch (e) {
        console.error('Error sending data:', e);
    }
    
}
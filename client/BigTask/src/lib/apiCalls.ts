import axios from "axios";
import { BigTaskAdd } from "./types";

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
        const response = await axios.put('http://localhost:3000/dotask/', {id: '67ffd11309ff73e42e6b7080'}, {
            headers: {
                authorization: `Bearer ${token}`
            }
        });
        console.log('Response:', response.data);
    } catch (e) {
        console.error('Error sending data:', e);
    }
}
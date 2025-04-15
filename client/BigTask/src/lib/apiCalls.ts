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
        const response = await axios.put('http://localhost:3000/editbigtask/', {...bigTask, id: /*id*/'67febb57f9ab5234f6c9bcc0'}, {
            headers: {
                authorization: `Bearer ${token}`
            }
        });
        console.log('Response:', response.data);
    } catch (e) {
        console.error('Error sending data:', e);
    }
}
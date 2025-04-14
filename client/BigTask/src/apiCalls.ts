import axios from "axios";

export async function callApi(token: any) {
    try {
        const res = await axios.get(import.meta.env.VITE_URL, {
            headers: {
                authorization: `Bearer ${token}`
            }
        })
        console.log(res.data)
    }
    catch(e){
        console.error(e)
    }
}
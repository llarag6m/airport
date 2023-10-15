import axios from "axios"


export const httpClient = {
    get: async (url) => {
        const { data } = await axios.get(url)
        return data
    },
    post: async (url, body) =>{
        throw new Error("No implementado")
    },
    patch: async (url, body, term) =>{
        throw new Error("No implementado")
    },
    delete: async (url) =>{
        throw new Error("No implementado")
    }
}
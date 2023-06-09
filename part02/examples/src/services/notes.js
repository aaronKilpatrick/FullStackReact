import axios from 'axios'
const baseUrl = 'http://localhost:3001/notes'

const getAll = () => {
    const request = axios.get(baseUrl)
    const nonExisting = {
        id: 10000,
        content: 'This note is note saved to server',
        important: true,
    }
    return request.then(res => res.data.concat(nonExisting))
} 

const create = newObject => {
    const request = axios.post(baseUrl, newObject)
    return request.then(res => res.data)
} 

const update = (id, newObject) => {
    const request = axios.put(`${baseUrl}/${id}`, newObject)
    return request.then(res => res.data)
} 

export default { getAll, create, update }
import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(res => res.data)
}

const create = personObject => {
  const request = axios.post(baseUrl, personObject)
  return request.then(res => res.data)
}

const deleteById = id => {
  return axios.delete(`${baseUrl}/${id}`)
}

const updateById = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject)
  return request.then(res => res.data)
} 

export default { getAll, create, deleteById, updateById }
import axios from 'axios'

//Sustituir por la ruta de las ordenes yo cómo lo estoy probando con una api en mi local puse esta
const api = axios.create({
    baseURL: 'https://boomi.tasklab.dev/ws/rest/warehouse/v1'
})

export const getAll = async () => {
    try {
        return await api.get('orders')
    } catch (error) {
        return []
    }
}

export const orderDispatch = async (order) => {
    try {
        return await api.post('orders/dispatch', order)
    } catch (error) {
        return {}
    }
}


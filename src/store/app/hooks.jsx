import { useDispatch, useSelector } from "react-redux"
import { fetchOrders } from "./extra"
import { useEffect } from "react"

export const useGetOrders = () => {

    const index = useSelector((state) => state.app.ids)
    const orders = useSelector((state) => state.app.orders)
    const dispatch = useDispatch()
    
    useEffect(() => {
        if(!index){
            dispatch(fetchOrders())
        }
    }, [index])

    return {
        index,
        orders,
        isLoading: !index
    }
}
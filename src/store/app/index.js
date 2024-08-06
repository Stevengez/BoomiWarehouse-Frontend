import { createSlice } from "@reduxjs/toolkit";
import { dispatchOrder, fetchOrders } from "./extra";

const initialState = {
    ids: null,
    orders: {}
}

const appReducer = createSlice({
    name: 'app',
    initialState,
    reducers: {
        insertOrder(state, { payload:order }){
            if(!state.orders[order.id]){
                state.orders[order.id] = {
                    ...order,
		    id: typeof order.id === "string" ? parseInt(order.id):order.id,
		    createdAt: order.createdAt !== "" ? order.createdAt : (new Date()).toISOString(),
                    dispatchedAt: order.receivedByWarehouseAt, 
                    acknowledgedAt: order.sentByWarehouseAt,
                    sentByWarehouseAt: undefined,
                    receivedByWarehouseAt: undefined,
                    deliveredByLogisticsAt: undefined
                }
                state.ids.unshift(order.id)
            }
        },
        updateOrder(state, { payload:order }){
            if(state.orders[order.id]){
                const currStatus = state.orders[order.id].status.toLowerCase()
                if(order.status === "dispatched" && currStatus === "created"){
                    state.orders[order.id].status = order.status
                    state.orders[order.id].dispatchedAt = (new Date()).toISOString()
                    // state.orders[order.id].dispatchStarted = false
                    // state.orders[order.id].ackStarted = true
                }

                if(order.status === "acknowledged"){
                    state.orders[order.id].status = order.status
                    state.orders[order.id].acknowledgedAt = (new Date()).toISOString()
                    state.orders[order.id].dispatchStarted = false
                }
            }
        }
    },
    extraReducers: (builder) => {builder
        .addCase(fetchOrders.fulfilled, (state, {payload}) => {
            
            const ids = []
            for(const order of payload){
                state.orders[order.id] = {
                    ...order, 
                    dispatchedAt: order.receivedByWarehouseAt, 
                    acknowledgedAt: order.sentByWarehouseAt,
                    sentByWarehouseAt: undefined,
                    receivedByWarehouseAt: undefined,
                    deliveredByLogisticsAt: undefined
                }
                ids.unshift(order.id)
            }
            
            state.ids = ids
        })

        .addCase(dispatchOrder.pending, (state, { meta }) => {
            const { id } = meta.arg
            state.orders[id].dispatchStarted = true
        })
        .addCase(dispatchOrder.rejected, (state, { meta }) => {
            const { id } = meta.arg
            state.orders[id].dispatchStarted = false
        })
    }
})

export const {
    insertOrder,
    updateOrder
} = appReducer.actions
export default appReducer.reducer

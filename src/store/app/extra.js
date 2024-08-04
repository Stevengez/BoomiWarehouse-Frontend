import { createAsyncThunk } from "@reduxjs/toolkit";
import { getAll, orderDispatch } from "../../midleware/requests";

export const fetchOrders = createAsyncThunk(
    'orders/get',
    async (payload, { dispatch, getState, rejectWithValue }) => {
        const result = await getAll()
        return result.data
    }
)

export const dispatchOrder = createAsyncThunk(
    'orders/dispatch',
    async (payload) => {
        const result = await orderDispatch(payload)
        return result.data
    }
)
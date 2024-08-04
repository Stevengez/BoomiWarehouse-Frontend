import { useCallback, useEffect, useMemo, useState } from 'react'
import { getAll } from './midleware/requests'
import { Box } from '@mui/material'
import BannerComponent from './Components/banner'
import TableComponent from './Components/table'
import Statistics from './Components/statistics'
import { useGetOrders } from './store/app/hooks'
import './App.css'
import { useDispatch } from 'react-redux'
import { insertOrder, updateOrder } from './store/app'

function App() {
  
  const { index, orders, isLoading } = useGetOrders()
  const dispatch = useDispatch()

  const rows = useMemo(() => {
    if(!index) return []
    return index.map((id) => ({
      ...orders[id]
    }))
  }, [index, orders])

  useEffect(() => {
    const events = new EventSource('https://boomi.tasklab.dev/api/v1/live')

    const handleOpen = (event) => {
      console.log("Connection opened")
    }

    const handleNewOrder = (event) => {
      try {
        const order = JSON.parse(event.data)
        dispatch(insertOrder(order))
      }catch(e){
        console.log("Failed insertinr order:", event.data, e)
      }
    }

    const handleOrderUpdate = (event) => {
      try {
        const order = JSON.parse(event.data)
        dispatch(updateOrder(order))
      }catch(e){
        console.log("Failed update order:", e)
      }
    }

    events.addEventListener('open', handleOpen)
    events.addEventListener('warehouse/orders/update', handleOrderUpdate)
    events.addEventListener('warehouse/orders/received', handleNewOrder)
    // events.addEventListener('warehouse/orders/update', handleOrderUpdate)


    return () => {
      events?.removeEventListener('open', handleOpen)
      events?.removeEventListener('warehouse/orders/update', handleOrderUpdate)
      events?.removeEventListener('warehouse/orders/received', handleNewOrder)
      events?.close()
    }

  }, [])

  return <Box sx={{ display: 'flex', height: '100%', flexDirection: 'column', mx: 'auto', maxWidth: { xs: '100%', xl: 1000 } }}>
    <BannerComponent title={"Bodega"} subTitle={"Grupo 2"} />
    <Statistics data={rows} />
    <TableComponent data={rows} isLoading={isLoading} />
  </Box>
}

export default App

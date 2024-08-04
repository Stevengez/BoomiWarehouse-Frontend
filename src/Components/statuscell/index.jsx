import { Box, Chip, CircularProgress } from "@mui/material"
import { useSelector } from "react-redux"

const getLabelOps = (label) => {
    switch(label.toLowerCase()){
        case 'created':
            return {
                label: 'Created',
                color: 'primary',
                loading: false
            }
        case 'dispatched':
            return {
                label: 'Dispatching',
                color: 'warning',
                loading: true
            }
        case 'acknowledged':
            return {
                label: 'Dispatched',
                color: 'success',
                loading: false
            }
        default:
            return 'error'
    }
}

const StatusCell = ({id}) => {
    const row = useSelector((state) => state.app.orders[id])
    const data = getLabelOps(row.status)

    return <Box>
        <Chip 
            size="small" 
            color={data.color} 
            label={
                <Box display='flex' alignItems='center'>
                    {data.loading && <CircularProgress color="error" size={12} sx={{mr: 1}} />}
                    {data.label}
                </Box>
            }
        />
    </Box>
}

export default StatusCell
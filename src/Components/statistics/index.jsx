import { Archive, Downloading, Unarchive, ViewInAr } from "@mui/icons-material"
import { Box, Card, CardHeader, Typography } from "@mui/material"
import Grid from "@mui/material/Unstable_Grid2/Grid2"
import { useMemo } from "react"

const Statistics = ({data}) => {

    const stats = useMemo(() => {
        let createdCount = 0
        let dispatchingCount = 0
        let dispatchedCount = 0

        if(data){
            data.forEach((order) => {
                if(order.status.toLowerCase() === "created") createdCount++
                if(order.status.toLowerCase() === "dispatched") dispatchingCount++
                if(order.status.toLowerCase() === "acknowledged") dispatchedCount++
            })
        }
        
        return {
            created: createdCount,
            dispatching: dispatchingCount,
            dispatched: dispatchedCount
        }
    }, [data])

    return <Box mb={2}>
        <Grid container spacing={2}>
            <Grid xs={12} sm={3}>
                <Card>
                    <CardHeader title={
                        <Box display='flex' alignItems='center' gap={2}>
                            <ViewInAr fontSize="large" />
                            <Box>
                                <Typography variant="h5" sx={{mb: -2}} align="left">
                                    {data?.length}
                                </Typography>
                                <Typography variant="caption" align="left">
                                    All Orders
                                </Typography>
                            </Box>
                        </Box>
                    }/>
                </Card>
            </Grid>

            <Grid xs={12} sm={3}>
                <Card>
                    <CardHeader title={
                        <Box display='flex' alignItems='center' gap={2}>
                            <Archive fontSize="large" />
                            <Box>
                                <Typography variant="h5" sx={{mb: -2}} align="left">
                                    {stats.created}
                                </Typography>
                                <Typography variant="caption" align="left">
                                    Created
                                </Typography>
                            </Box>
                        </Box>
                    }/>
                </Card>
            </Grid>

            <Grid xs={12} sm={3}>
                <Card>
                    <CardHeader title={
                        <Box display='flex' alignItems='center' gap={2}>
                            <Downloading fontSize="large" sx={{transform: 'rotate(180deg)'}}/>
                            <Box>
                                <Typography variant="h5" sx={{mb: -2}} align="left">
                                    {stats.dispatching}
                                </Typography>
                                <Typography variant="caption" align="left">
                                    Dispatching
                                </Typography>
                            </Box>
                        </Box>
                    }/>
                </Card>
            </Grid>

            <Grid xs={12} sm={3}>
                <Card>
                    <CardHeader title={
                        <Box display='flex' alignItems='center' gap={2}>
                            <Unarchive fontSize="large" />
                            <Box>
                                <Typography variant="h5" sx={{mb: -2}} align="left">
                                    {stats.dispatched}
                                </Typography>
                                <Typography variant="caption" align="left">
                                    Dispatched
                                </Typography>
                            </Box>
                        </Box>
                    }/>
                </Card>
            </Grid>
        </Grid>
    </Box>
}

export default Statistics
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Box, Card, CardContent } from '@mui/material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import StatusCell from './statuscell';
import ActionsCell from './actionscell';

const initialState = { pagination: { paginationModel: { pageSize: 25 }}}
const slots = { toolbar: GridToolbar }
const TableComponent = ({ data, isLoading }) => {

    const [gridHeight, setGridHeight] = useState(500) 
    const gridContainer = useRef(null)

    const columns = useMemo(() => {
        return [{
            width: 80,
            field: 'id',
            type: 'number'
        },{
            flex: 0.1,
            field: 'country',
            headerName: 'Destination',
            type: 'string'
        },{
            flex: 0.2,
            field: 'description',
            type: 'string',
            headerName: 'Description'
        },{
            flex: 0.1,
            field: 'status',
            type: 'custom',
            headerName: 'Status',
            renderCell: ({row}) => <StatusCell id={row.id} />
        },{
            flex: 0.1,
            field: 'actions',
            type: 'custom',
            headerName: 'Actions',
            sortable: false,
            filterable: false,
            renderCell: ({row}) => {
                return <ActionsCell row={row} />
            }
        }]
    }, [])

    useEffect(() => {
        if(gridContainer.current){
            const target = gridContainer.current
            const v = target.getBoundingClientRect()
            setGridHeight(window.innerHeight-280)
        }
    }, [])

    return <Box ref={gridContainer} sx={{flex: 1}}>
        <Card>
            <CardContent>
                <DataGrid
                    sx={{height: gridHeight}}
                    disableMultipleRowSelection
                    disableRowSelectionOnClick
                    autoHeight={false}
                    loading={isLoading}
                    columns={columns}
                    initialState={initialState}
                    slots={slots}
                    rows={data}
                />
            </CardContent>
        </Card>
    </Box>
}

export default TableComponent;

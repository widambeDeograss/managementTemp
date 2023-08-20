import { Box } from "@mui/material";
import { DataGrid, GridColDef, GridValueGetterParams, GridRowProps } from '@mui/x-data-grid'
import { tableInterface } from "./utilities/interfaces";

export const CustomTable:React.FC<tableInterface> = ({ rows, rowsPerPage, columns, pageSize}) => {
    return(
        <Box sx={{ height: 400, width: '100%' }}>
            <DataGrid
                rows={rows}
                columns={columns}
                pageSize={pageSize}
                rowsPerPageOptions={[rowsPerPage]}
                disableSelectionOnClick
                sx={{ px:2, borderTopColor:'primary.light' }}
            />
        </Box>
    );
}
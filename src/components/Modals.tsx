import { Close } from "@mui/icons-material"
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Stack, Toolbar, Typography } from "@mui/material"
import { customConfirmationModalInterface, customModalInterface } from "./utilities/interfaces"

export const CustomModal:React.FC<customModalInterface> = ({ state, title, child, onClose}) => {
    const handleModalClose = () => {

    }
    return(
        <Dialog
            open={state}
            onClose={() => onClose()}
            fullWidth
        >
            <DialogTitle>
                 <Toolbar>
                    { title} 
                    <Box sx={{ flexGrow:1}}/>
                    <IconButton edge='end' onClick={() => onClose()}>
                        <Close />
                    </IconButton>
                </Toolbar>
            </DialogTitle>
            <DialogContent>{ child }</DialogContent>
        </Dialog>
    )
}

export const CustomConfirmatioModal:React.FC<customConfirmationModalInterface> = ({state, confimationfunction, title, cancelationfunction}) => {
    
    return(
        <Dialog
            open={state}
            onClose={() => cancelationfunction()}
            maxWidth='xs'
            fullWidth
            sx={{
                borderTop: '1px solid',
                borderTopColor: 'primary'
            }}
        >
        <DialogTitle align="center">
            <Typography  fontWeight='bold'>{ title }</Typography>
        </DialogTitle>
        <Stack direction='row' justifyContent='center' justifyItems='space-between' spacing={2}>
            <Button variant='outlined' color='error' onClick={() => cancelationfunction()}>Cancel</Button>
            <Button variant='outlined' color='success' onClick={() => confimationfunction()}>Confirm</Button>
        </Stack>
        <Box m={2}/>
    </Dialog>
    );
}
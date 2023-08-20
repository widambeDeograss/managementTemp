import { Alert, AlertColor, Snackbar } from '@mui/material';
import Stack from '@mui/material/Stack';
import { toggleAlert } from '../store/slices/AppState-slice';
import { useAppDispatch, useAppSelector } from '../store/store-hooks';

export const CustomSnackBar = () => {
    const dispatch = useAppDispatch();
    const message = useAppSelector((state) => state.AppStateReduder.message);
    const state = useAppSelector((state) => state.AppStateReduder.alertState);
    const severity = useAppSelector((state) => state.AppStateReduder.severity);
    const handleAlertState = () => {
        dispatch(toggleAlert());
    }
    return(
        <Stack spacing={2} sx={{ width:'100%'}}>
            <Snackbar
                open={state}
                autoHideDuration={3000}
                onClose={handleAlertState}
                anchorOrigin={{ vertical: 'top' , horizontal: 'center' }}            
            >
                <Alert 
                    onClose={handleAlertState} 
                    severity={severity as AlertColor}
                    sx={{
                        width: '100%',
                    }}
                >
                    {message}
                </Alert>
            </Snackbar>
        </Stack>
    );
}
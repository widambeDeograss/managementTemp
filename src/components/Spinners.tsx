import { Backdrop, CircularProgress, Dialog } from "@mui/material";
import { toggleSpinner } from "../store/slices/AppState-slice";
import { useAppDispatch } from "../store/store-hooks";
import { spinnerInterface } from "./utilities/interfaces";

export const CustomSpinner:React.FC<spinnerInterface> = ({ state }) => {
    const dispatch = useAppDispatch();
    const handleSpinnerState = () => {
        dispatch(toggleSpinner())
    }

    return(
        <Dialog  open={ state } onClose={handleSpinnerState}>
            <Backdrop open={ state } onClick={handleSpinnerState}
                sx={{ color: '#ffffff', zIndex: (theme) => theme.zIndex.drawer + 1}}
            >
                <CircularProgress color='inherit' size={70}/>
            </Backdrop>
        </Dialog>
    );
}
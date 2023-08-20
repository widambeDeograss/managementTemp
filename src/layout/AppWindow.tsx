import { Box, Toolbar } from "@mui/material";
import { useAppSelector } from "../store/store-hooks";
import Contents from "./Contents";
import CustomAppBar from "./CustomAppBar";
import CustomMenu from "./CustomMenu";

const AppWindow = () => {
    const isUserAuhenticated = useAppSelector((state) => state.AppStateReduder.isUserAuthenticated);
   
    return(
        <Box display="flex">
            {isUserAuhenticated ? <CustomAppBar /> : null}
            { isUserAuhenticated ? <CustomMenu /> : null }
            <Box flexGrow={1} padding={1} component='main'>
                { isUserAuhenticated ? <Toolbar /> : null}
                <Contents />
            </Box>
        </Box>
    )
}

export default AppWindow;
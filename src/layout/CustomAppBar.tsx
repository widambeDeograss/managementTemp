import { AppBar, Box, IconButton, Toolbar, Tooltip, Typography } from "@mui/material"
import MenuIcon from '@mui/icons-material/Menu';
import { useAppDispatch } from "../store/store-hooks";
import { displayAlert, setAuthentication, toggleAlert, toggleDrawerState } from "../store/slices/AppState-slice";
import { Logout } from "@mui/icons-material";

const CustomAppBar = () => {
    const dispatch = useAppDispatch();
    const toggleDrawer = () => {
        dispatch(toggleDrawerState());
    }

    const logout = () => {
        localStorage.clear();
        dispatch(setAuthentication(false));
        dispatch(displayAlert({message: "logout Successfully !", severity: "success"}));
        dispatch(toggleAlert());
    }

    return(
        <AppBar position='fixed' elevation={1} sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
            <Toolbar>
                <IconButton edge="start" color="inherit" size="large" onClick={toggleDrawer}>
                    <MenuIcon sx={{ ml: 0, display: {sm: 'block', md: 'none'}}}/>
                </IconButton>
                <Typography sx={{ ml: 0, display: {sm: 'none', md: 'block'}}} variant="h6">OBCAS</Typography>
                <Box flexGrow={1}/>
                <Typography>{ localStorage.getItem("fullName") ? localStorage.getItem("fullName")! : ""} - {localStorage.getItem("role") ? localStorage.getItem("role") : ""}</Typography>
                <Tooltip title="Logout" sx={{ px:2 }}>
                    <IconButton color="inherit" edge="end" onClick={logout}>
                        <Logout />
                    </IconButton>
                </Tooltip>
            </Toolbar>
        </AppBar>
    )
}

export default CustomAppBar;
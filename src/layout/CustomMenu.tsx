import { Box, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { toggleDrawerState } from "../store/slices/AppState-slice";
import { useAppDispatch, useAppSelector } from "../store/store-hooks";
import { adminMenuItems, userMenuItems } from "./utilities/interfaces";

const CustomMenu = () => {
    const width = 300;
    const drawerState = useAppSelector((state) => state.AppStateReduder.drawerState);
    const dispatch = useAppDispatch();
    const closeDrawer = () => {
        dispatch(toggleDrawerState());
    }
    return(
        <Box>
         <Drawer variant='temporary' open={drawerState} onClose={closeDrawer} sx={{
            width: width,
            flexShrink: 0,
            display:{ xs: 'block', md: 'none'},
            [`& .MuiDrawer-paper`]: { width: width, boxSizing: 'border-box' },
          }}>
            <Toolbar />
            <ListItem disablePadding >
                <ListItemButton>
                    <ListItemText>
                        <Typography align="center" fontWeight="bold">ONLINE BIRTH CERTIFICATE APPLICATION</Typography>
                    </ListItemText>
                </ListItemButton>
            </ListItem>
            <Menu />
        </Drawer>
        <Drawer variant='permanent' sx={{
            width: width,
            flexShrink: 0,
            display:{ xs:'none', md:'block'},
            [`& .MuiDrawer-paper`]: { width: width, boxSizing: 'border-box' },
          }}>
            <Toolbar />
            <Menu />
        </Drawer>
       </Box>
    )
}

export default CustomMenu;

const Menu = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const [menuItems, setMenuItems] = useState(userMenuItems);
    const handleNavigation = (route:string) => {
        navigate(route);
        dispatch(toggleDrawerState());
    }

    const loadData = () => {
        if(localStorage.getItem("role") === "ADMIN"){
            setMenuItems(adminMenuItems);
        }
    }

    useEffect(() => { loadData(); }, []);
    return(
        <List>
            { menuItems.map(({title, route, icon}) => (
            <ListItem key={title} disablePadding onClick={() => handleNavigation(route)}>
                <ListItemButton>
                    <ListItemIcon>{ icon }</ListItemIcon>
                    <ListItemText primary={title}></ListItemText>
                </ListItemButton>
            </ListItem>
        ))}
        </List>
    )
}
import { Home } from "@mui/icons-material";
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import MapsHomeWorkOutlinedIcon from '@mui/icons-material/MapsHomeWorkOutlined';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import AccountBalanceWalletOutlinedIcon from '@mui/icons-material/AccountBalanceWalletOutlined';
import StorageOutlinedIcon from '@mui/icons-material/StorageOutlined';
import { ManageAccounts } from "@mui/icons-material";

const color = 'primary';

export const userMenuItems:menuItemsInterface[] = [
    { title: 'Home', route: '/home', icon: <Home color={color}/>},
    {title : "Applications",icon : <ManageAccounts color={color}/>, route : "/applications"},
]

export const adminMenuItems:menuItemsInterface[] = [
    {title : "Home", icon : <HomeOutlinedIcon color={color}/>,route : "/home" },
    {title : "Applications",icon : <StorageOutlinedIcon color={color}/>,route : "/applications"},
    {title : "Users",icon : <ManageAccounts color={color}/>,route : "/users"},
]

export interface menuItemsInterface {
    title : string;
    route: string;
    icon: JSX.Element;
}

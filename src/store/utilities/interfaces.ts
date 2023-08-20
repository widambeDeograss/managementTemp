import { Breakpoint } from "@mui/material";

export interface appStateInterface {
    isPageLoading: boolean;
    isDarkMode: boolean;
    isUserAuthenticated: boolean;
    modalTitle: string;
    modalState: boolean;
    drawerState: boolean;
    alertState: boolean;
    message: string;
    severity: string;
    modalChild: string;
    modalWidth: String
}

export const appState:appStateInterface = {
    isDarkMode : false,
    isPageLoading: false,
    isUserAuthenticated: false,
    modalTitle: "",
    modalState: false,
    drawerState: false,
    alertState: false,
    message: "",
    severity: 'info',
    modalChild: "SIGN-IN",
    modalWidth: "sm"
}
import { Box } from "@mui/material";
import { createSlice } from "@reduxjs/toolkit";
import { appState, appStateInterface } from "../utilities/interfaces";

const initialState:appStateInterface = appState;

export const AppStateSlice = createSlice({
    name: 'AppState',
    initialState,
    reducers : {
        setModalTitle: (state, {payload}) => {
            state.modalTitle = payload.title;
        },
        setModal: (state, {payload}) => {
            state.modalChild = payload.modalChild;
            state.modalTitle = payload.modalTitle;
            state.modalWidth = payload.modalWidth;
        },
        toggleThemeMode: (state) => {
            state.isDarkMode = !state.isDarkMode;
        },
        setAuthentication: (state, {payload}) => {
            state.isUserAuthenticated = payload;
        },
        toggleModalState: (state) => {
            state.modalState = !state.modalState;
        },
        toggleDrawerState: (state) => {
            state.drawerState = !state.drawerState;
        },
        displayAlert: (state, {payload}) => {
            state.message = payload.message;
            let severity = '';
            switch(payload.severity){
                case 'success':
                    severity = 'success';
                    break;
                case 'warning':
                    severity = 'warning';
                    break;
                case 'failed':
                    severity = 'error';
                    break;
                case 'error':
                    severity = 'error';
                    break;
                default:
                    severity = 'primary'
                    
            }
            state.severity = severity;
       },
       toggleAlert: (state) => {
            state.alertState = !state.alertState
       },
       toggleSpinner: (state) => {
            state.isPageLoading = !state.isPageLoading
       }
    }
});

export const { setAuthentication, toggleThemeMode, setModalTitle, toggleModalState, toggleDrawerState, displayAlert, toggleAlert, setModal, toggleSpinner } = AppStateSlice.actions;
export default AppStateSlice.reducer;
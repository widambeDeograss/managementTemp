import { CheckOutlined } from "@mui/icons-material";
import { Button, Grid, IconButton, Stack, Tooltip } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { CustomCard } from "../../components/Cards"
import { CustomConfirmatioModal, CustomModal } from "../../components/Modals";
import AddUser from "./AddUser";
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import CreateOutlinedIcon from '@mui/icons-material/CreateOutlined';
import { CustomTable } from "../../components/Tables";
import { userInterface } from "./utilities/interface";
import { useAppDispatch } from "../../store/store-hooks";
import { displayAlert, toggleAlert } from "../../store/slices/AppState-slice";
import axios from "axios";

const UsersPage = () => {
    return(
        <CustomCard title="Users" child={<Users />}/>
    )
}

export default UsersPage;


const Users = () => {
    const [modalState, setModalState] = useState(false);
    const [child, setChild] = useState(<AddUser />);
    const [title, setTitle] = useState("Add User");
    const [users, setUsers] = useState<userInterface[]>([]);
    const [alertState, setAlertState] = useState(false);
    const [alertTitle, setAlertTitle] = useState("");

    const toggleAlertState = () => {
        setAlertState(!alertState);
    }

    const setAlert = (title: string) => {
        setAlertTitle(title);
        toggleAlertState();
    }
    const dispatch = useAppDispatch();

    const setModalChild = (child: JSX.Element, title: string) => {
        setChild(child);
        setTitle(title);
        toggleModalState();
    }
    const toggleModalState = () => {
        setModalState(!modalState);
    }

    const loadData = async () => {
        try {
            await axios.get("http://localhost:8080/api/user/list")
            .then((response) => {
                if(response.status === 200){
                    if(response.data.header.responseCode === "0"){
                        setUsers(response.data.data);
                    }
                }
            })
            .catch((error) => {
                dispatch(displayAlert({message: "Request Failed. An error occured !", severity: "warning"}));
                dispatch(toggleAlert());
            })

        } catch (error) {
            dispatch(displayAlert({message: "Error Occured. Netwok Error !", severity: "warning"}));
            dispatch(toggleAlert());
        }
    }

    useEffect(() => {
        loadData();
    }, []);

    const columns: GridColDef[] = [
        {
          field: 'firstName',
          headerName: 'First Name',
          minWidth: 150,
          flex: 1,
          editable: false,
        },
        {
          field: 'lastName',
          headerName: 'Last Name',
          minWidth: 150,
          flex: 1,
          editable: false,
        },
        {
          field: 'phoneNumber',
          headerName: 'Phone Number',
          minWidth: 150,
          flex: 1,
          editable: false,
        },
        {
            field: 'email',
            headerName: 'Email',
            minWidth: 150,
            flex: 1,
            editable: false,
        },
        {
            field: 'role',
            headerName: 'Role',
            minWidth: 150,
            flex: 1,
            editable: false,
        },
        {
          field:"action",
          headerName: "Action",
          minWidth: 150,
          flex: 1,
          renderCell: (params) => {
            
            return(
             <Stack direction="row">
                <Tooltip title="View">
                  <IconButton aria-label="view" color='primary' size='small' onClick={() => {
                    // const child = <UserDetails {...params.row}/>
                    // const title = 'User Details';
                    // changeModalChild(child, title);
                  }}>
                    <VisibilityOutlinedIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Edit">
                  <IconButton color='warning' size='small' onClick={() => {
                    //   const child = <CreateUser {...params.row} reload={loadData} command='UPDATE'/>
                    //   const title = 'Update User - ' + params.row.name;
                    //   changeDialogChild(child, title);
                  }}>
                    <CreateOutlinedIcon />
                  </IconButton>
                </Tooltip>
                { params.row.status != "DELETED" ? <Tooltip title="Delete">
                  <IconButton color='error' size='small' onClick={() => {
                     const title = 'Are you sure you want to Delete User, ' + params.row.firstName + ' ' + params.row.lastName + '?'
                     setAlert(title);
                  }}
                    >
                    <DeleteOutlineOutlinedIcon />
                  </IconButton>
                </Tooltip> : null }
             </Stack>
            )
          },
        }
      ];
    return(
        <Grid container spacing={2}>
            <Grid item xs={12}><Button variant="contained" color="primary" onClick={() => {
                const child = <AddUser />;
                const title = "Add User";
                setModalChild(child, title);
            }}>Add User</Button></Grid>
            <Grid item xs={12}>
                <CustomTable 
                    columns={columns}
                    rows={users}
                    pageSize={10}
                    rowsPerPage={10}
                />
            </Grid>
            <CustomModal 
                child={child}
                state={modalState}
                title="Add User"
                onClose={toggleModalState}
            />
            <CustomConfirmatioModal state={alertState} cancelationfunction={toggleAlertState}  confimationfunction={toggleAlertState} title={alertTitle}/>
        </Grid>
    )
}
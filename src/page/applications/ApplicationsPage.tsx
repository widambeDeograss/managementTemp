import { Button, Chip, Grid, IconButton, Stack, Tooltip } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import { useNavigate } from "react-router";
import { CustomCard } from "../../components/Cards";
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import CreateOutlinedIcon from '@mui/icons-material/CreateOutlined';
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { CustomTable } from "../../components/Tables";
import { displayAlert, toggleAlert } from "../../store/slices/AppState-slice";
import axios from "axios";
import { CheckOutlined } from '@mui/icons-material';
import DoNotDisturbOutlinedIcon from '@mui/icons-material/DoNotDisturbOutlined';
import { CustomConfirmatioModal } from "../../components/Modals";

const ApplicationsPage = () => {
    return(
        <CustomCard  title="Applications" child={<Applications />}/>
    )
}

export default ApplicationsPage;

const Applications = () => {
    const navigate = useNavigate();
    const [applications, setApplications] = useState([]);
    const dispatch = useDispatch();
    const [alertState, setAlertState] = useState(false);
    const [alertTitle, setAlertTitle] = useState("");
    const [changeStatusData, setSChangeStatusData] = useState({status: "", id: 0});
    const toggleAlertState = () => {
      setAlertState(!alertState);
  }

    const loadData = async () => {
      let url = "http://localhost:8080/api/application/list/";

      if(localStorage.getItem("role") === "USER"){
          url = url + localStorage.getItem("userId");
      }

      console.log(url);

      try {
        await axios.get(url)
        .then((response) => {
          console.log(response.data);
            if(response.status === 200) {
                if(response.data.header.responseCode === "0"){
                   setApplications(response.data.data);
                } 

            }
        })
        .catch((error) => {
            dispatch(displayAlert({message: error.message, severity: "warning"}));
            dispatch(toggleAlert());
        })
      } catch(error){
        dispatch(displayAlert({message: "Network Error. Request Failed", severity: "warning"}));
        dispatch(toggleAlert());
      }
    }

    const changeStatus = async (status: string, applicationId: number) => {
          try {

            await axios.post("http://localhost:8080/api/application/change-status/" + status + "/" + applicationId)
            .then((response) => {
              if(response.status === 200){
                let severity = "info";
                if(response.data.header.responseCode === "0"){
                    severity = "success";
                    loadData();
                    toggleAlertState();
                } else if(response.data.header.responseCode === "1"){
                  severity = "error";
                }

                dispatch(displayAlert({message: response.data.header.responseStatus, severity: severity}));
                dispatch(toggleAlert());
              }
            })
          } catch(error) {
              dispatch(displayAlert({message: "Network Error. Request failed !", severity: "warning"}));
              dispatch(toggleAlert());
          }
    } 

    useEffect(() => {
      loadData();
    }, []);

    type color = "info" | "success" | "warning" | "error" | "primary" | "default" | "secondary" | undefined;
    const columns: GridColDef[] = [
        {
          field: 'fullName',
          headerName: 'Full Name',
          minWidth: 150,
          flex: 1,
          editable: false,
        },
        {
          field: 'dateOfBirth',
          headerName: 'Date Of Birth',
          minWidth: 150,
          flex: 1,
          editable: false,
        },
        {
          field: 'applicationDate',
          headerName: 'application Date',
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
          field: 'status',
          headerName: 'Status',
          minWidth: 150,
          flex: 1,
          renderCell: (params) => {
            let color:color = 'info';
      
            switch(params.row.status){
              case "VERIFIED":
                color = 'success';
                break;
              case "PENDING":
                color = 'warning';
                break;
              case "REJECTED":
                color = 'error';
                break;
              default:
                color = 'error';
            }
      
            return(<Chip label={params.row.status} color={color}/>)
          }
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
                {/* <Tooltip title="Edit">
                  <IconButton color='warning' size='small' onClick={() => {
                    //   const child = <CreateUser {...params.row} reload={loadData} command='UPDATE'/>
                    //   const title = 'Update User - ' + params.row.name;
                    //   changeDialogChild(child, title);
                  }}>
                    <CreateOutlinedIcon />
                  </IconButton>
                </Tooltip> */}
                { params.row.status != "DELETED" ? <Tooltip title="Delete">
                  <IconButton color='error' size='small' onClick={() => {
                      const title = "Are you sure you want to delete this Application for " + params.row.fullName + " ?";
                      setAlertTitle(title);
                      setSChangeStatusData({
                        status: "DELETED",
                        id: params.row.id
                    });

                    toggleAlertState();
                  }}
                    >
                    <DeleteOutlineOutlinedIcon />
                  </IconButton>
                </Tooltip> : null }
                {
                  params.row.status === "PENDING" && params.row.status !== 'DELETED' && localStorage.getItem("role") === "ADMIN" ? 
                  <Tooltip title="Verify">
                  <IconButton color='success' onClick={() => {
                        const title = "Are you Sure you want to verify Application for " + params.row.fullName + " ?";
                        setAlertTitle(title);
                        setSChangeStatusData({
                            status: "VERIFIED",
                            id: params.row.id
                        });

                        toggleAlertState();
                  }}>
                    <CheckOutlined />
                  </IconButton>
                </Tooltip> : null
                }
                {
                  params.row.status === "PENDING" && params.row.status !== 'DELETED' && localStorage.getItem("role") === "ADMIN" ? 
                  <Tooltip title="Reject">
                  <IconButton color='error' onClick={() => {
                    const title = "Are you sure you want to reject Application for " + params.row.fullName + " ?";
                    setAlertTitle(title);
                        setSChangeStatusData({
                            status: "REJECTED",
                            id: params.row.id
                        });

                        toggleAlertState();
                    }}> 
                    <DoNotDisturbOutlinedIcon />
                  </IconButton>
                </Tooltip> : null
                }
             </Stack>
            )
          },
        }
      ];
      
    return(
        <Grid container spacing={2}>
            <Grid item xs={12}><Button variant="contained" color="primary" onClick={() => navigate("/application")}>Apply</Button></Grid>
            <Grid item xs={12}>
                <CustomTable rows={applications} columns={columns} rowsPerPage={10} pageSize={10}/>
            </Grid>
            <CustomConfirmatioModal state={alertState} cancelationfunction={toggleAlertState}  confimationfunction={() => {
              changeStatus(changeStatusData.status, changeStatusData.id);
            }} title={alertTitle}/>
        </Grid>
    )
}
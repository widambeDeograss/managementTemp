import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Button, FormControl, Grid, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { CustomCard } from "../../components/Cards"
import { useFormManager } from "../../hooks/useFormManager";
import { displayAlert, toggleAlert } from "../../store/slices/AppState-slice";
import { useAppDispatch } from "../../store/store-hooks";
import { registrationValidator } from "../authentication/utilities/validator";
import { userData } from "./utilities/interface";

const AddUser = () => {
    const dispatch = useAppDispatch();
    const customformHook = useFormManager(userData);
    const navigate = useNavigate();
    const handleformSubmit = async () => {
        
        try {
            await axios.post("http://localhost:8080/api/user/create", customformHook.formState)
            .then((response) => {
                if(response.status === 200){
                    let severity = "info";
                    if(response.data.header.responseCode === "0"){
                        severity = "success";
                        customformHook.resetInitialState();
                        navigate("/login");
                    } else {
                        severity = "error";
                    }

                    dispatch(displayAlert({message: response.data.header.responseStatus, severity: severity}));
                    dispatch(toggleAlert());
                }
            })
        } catch (error) {
            dispatch(displayAlert({message: "Error Request Failed. Network Error", severity: "warning"}));
            dispatch(toggleAlert());
        }
    }

    const { register, handleSubmit, formState : { errors }} = useForm({ resolver: yupResolver(registrationValidator)});

    return(
        <form onSubmit={handleSubmit(handleformSubmit)}>
            <Box my={2} />
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <TextField 
                        fullWidth
                        label="First Name"
                        {...register("firstName")}
                        value={customformHook.formState.firstName}
                        onChange={customformHook.handleformElementChange}
                        error={errors.firstName ? true : false}
                        helperText={errors.firstName?.message as string}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField 
                        fullWidth
                        label="Last Name"
                        {...register("lastName")}
                        value={customformHook.formState.lastName}
                        onChange={customformHook.handleformElementChange}
                        error={errors.lastName ? true : false}
                        helperText={errors.lastName?.message as string}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField 
                        fullWidth
                        label="Phone Number"
                        {...register("phoneNumber")}
                        value={customformHook.formState.phoneNumber}
                        onChange={customformHook.handleformElementChange}
                        error={errors.phoneNumber ? true : false}
                        helperText={errors.phoneNumber?.message as string}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField 
                        fullWidth
                        label="Address"
                        {...register("address")}
                        value={customformHook.formState.address}
                        onChange={customformHook.handleformElementChange}
                        error={errors.address ? true : false}
                        helperText={errors.address?.message as string}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField 
                        fullWidth
                        label="Email"
                        {...register("email")}
                        value={customformHook.formState.email}
                        onChange={customformHook.handleformElementChange}
                        error={errors.email ? true : false}
                        helperText={errors.email?.message as string}
                    />
                </Grid>
                <Grid item xs={12}>
                    <FormControl fullWidth>
                        <InputLabel>Role</InputLabel>
                        <Select 
                            {...register("role")}
                            onChange={(e) => customformHook.manualChangeHandler(e.target.name, e.target.value as string)}
                            label="Role"
                        >
                            <MenuItem value="ADMIN">Admin</MenuItem>
                            <MenuItem value="USER">User</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item>
                    <input type="hidden" value={customformHook.formState.phoneNumber} {...register("password")}/>
                    <input type="hidden" value={customformHook.formState.phoneNumber} {...register("confirmedPassword")}/>
                {/* <TextField 
                        {...register("password")}
                        type="hidden" 
                        value={customformHook.formState.phoneNumber}
                        onChange={customformHook.handleformElementChange}
                    />
                <TextField 
                        {...register("confirmedPassword")}
                        type="hidden"
                        value={customformHook.formState.phoneNumber}
                        onChange={customformHook.handleformElementChange}
                    /> */}
                </Grid>
                <Grid item xs={12}><Button variant="contained" color="primary" type="submit" sx={{ p:1}}>Add User</Button></Grid>
            </Grid>
        </form>
    )
}

export default AddUser;

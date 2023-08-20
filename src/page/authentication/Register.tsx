import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import axios from "axios";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { CustomCard } from "../../components/Cards";
import { useFormManager } from "../../hooks/useFormManager";
import { displayAlert, setAuthentication, toggleAlert } from "../../store/slices/AppState-slice";
import { useAppDispatch } from "../../store/store-hooks";
import { registrationData } from "./utilities/intrfaces";
import { registrationValidator } from "./utilities/validator";

const Register = () => {
    return(
        <div style={{ margin:'auto', paddingTop:100}}>
            <Box sx={{ maxWidth:800, direction: 'column', margin: 'auto'}}>
                <Typography align="center" variant="h6">ONLINE BIRTH CERTIFICATE APPLICATION</Typography>
                <Box sx={{ my:2}}/>
                <CustomCard child={<RegisterForm />} title="Register"/>
            </Box>
        </div>
    )
}

export default Register;

const RegisterForm = () => {
    const dispatch = useAppDispatch();
    const customformHook = useFormManager(registrationData);
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
                    <TextField 
                        fullWidth
                        label="Password"
                        {...register("password")}
                        type="password" 
                        value={customformHook.formState.password}
                        onChange={customformHook.handleformElementChange}
                        error={errors.password ? true : false}
                        helperText={errors.password?.message as string}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField 
                        fullWidth
                        label="Confirm Password"
                        {...register("confirmedPassword")}
                        type="password"
                        value={customformHook.formState.confirmedPassword}
                        onChange={customformHook.handleformElementChange}
                        error={errors.confirmedPassword ? true : false}
                        helperText={errors.confirmedPassword?.message as string}
                    />
                </Grid>
                <Grid item xs={12}><Button variant="contained" color="primary" type="submit" sx={{ p:1}}>Register</Button></Grid>
                <Grid item xs={12}>Already have an Account? <Link to="/login">Login</Link></Grid>
            </Grid>
        </form>
    )
}
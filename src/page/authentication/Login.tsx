import { Box, Button, Grid, TextField, Typography } from "@mui/material"
import { useForm } from "react-hook-form"
import { CustomCard } from "../../components/Cards"
import { useFormManager } from "../../hooks/useFormManager";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginValidator } from "./utilities/validator";
import { authData } from "./utilities/intrfaces";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAppDispatch } from "../../store/store-hooks";
import { displayAlert, setAuthentication, toggleAlert } from "../../store/slices/AppState-slice";

const Login = () => {
    return(
        <div style={{ margin:'auto', paddingTop:200}}>
            <Box sx={{ maxWidth:500, direction: 'column', margin: 'auto'}}>
                <Typography align="center" variant="h6">ONLINE BIRTH CERTIFICATE APPLICATION</Typography>
                <Box sx={{ my:2}}/>
                <CustomCard child={<Loginform />} title="Log In"/>
            </Box>
        </div>
    )
}

export default Login;

const Loginform = () => {
    const customformHook = useFormManager(authData);
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { register, handleSubmit, formState: { errors }} = useForm({ resolver: yupResolver(loginValidator)});
    const handleformSubmit = async () => {
        try {
            await axios.post("http://localhost:8080/api/auth/", customformHook.formState)
            .then((response) => {
                if(response.status === 200){
                    let severity = "info";
                    if(response.data.header.responseCode === "0"){
                        severity = "success";
                        customformHook.resetInitialState();
                        localStorage.setItem("fullName", response.data.data.firstName + " " + response.data.data.lastName);
                        localStorage.setItem("role", response.data.data.role);
                        localStorage.setItem("userId", response.data.data.userId);
                        dispatch(setAuthentication(true));
                        navigate("/home");
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
    return(
        <form onSubmit={handleSubmit(handleformSubmit)}>
            <Grid container spacing={2}>
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
                    <Button variant="contained" fullWidth color="primary" type="submit" sx={{ p:1}}>Log In</Button>
                </Grid>
                <Grid item xs={12}>You don't have an Account? <Link to="/register">Register</Link></Grid>
            </Grid>
        </form>
    )
}
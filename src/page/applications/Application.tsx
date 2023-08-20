    import { yupResolver } from "@hookform/resolvers/yup";
import { Button, FormControl, FormControlLabel, FormLabel, Grid, InputLabel, MenuItem, Radio, RadioGroup, Select, TextField } from "@mui/material";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { CustomCard } from "../../components/Cards";
import { useFormManager } from "../../hooks/useFormManager";
import { displayAlert, toggleAlert } from "../../store/slices/AppState-slice";
import { useAppDispatch } from "../../store/store-hooks";
import { applicationData } from "./utilities/interfaces";
import { applicationValidator } from "./utilities/validator";

const Application = () => {
    return(
        <CustomCard title="Application" child={<ApplicationForm />}/>
    )
}

export default Application;

const ApplicationForm = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { register, handleSubmit, formState : { errors}} = useForm({resolver: yupResolver(applicationValidator)});
    const customformHook = useFormManager(applicationData);
    const handleformSubmit = async () => {
       
        try {
           
            await axios.post("http://localhost:8080/api/application/create/" + parseInt(localStorage.getItem("userId")!), customformHook.formState)
            .then((response) => {
                if(response.status === 200) {
                    let severity = "info";
                    if(response.data.header.responseCode === "0"){
                        severity = "success";
                        customformHook.resetInitialState();
                        navigate("/applications");
                    } else if(response.data.header.responseCode === "1"){
                        severity = "error";
                    }

                    dispatch(displayAlert({message: response.data.header.responseStatus, severity: severity}));
                    dispatch(toggleAlert());
                }
            })
            .catch((error) => {
                dispatch(displayAlert({message: error.message, severity: "warning"}));
                dispatch(toggleAlert());
            });
        } catch (error) {
            dispatch(displayAlert({message: "Network Error. Request Failed", severity: "warning"}));
            dispatch(toggleAlert());
        }
    }
    return(
        <form onSubmit={handleSubmit(handleformSubmit)}>
            <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                    <TextField 
                        label="Date of Birth"
                        fullWidth
                        type="date"
                        {...register("dateOfBirth")}
                        value={customformHook.formState.dateOfBirth}
                        error={errors.dateOfBirth ? true : false}
                        helperText={errors.dateOfBirth?.message as string}
                        onChange={customformHook.handleformElementChange}
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField 
                        label="Full Name"
                        fullWidth
                        {...register("fullName")}
                        value={customformHook.formState.fullName}
                        error={errors.fullName ? true : false}
                        helperText={errors.fullName?.message as string}
                        onChange={customformHook.handleformElementChange}
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <FormControl fullWidth>
                        <InputLabel>Gender</InputLabel>
                        <Select {...register("gender")} label="Gender" onChange={(e) => customformHook.manualChangeHandler(e.target.name, e.target.value as string)}>
                            <MenuItem value="MALE">Male</MenuItem>
                            <MenuItem value="FEMALE">Female</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12}  md={6}>
                    <TextField 
                        label="Father's Name"
                        fullWidth
                        {...register("fatherName")}
                        value={customformHook.formState.fatherName}
                        error={errors.fatherName ? true : false}
                        helperText={errors.fatherName?.message as string}
                        onChange={customformHook.handleformElementChange}
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField 
                        label="Mother's Name"
                        fullWidth
                        {...register("motherName")}
                        value={customformHook.formState.motherName}
                        error={errors.motherName ? true : false}
                        helperText={errors.motherName?.message as string}
                        onChange={customformHook.handleformElementChange}
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField 
                        label="Place Of Birth"
                        fullWidth
                        {...register("placeOfBirth")}
                        value={customformHook.formState.placeOfBirth}
                        error={errors.placeOfBirth ? true : false}
                        helperText={errors.placeOfBirth?.message as string}
                        onChange={customformHook.handleformElementChange}
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField 
                        label="Permanent Address"
                        fullWidth
                        {...register("address")}
                        value={customformHook.formState.address}
                        error={errors.address ? true : false}
                        helperText={errors.address?.message as string}
                        onChange={customformHook.handleformElementChange}
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField 
                        label="Postal Address"
                        fullWidth
                        {...register("postalAddress")}
                        value={customformHook.formState.postalAddress}
                        error={errors.postalAddress ? true : false}
                        helperText={errors.postalAddress?.message as string}
                        onChange={customformHook.handleformElementChange}
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField 
                        label="Phone Number"
                        fullWidth
                        {...register("phoneNumber")}
                        value={customformHook.formState.phoneNumber}
                        error={errors.phoneNumber ? true : false}
                        helperText={errors.phoneNumber?.message as string}
                        onChange={customformHook.handleformElementChange}
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField 
                        label="Email"
                        fullWidth
                        {...register("email")}
                        value={customformHook.formState.email}
                        error={errors.email ? true : false}
                        helperText={errors.email?.message as string}
                        onChange={customformHook.handleformElementChange}
                    />
                </Grid>
                <Grid item xs={12}><Button variant="contained" color="primary" type="submit">Submit</Button></Grid>
            </Grid>
            </form>
    )
}
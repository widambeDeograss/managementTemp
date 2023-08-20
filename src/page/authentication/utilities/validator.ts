import * as yup from "yup";

const phoneNumberRegex = new RegExp("^255+[0-9]{9}$");

export const loginValidator = yup.object().shape({
    phoneNumber: yup.string().required("Please Provide your Username").matches(phoneNumberRegex, "Please provide a valid Phone Number"),
    password: yup.string().required("Please Provide your Password")
})


export const registrationValidator = yup.object().shape({
    firstName: yup.string().required("Please Provide your First Name"),
    lastName: yup.string().required("Please Provide your Last Name"),
    phoneNumber: yup.string().required("Please Provide your Mobile Number").matches(phoneNumberRegex, "Please provide a Valid Mobile Number matching 255xxxxxxxxx"),
    address: yup.string().required("Please Provide your Address"),
    password: yup.string().required("Please Enter your Password"),
    confirmedPassword: yup.string().required("Please Confirm your Password").oneOf([yup.ref("password"), null], "Passwords do not Match"),
    email: yup.string().required("Please provide your Email").email("Please provide a Valid Email")
})
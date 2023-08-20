import * as yup from "yup";

const phoneNumberRegex = new RegExp("^255+[0-9]{9}$");

export const applicationValidator = yup.object().shape({
    gender: yup.string().required("Please Provide Gender"),
    fullName: yup.string().required("Please Provide Applicants Full Name"),
    placeOfBirth: yup.string().required("Please Provide Place Of Birth"),
    fatherName: yup.string().required("Please Provide father's Name"),
    motherName: yup.string().required("Please Provide mother's Name"),
    address: yup.string().required("Please Provide Address"),
    postalAddress: yup.string(),
    phoneNumber: yup.string().required("Please Provide Phone Number").matches(phoneNumberRegex, "Phone Number should Match Pattern 255XXXXXXXXX"),
    email: yup.string().email(),
})
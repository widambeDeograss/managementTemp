export interface applicationInterface {
    dateOfBirth: Date;
    gender: string;
    fullName: string;
    placeOfBirth: string;
    fatherName: string;
    motherName: string;
    address: string;
    postalAddress: string;
    phoneNumber: string;
    email: string;
    applicantId: number;
}

export const applicationData:applicationInterface = {
    address: "",
    dateOfBirth: new Date(),
    email: "",
    fatherName: "",
    fullName: "",
    gender: "",
    motherName: "",
    phoneNumber: "",
    placeOfBirth: "",
    postalAddress: "",
    applicantId: localStorage.getItem("userId") ? parseInt(localStorage.getItem("userId")!) : 0
}
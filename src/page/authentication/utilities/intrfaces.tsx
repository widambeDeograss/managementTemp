export interface authInterface {
    phoneNumber: string;
    password: string;
}

export const authData: authInterface = {
    phoneNumber: "",
    password: "",
}


export interface registrationInterface {
    firstName: string;
    lastName: string;
    phoneNumber: string;
    address: string;
    password: string;
    registrationDate: string;
    confirmedPassword: string;
    email: string;
    role: string;
}

export const registrationData:registrationInterface = {
    firstName: "",
    lastName: "",
    phoneNumber: "",
    address: "",
    password: "",
    registrationDate: "",
    confirmedPassword: "",
    email: "",
    role: "USER",
}
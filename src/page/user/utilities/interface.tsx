export interface userInterface {
    firstName: string;
    lastName: string;
    phoneNumber: string;
    address: string;
    password: string;
    registrationDate: string;
    confirmedPassword: string;
    email: string;
    role: string;
    id: number;
}

export const userData:userInterface = {
    firstName: "",
    lastName: "",
    phoneNumber: "",
    address: "",
    password: "",
    registrationDate: "",
    confirmedPassword: "",
    email: "",
    role: "USER",
    id: 0,
}
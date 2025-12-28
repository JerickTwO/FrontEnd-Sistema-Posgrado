import { GradoEnum } from "./GradoEnum";

class Teacher {
    id: number;
    dni: string;
    firstNames: string;
    lastName: string;
    middleName: string;
    birthDate: string;
    nombrado: boolean;
    institutionalEmail: string;
    phone: string;
    address: string;
    career: string;
    degree: GradoEnum;
    constructor(
        id: number,
        dni: string,
        firstNames: string,
        lastName: string,
        middleName: string,
        birthDate: string,
        nombrado: boolean,
        institutionalEmail: string,
        phone: string,
        address: string,
        career: string,
        degree: GradoEnum,
    ) {
        this.id = id;
        this.dni = dni;
        this.firstNames = firstNames;
        this.lastName = lastName;
        this.middleName = middleName;
        this.birthDate = birthDate;
        this.nombrado = nombrado;
        this.institutionalEmail = institutionalEmail;
        this.phone = phone;
        this.address = address;
        this.career = career;
        this.degree = degree;
    }
}

export default Teacher;

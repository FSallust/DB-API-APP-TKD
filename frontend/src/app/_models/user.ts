/* eslint-disable @typescript-eslint/naming-convention */
export interface User {
    _id: string;
    lastname: string;
    firstname: string;
    password: string;
    birthdate: string;
    email: string;
    presences: [];
    photo: string;
    qr: string;
    id_role: string;
    id_grade: string;
}

export type User = {
    name: string;
    email: string;
    role: userRole;
};

export enum userRole {
    USER = 1,
    ADMIN,
}

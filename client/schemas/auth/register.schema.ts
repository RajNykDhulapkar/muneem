import { object, string, TypeOf } from "zod";

const createUserSchema = object({
    name: string({
        required_error: "Name is required",
    }),
    password: string({ required_error: "Password is required" }).min(
        6,
        "Password too short - should be 6 chars minimum",
    ), // TODO add match to check for weak password

    confirmPassword: string({
        required_error: "passwordConfirmation is required",
    }),
    email: string({
        required_error: "Email is required",
    }).email("Not a valid email"),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["passwordConfirmation"],
});
export type CreateUserInput = TypeOf<typeof createUserSchema>;

export default createUserSchema;

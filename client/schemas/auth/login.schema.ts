import { object, string, TypeOf } from "zod";

const loginUserSchema = object({
    email: string({
        required_error: "Email is required",
    }).email("Not a valid email"),
    password: string({ required_error: "Password is required" }).min(6, "Incorrect password"),
});
export type LoginUserInput = TypeOf<typeof loginUserSchema>;

export default loginUserSchema;

import { useForm } from "react-hook-form";
import { object, string, TypeOf } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useState } from "react";

const createUserSchema = object({
    name: string({
        required_error: "Name is required",
    }),
    password: string({ required_error: "Password is required" }).min(
        6,
        "Password too short - should be 6 chars minimum",
    ),

    passwordConfirmation: string({
        required_error: "passwordConfirmation is required",
    }),
    email: string({
        required_error: "Email is required",
    }).email("Not a valid email"),
}).refine((data) => data.password === data.passwordConfirmation, {
    message: "Passwords do not match",
    path: ["passwordConfirmation"],
});

type CreateUserInput = TypeOf<typeof createUserSchema>;

function RegisterPage() {
    const [registerError, setRegisterError] = useState(null);
    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm<CreateUserInput>({
        resolver: zodResolver(createUserSchema),
    });

    async function onSubmit(values: CreateUserInput) {
        try {
            await axios.post(`${process.env.NEXT_PUBLIC_SERVER_ENDPOINT}/api/users`, values);
        } catch (error: any) {
            setRegisterError(error.message);
        }
    }

    console.log({ errors });

    return (
        <>
            <p>{registerError}</p>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="form-element">
                    <label htmlFor="email">Email</label>
                    <input
                        id="email"
                        type="email"
                        placeholder="jane.doe@example.com"
                        {...register("email")}
                    />
                    {errors.email && errors.email.message}
                </div>

                <div className="form-element">
                    <label htmlFor="name">Name</label>
                    <input id="name" type="text" placeholder="Jane Doe" {...register("name")} />
                    {errors.name && errors.name.message}
                </div>
                <div className="form-element">
                    <label htmlFor="password">Password</label>
                    <input id="password" type="password" {...register("password")} />
                    {errors.password && errors.password.message}
                </div>

                <div className="form-element">
                    <label htmlFor="passwordConfirmation">Confirm Password</label>
                    <input
                        id="passwordConfirmation"
                        type="password"
                        {...register("passwordConfirmation")}
                    />
                    {errors.passwordConfirmation && errors.passwordConfirmation.message}
                </div>
                <button type="submit">Submit</button>
            </form>
        </>
    );
}

export default RegisterPage;

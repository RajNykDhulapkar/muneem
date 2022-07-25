import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useState } from "react";
import createUserSchema, { CreateUserInput } from "../../schemas/auth/register.schema";
import WebpageLayout from "../../components/Layouts/WebpageLayout";
import { InputArea } from "../../components/controls";

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
        console.log("submit");
        try {
            const res = await axios.post(
                `${process.env.NEXT_PUBLIC_SERVER_ENDPOINT}/authentication/register`,
                values,
            );
        } catch (error: any) {
            setRegisterError(error.message);
        }
    }

    return (
        <WebpageLayout isLoggedIn={false} pageTitle="Register | Muneem">
            <p className="text-sm text-center text-red-600 absolute mb-7">{registerError}</p>
            <form
                className="w-80 m-auto grid grid-rows-5 gap-2 pt-20"
                onSubmit={handleSubmit(onSubmit)}
            >
                <div>
                    <InputArea
                        name="email"
                        type="email"
                        label="Enter Email"
                        register={register("email")}
                        icon={
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                style={{ fill: " rgba(0, 0, 0, 1)", transform: "", msFilter: "" }}
                            >
                                <path d="M20 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2zm0 4.7-8 5.334L4 8.7V6.297l8 5.333 8-5.333V8.7z"></path>
                            </svg>
                        }
                        errors={errors}
                    />
                </div>
                <div>
                    <InputArea
                        name="name"
                        type="text"
                        label="Full Name"
                        register={register("name")}
                        icon={
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                style={{ fill: " rgba(0, 0, 0, 1)", transform: "", msFilter: "" }}
                            >
                                <path d="M7.5 6.5C7.5 8.981 9.519 11 12 11s4.5-2.019 4.5-4.5S14.481 2 12 2 7.5 4.019 7.5 6.5zM20 21h1v-1c0-3.859-3.141-7-7-7h-4c-3.86 0-7 3.141-7 7v1h17z"></path>
                                <path d="M7.5 6.5C7.5 8.981 9.519 11 12 11s4.5-2.019 4.5-4.5S14.481 2 12 2 7.5 4.019 7.5 6.5zM20 21h1v-1c0-3.859-3.141-7-7-7h-4c-3.86 0-7 3.141-7 7v1h17z"></path>
                            </svg>
                        }
                        errors={errors}
                    />
                </div>

                <div>
                    <InputArea
                        name="password"
                        type="password"
                        label="Password"
                        register={register("password")}
                        icon={
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                className="p-0"
                                style={{ fill: " rgba(0, 0, 0, 1)", transform: "", msFilter: "" }}
                            >
                                <path d="M20 12c0-1.103-.897-2-2-2h-1V7c0-2.757-2.243-5-5-5S7 4.243 7 7v3H6c-1.103 0-2 .897-2 2v8c0 1.103.897 2 2 2h12c1.103 0 2-.897 2-2v-8zM9 7c0-1.654 1.346-3 3-3s3 1.346 3 3v3H9V7z"></path>
                            </svg>
                        }
                        errors={errors}
                    />
                </div>

                <div className="form-element">
                    <InputArea
                        name="confirmPassword"
                        type="password"
                        label="Confirm Password"
                        register={register("confirmPassword")}
                        icon={
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                style={{ fill: " rgba(0, 0, 0, 1)", transform: "", msFilter: "" }}
                            >
                                <path d="M20 12c0-1.103-.897-2-2-2h-1V7c0-2.757-2.243-5-5-5S7 4.243 7 7v3H6c-1.103 0-2 .897-2 2v8c0 1.103.897 2 2 2h12c1.103 0 2-.897 2-2v-8zM9 7c0-1.654 1.346-3 3-3s3 1.346 3 3v3H9V7z"></path>
                            </svg>
                        }
                        errors={errors}
                    />
                </div>
                <button
                    className="bg-slate-800 text-white h-fit p-2 pr-2 pl-2 rounded-md"
                    type="submit"
                >
                    Register
                </button>
            </form>
        </WebpageLayout>
    );
}

export default RegisterPage;

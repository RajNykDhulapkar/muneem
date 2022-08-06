import { NextPage } from "next";

import WebpageLayout from "../../components/Layouts/WebpageLayout";
import { InputArea } from "../../components/controls";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import loginUserSchema, { LoginUserInput } from "../../schemas/auth/login.schema";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";

import authService from "../../services/auth.service";
import { setCredentials } from "../../store/authSlice";

const Login: NextPage = () => {
    const [registerError, setRegisterError] = useState(null);
    const dispatch = useDispatch();
    const router = useRouter();
    const {
        register,
        formState: { errors },
        handleSubmit,
        reset,
    } = useForm<LoginUserInput>({
        resolver: zodResolver(loginUserSchema),
    });

    async function onSubmit(values: LoginUserInput) {
        reset();
        try {
            const res = await authService.login(values);
            console.log(res);
            if (res.status === 200 && res.data.refreshToken) {
                const refreshToken: string = res.data.refreshToken;
                console.log("Login Success");
                dispatch(setCredentials({ refreshToken }));
                router.push("/dashboard");
            }
        } catch (err: any) {
            console.log(err);
            setRegisterError(err.response.data.message);
        }
    }
    return (
        <div>
            <WebpageLayout isLoggedIn={false} pageTitle="Register | Muneem">
                {/* <p className="text-sm text-center text-red-600 absolute mb-7">{registerError}</p> */}
                <form
                    className="w-80 m-auto grid grid-rows-5 gap-2 pt-20"
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <div>
                        {registerError && (
                            <div className="absolute mt-5 w-full bg-slate-50 rounded-md shadow-sm flex justify-center items-center">
                                <p className="relative text-md font-bold text-red-700 my-3">
                                    {registerError}
                                </p>
                            </div>
                        )}
                        {/* TODO hide this */}
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
                                    style={{
                                        fill: " rgba(0, 0, 0, 1)",
                                        transform: "",
                                        msFilter: "",
                                    }}
                                >
                                    <path d="M20 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2zm0 4.7-8 5.334L4 8.7V6.297l8 5.333 8-5.333V8.7z"></path>
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
                                    style={{
                                        fill: " rgba(0, 0, 0, 1)",
                                        transform: "",
                                        msFilter: "",
                                    }}
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
                        Login
                    </button>
                </form>
            </WebpageLayout>
        </div>
    );
};
export default Login;

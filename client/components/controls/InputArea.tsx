import { NextPage } from "next";
import React, { useState } from "react";
import { FieldErrorsImpl, UseFormRegisterReturn } from "react-hook-form";
import makeId from "../../utils/makeId";

type InputAreaProps = {
    type: string;
    label: string;
    name: string;
    required?: boolean;

    autoComplete?: boolean;

    customClasses?: string;
    labeCustomClasses?: string;
    formGroupCustomClasses?: string;

    icon?: React.ReactNode;

    register: UseFormRegisterReturn;
    errors: FieldErrorsImpl<{
        [x: string]: any;
    }>; // FieldErrorsImpl<DeepRequired<{ [x: string]: any; }>>
};

const InputArea: NextPage<InputAreaProps> = ({
    type,
    name,
    label,
    icon,
    autoComplete,
    customClasses,
    labeCustomClasses,
    formGroupCustomClasses,
    required,
    register,
    errors,
}) => {
    const id = type + "-" + makeId(5);
    const [hide, setHide] = useState(true);
    const [inputType, setInputType] = useState(type);

    const changeType = () => {
        setInputType(inputType === "password" ? "text" : "password");
        setHide(!hide);
    };

    return (
        <div className={"relative z-0 mb-6 w-full group" + formGroupCustomClasses}>
            <div className="flex absolute inset-y-0 left-0 items-center pl-1 pointer-events-none">
                {icon}
            </div>
            <input
                autoComplete={autoComplete ? "on" : "off"}
                type={inputType}
                // name={name}
                id={id}
                className={
                    icon
                        ? `peer block 
                     py-2.5 px-0 pl-8
                     w-full text-sm text-gray-900
                     bg-transparent border-0 border-b-2 border-gray-300 appearance-none
                     focus:outline-none focus:ring-0 focus:border-blue-600 
                ` + customClasses
                        : `peer block 
                     py-2.5 px-0 
                     w-full text-sm text-gray-900
                     bg-transparent border-0 border-b-2 border-gray-300 appearance-none
                     focus:outline-none focus:ring-0 focus:border-blue-600 
                ` + customClasses
                }
                placeholder=" "
                required={!required ? true : required}
                {...register}
            />
            <label
                htmlFor={id}
                className={
                    icon
                        ? `absolute left-8 -top-3.5 text-gray-600 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm ` +
                          labeCustomClasses
                        : `absolute -top-3.5 text-gray-600 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm ` +
                          labeCustomClasses
                }
            >
                {label}
            </label>

            <p
                className={
                    icon ? "text-xs text-red-600 absolute left-8" : "text-xs text-red-600 absolute"
                }
            >
                {errors[name] && String(errors[name]?.message)}
            </p>
            {type === "password" &&
                (hide ? (
                    <button
                        type="button"
                        style={{
                            pointerEvents: "all",
                        }}
                        onClick={changeType}
                        className="flex absolute inset-y-0 right-0 items-end pb-2  pointer-events-none transition-all"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="22"
                            height="22"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="feather feather-eye"
                        >
                            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                            <circle cx="12" cy="12" r="3"></circle>
                        </svg>
                    </button>
                ) : (
                    <button
                        type="button"
                        onClick={changeType}
                        style={{
                            pointerEvents: "all",
                        }}
                        className="flex absolute inset-y-0 right-0 items-end pb-2  pointer-events-none transition-all"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="22"
                            height="22"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="feather feather-eye-off"
                        >
                            <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                            <line x1="1" y1="1" x2="23" y2="23"></line>
                        </svg>
                    </button>
                ))}
        </div>
    );
};

export default InputArea;

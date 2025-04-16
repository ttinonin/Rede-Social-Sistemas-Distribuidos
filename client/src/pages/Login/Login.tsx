import React, { useState } from "react";

import banner from "../../assets/iceberg.jpg";
import { TextInput } from "../../components/TextInput/TextInput";
import { PrimaryButton } from "../../components/PrimaryButton/PrimaryButton";
import { Link } from "react-router-dom";

export const Login: React.FC = () => {
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();


    }

    return (
        <div className="flex items-center justify-center h-screen">
            <div className="flex flex-col md:flex-row bg-white rounded-xl shadow-sm">
                <div className="m-3 flex flex-col justify-between">
                    <div className="flex justify-center items-center md:flex-none md:justify-normal">
                        <img src="/images/logo-small.png" className="md:w-[30%] w-[50%]" alt="" />
                    </div>
                    
                    
                    <form onSubmit={handleFormSubmit} className="sm:mx-10">
                        <div className="my-5 text-center">
                            <h2 className="text-3xl font-[merriweather] font-semibold">Welcome back!</h2>
                            <p>Ready to reconnect and keep the sync alive?</p>
                        </div>
                        <div className="mb-3">
                            <label className="block">Username</label>
                            <TextInput 
                                value={username}
                                onChange={setUsername}
                                placeholder="Type your username"
                            />
                        </div>

                        <div className="mb-3">
                            <label className="block">Password</label>
                            <TextInput 
                                value={password}
                                onChange={setPassword}
                                placeholder="Type your password"
                                type="password"
                            />
                        </div>

                        <PrimaryButton type="submit" className="w-full mb-3">Sign In</PrimaryButton>
                    </form>

                    <div>
                        <p className="text-center">Don't have an account? <Link to="/sign-up" className="font-semibold">Sign Up</Link></p>
                    </div>
                </div>

                <div className="p-3">
                    <img src={banner} className="rounded-xl" />
                </div>
            </div>
        </div>
    );
}
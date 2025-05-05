import React, { useState } from "react";

import banner from "../../assets/mountain.jpg";
import { TextInput } from "../../components/TextInput/TextInput";
import { PrimaryButton } from "../../components/PrimaryButton/PrimaryButton";
import { Link, useNavigate } from "react-router-dom";
import { signUp } from "../../services/userService";
import { useUserContext } from "../../hooks/useUserContext";

export const SignUp: React.FC = () => {
    const { setUser } = useUserContext();
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [email, setEmail] = useState<string>("");

    const navigate = useNavigate()

    const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const newUser = await signUp(username, email, password);
            setUser(newUser);

            navigate("/")
        } catch(error) {
            console.error("Error while sign up: ", error);
            alert("erro");
        }
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
                            <h2 className="text-3xl font-[merriweather] font-semibold">Join the sync</h2>
                            <p>Connect with people, ideas, and possibilities — from anywhere.</p>
                        </div>
                        <div className="mb-3">
                            <label className="block">Username</label>
                            <TextInput 
                                value={username}
                                onChange={setUsername}
                                placeholder="Type a username"
                                className="w-full"
                            />
                        </div>

                        <div className="mb-3">
                            <label className="block">Email</label>
                            <TextInput 
                                value={email}
                                onChange={setEmail}
                                placeholder="Type a Email"
                                className="w-full"
                            />
                        </div>

                        <div className="mb-3">
                            <label className="block">Password</label>
                            <TextInput 
                                value={password}
                                onChange={setPassword}
                                placeholder="Type a password"
                                type="password"
                                className="w-full"
                            />
                        </div>

                        <PrimaryButton type="submit" className="w-full mb-3">Sign Up</PrimaryButton>
                    </form>

                    <div>
                        <p className="text-center">Have an account? <Link to="/login" className="font-semibold">Sign In</Link></p>
                    </div>
                </div>

                <div className="md:flex md:items-center md:justify-center p-3">
                    <img src={banner} className="rounded-xl" />
                </div>
            </div>
        </div>
    );
}
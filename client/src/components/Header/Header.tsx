import React, { useState } from "react";
import { TextInput } from "../TextInput/TextInput";

export const Header: React.FC = () => {
    const [searchUser, setSearchUser] = useState<string>("");

    return (
        <header className="flex flex-col md:flex-row justify-between items-center p-6">
            <img src="/images/logo-small.png" className="w-50" />

            <TextInput
                value={searchUser}
                onChange={setSearchUser}
                placeholder="Search for a user"
                className="min-w-70"
            />
        </header>
    );
}
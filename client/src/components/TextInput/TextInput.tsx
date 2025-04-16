import React from "react";

interface TextInputProps {
    value: string;
    onChange: (newValue: string) => void;
    placeholder?: string;
    type?: "text" | "password";
}

export const TextInput: React.FC<TextInputProps> = (props) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        props.onChange(e.target.value);
    }
    
    return (
        <>
            <input type={props?.type ?? "text"} className="w-full p-2 rounded-md border border-gray-300" placeholder={props?.placeholder} value={props.value} onChange={handleChange}/>
        </>
    );
}
import React from "react";

interface TextInputProps {
    value: string;
    onChange: (newValue: string) => void;
    placeholder?: string;
    type?: "text" | "password";
    className?: string;
}

export const TextInput: React.FC<TextInputProps> = (props) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        props.onChange(e.target.value);
    }
    
    return (
        <>
            <input type={props?.type ?? "text"} className={`p-2 rounded-md border border-gray-300 ${props?.className}`} placeholder={props?.placeholder} value={props.value} onChange={handleChange}/>
        </>
    );
}
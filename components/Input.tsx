import React from 'react';

interface inputProps {
    placeholder?:string;
    value?:string;
    type?:string;
    disabled?:boolean;
    onChange: (event:React.ChangeEvent<HTMLInputElement>)=>void;
}

const Input = ({placeholder, value, type, disabled, onChange}:inputProps) => {
  return (
    <input 
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        type={type}
        disabled={disabled}
        className='
            w-full
            p-4
            text-lg
            bg-black
            border-2
            border-neutral-800
            rounded-md
            outline-none
            text-white
            focus:border-sky-500
            focus:border-2
            transition
            disabled:bg-neutral-900
            disabled:opacity-70
            disabled:cursor-not-allowed;
        '
    />
  )
}

export default Input
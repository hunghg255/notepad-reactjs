import React from 'react';

interface IInput {
  type?: 'text' | 'password' | 'email' | 'number';
  className?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value?: string | number;
  placeholder?: string;
  prefixIcon?: React.ReactNode | null;
}

const Input = ({
  type,
  className = '',
  onChange,
  value = '',
  placeholder,
  prefixIcon = null,
  ...rest
}: IInput) => {
  return (
    <>
      {prefixIcon}
      <input
        type={type}
        onChange={onChange}
        value={value}
        className={`focus:ring-yellow-400 focus:border-yellow-400 block w-full pl-10 sm:text-sm border-gray-300 rounded-md ${className}`}
        placeholder={placeholder}
        {...rest}
      />
    </>
  );
};

export default Input;

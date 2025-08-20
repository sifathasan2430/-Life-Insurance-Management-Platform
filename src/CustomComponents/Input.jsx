import React from 'react';

const Input = ({
    label,
    type="text",
    className='',
    placeholder,
    ...props


}) => {
    return (
        <div>
            {label && <label  className='inline-block mb-1 pl-1' >{label}</label>}
       <input placeholder={placeholder} {...props} className={`${className}w-full px-4 py-2  bg-white border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500`} type={type} />
       </div>
    );
};

export default Input;
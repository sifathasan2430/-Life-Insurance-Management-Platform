import React from 'react';

const Select = ({
    className='',
    
    label,
    options=[],
    placeholder,
    ...props}) => {
    return (
       <div className='w-full'>
        {
            label && <label className='"block text-sm font-medium text-gray-700 mb-1'>{label}</label>
        }
          <select  {...props} className={`${className} w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 `} >
         {placeholder &&   <option value={''} selected disabled>{placeholder}</option>}
          { options.map((items,ind)=><option key={ind} value={items}>{items} </option>)}
          </select>
       </div>
    );
};

export default Select;
import React from 'react';

const SectionHeader = ({ 
    title, 
    subtitle ,
    className=''
}) => {
    return (
        <div className={` ${className} text-center px-4 sm:px-6 lg:px-8 `}>
            <h1 className="text-4xl font-bold text-gray-900 mb-3">
                {title}
            </h1>
            {subtitle && (
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                    {subtitle}
                </p>
            )}
        </div>
    );
};

export default SectionHeader;
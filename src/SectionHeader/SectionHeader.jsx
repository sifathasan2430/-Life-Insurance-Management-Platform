import React from 'react';

const SectionHeader = ({title,subtitle,align='center',className}) => {
    return (
        <div
      className={`mb-12 ${align === "center" ? "text-center" : "text-left"} ${className}`}
    >
               <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
          {subtitle}
        </p>
      )}
               
        </div>
    );
};

export default SectionHeader;
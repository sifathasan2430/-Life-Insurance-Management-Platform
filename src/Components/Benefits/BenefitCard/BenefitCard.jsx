import React from 'react';
import { 
  Zap,         // For Instant Quote
  Headphones,  // For Expert Support
  Monitor,     // For Online Application
  CreditCard,  // For Secure Payments (matches better)
  ArrowRight 
} from 'lucide-react';

const BenefitCard = ({ title, description }) => {
  // Get appropriate icon based on title
  const getIcon = () => {
    const iconClass = "w-5 h-5";
    if (title.includes('Quote')) return <Zap className={iconClass} />;
    if (title.includes('Expert')) return <Headphones className={iconClass} />;
    if (title.includes('Online')) return <Monitor className={iconClass} />;
    if (title.includes('Secure')) return <CreditCard className={iconClass} />;
    return <Zap className={iconClass} />;
  };

  // Orange for first three cards, blue for last
  const getColor = (index) => {
    return index < 3 && 'orange' ;
  };

  return (
    <div className="group relative p-6 bg-white rounded-lg border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 h-full flex flex-col">
      <div className={`w-10 h-10 rounded-lg mb-4 flex items-center justify-center 
        ${getColor() === 'orange' ? 'bg-orange-50 text-orange-600' : 'bg-blue-50 text-blue-600'}`}>
        {getIcon()}
      </div>
      
      <h3 className={`text-lg font-semibold mb-2 ${getColor() === 'orange' ? 'text-gray-900' : 'text-gray-900'}`}>
        {title}
      </h3>
      
      <p className="text-gray-600 text-sm mb-4 flex-grow">{description}</p>
      
     
    </div>
  );
};
export default BenefitCard;
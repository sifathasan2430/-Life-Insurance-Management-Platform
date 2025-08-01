
import React from 'react';
import { Link } from 'react-router-dom';

const AgentCard = ({ agent }) => {
  const { _id, name, image, email } = agent;

  return (
    <div className="relative rounded-xl overflow-hidden shadow-lg group transform hover:-translate-y-2 transition-transform duration-300 ease-in-out">
      <img 
        src={image} 
        alt={name} 
        className="w-full h-80 object-cover transition-transform duration-500 group-hover:scale-110"
      />
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
      
      {/* Content */}
      <div className="absolute bottom-0 left-0 p-6 w-full">
        <h3 className="text-2xl font-bold text-white mb-1">{name}</h3>
        <p className="text-gray-200 mb-4">{email}</p>
        <Link 
          to={`/agent/${_id}`} 
          className="inline-block bg-orange-500 text-white px-5 py-2 rounded-full text-sm font-semibold hover:bg-orange-600 transition-colors shadow-md"
        >
          View Profile
        </Link>
      </div>
    </div>
  );
};

export default AgentCard;

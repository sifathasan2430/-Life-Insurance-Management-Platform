import React from "react";

const AgentCard = ({ agent }) => {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 border border-gray-200">
      <div className="p-6">
        {/* Agent Photo & Basic Info */}
        <div className="flex items-center mb-6">
          <img
            className="h-20 w-20 rounded-full object-cover border-4 border-[#ff8c00]"
            src={agent.photo}
            alt={agent.name}
          />
          <div className="ml-4">
            <h3 className="text-xl font-bold text-gray-900">{agent.name}</h3>
            <p className="text-[#ff8c00] font-medium">{agent.role}</p>
          </div>
        </div>

        {/* Rating & Clients */}
        <div className="flex items-center mb-4">
          <svg
            className="h-5 w-5 text-yellow-400"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
          <span className="ml-2 text-gray-700">
            {agent.rating} ({agent.clients}+ clients)
          </span>
        </div>

        {/* Experience */}
        <div className="mb-4">
          <h4 className="font-semibold text-gray-900">Experience</h4>
          <p className="text-gray-600">{agent.experience}</p>
        </div>

        {/* Specialties */}
        <div className="mb-6">
          <h4 className="font-semibold text-gray-900">Specialties</h4>
          <div className="flex flex-wrap gap-2 mt-2">
            {agent.specialties.map((specialty, i) => (
              <span
                key={i}
                className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-[#ff8c00]/10 text-[#ff8c00]"
              >
                {specialty}
              </span>
            ))}
          </div>
        </div>

        {/* Contact Button */}
        <a
          href={`mailto:${agent.email}`}
          className="inline-flex items-center justify-center w-full px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-[#ff8c00] hover:bg-[#e67c00] transition-colors duration-300"
        >
          Contact {agent.name.split(' ')[0]}
        </a>
      </div>
    </div>
  );
};

export default AgentCard;
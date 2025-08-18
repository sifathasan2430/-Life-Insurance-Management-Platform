import React from "react"
import { FaLongArrowAltRight } from "react-icons/fa"
import {Link} from 'react-router-dom'

const PolicyCard = ({policy,baserate=false}) => {
  
  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition duration-300 flex flex-col h-full">
      {/* Image */}
      <div className="w-full h-[220px] overflow-hidden">
        <img
          src={policy.image}
          alt={policy.title}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        {/* Title */}
        <h4 className="text-xl font-semibold mb-2">
          <Link to={`/policy/${policy._id}`} className="hover:text-orange-600 transition-colors">
            {policy.title}
          </Link>
        </h4>

        {/* Divider */}
        <div className="border-b border-gray-200 mb-3"></div>

        {/* Description */}
        <p className="text-gray-600 mb-4 flex-1 line-clamp-3">
          {policy?.description?.length > 120
            ? `${policy.description.slice(0, 120)}...`
            : policy?.description}
        </p>
{
  baserate &&  <p className="text-sm font-bold">Baserate:${policy?.baseRate}</p>
}
        {/* Read More Link */}
        <Link
          to={`/policy/${policy._id}`}
          className="flex items-center gap-2 text-orange-500 hover:text-orange-700 font-medium mt-auto"
        >
          <span>Read More</span>
          <FaLongArrowAltRight />
        </Link>
      </div>
    </div>
  )
}

export default PolicyCard

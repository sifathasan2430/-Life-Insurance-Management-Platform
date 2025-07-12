import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom'; // if not using React Router, use <a href=...>

const PolicyCard = ({ policy }) => {
  return (
    <Card className="hover:shadow-xl transition-shadow duration-300 border border-gray-200 overflow-hidden flex flex-col">
      {/* Image */}
      <div className="h-40 w-full overflow-hidden">
        <img
          src={policy.image}
          alt={policy.title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content */}
      <div className="flex flex-col flex-grow px-5 py-4 justify-between">
        <CardHeader className="p-0 mb-2">
          <div className="flex items-start justify-between">
            <CardTitle className="text-lg font-semibold text-gray-800 leading-tight">
              {policy.title}
            </CardTitle>
            <Badge className="bg-[#ff8c00] text-white flex items-center gap-1">
              <ShieldCheck className="h-4 w-4" />
              Popular
            </Badge>
          </div>
        </CardHeader>

        <CardContent className="p-0 text-sm text-gray-600 space-y-2">
          <div>
            <span className="font-medium text-gray-800">Coverage:</span> {policy.coverage}
          </div>
          <div>
            <span className="font-medium text-gray-800">Duration:</span> {policy.duration}
          </div>
        </CardContent>

        {/* View Details Button */}
        <div className="mt-4">
          <Link
            to={`/policy/${policy._id}`}
            className="inline-block text-sm font-semibold text-[#ff8c00] hover:underline"
          >
            View Details →
          </Link>
        </div>
      </div>
    </Card>
  );
};

export default PolicyCard;

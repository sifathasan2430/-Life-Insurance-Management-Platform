import React from 'react';
import {Card,CardContent} from "@/components/ui/card"
const StatCard = ({title,value,icon,DollarIcon=false}) => {
    return (
         <Card className="shadow-md rounded-2xl w-full">
    <CardContent className="flex items-center justify-between p-6">
      <div>
        <p className="text-sm text-gray-500">{title}</p>
        <h3 className="text-xl md:text-2xl font-bold">{DollarIcon && '$' }{value}</h3>
      </div>
      <div className="p-3 rounded-full bg-orange-100 text-[#fe9a00]">
        {icon}
      </div>
    </CardContent>
  </Card>
    );
};

export default StatCard;
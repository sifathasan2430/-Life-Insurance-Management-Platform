import { useQuery } from "@tanstack/react-query";
import secureAxios from "../utils/firebaseAxios";
import React from "react";
import StatCard from "../statcard/StatCard";
import { ClipboardList, DollarSign, FileText, User } from "lucide-react";
import { PoliciesDistribution } from "@/dashboard/Charts";
import { EarningsChart } from "@/Dashboard/Charts";
const AdminOverview = () => {
  const { data } = useQuery({
    queryKey: ["totalpolice"],
    queryFn: async () => {
      const response = await secureAxios.get("/stats");
      return response.data;
    },
  });
 
  return (
    <>
  {data  && <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      <StatCard icon={<User />} value={data.policies} title="Total Polices" />
      <StatCard
        title="Total Application"
        icon={<FileText />}
        value={data.applications}
      />{" "}
      <StatCard title="Users" value={data.users} icon={<ClipboardList />} />
      <StatCard
        DollarIcon={true}
        title="Revenue"
        value={data.revenue}
        icon={<DollarSign />}
      />
    </div>  }
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
        <EarningsChart/>
    </div>
    <div className="grid grid-cols-1  gap-4 my-4">
         <PoliciesDistribution/> 
         
    </div>
    
    </>
  );
};

export default AdminOverview;

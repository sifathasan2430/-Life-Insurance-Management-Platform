
import React, { useContext } from 'react';
import StatCard from '../../statcard/StatCard';
import EarningsChart from '../../Dashboard/Charts/EarningsChart';
import PoliciesDistribution from '../../Dashboard/Charts/PoliciesDistribution';
import { useQuery } from '@tanstack/react-query';
import UserAuthContext from '../../Context/UserAuthContext';
import secureAxios from '../../utils/firebaseAxios';

const Overview = () => {
  const {user}=useContext(UserAuthContext)
   const { data: applications = [] } = useQuery({
    queryKey: ["myApplications", user?.email],
    queryFn: async () => {
      const res = await secureAxios.get(`/applications?email=${user?.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });
   const { data:rejectedApplication = [],  } = useQuery({
    queryKey: ["userApplications", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await secureAxios.get(
        `/applications?email=sifatshasan@gmail.com`
      );
      return res.data;
    },
  });
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Dashboard Overview</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
      {
        applications &&  <StatCard title="Total Applied Policies" value={applications.length} />
      }
      { rejectedApplication && <StatCard title="Rejected Policies" value={rejectedApplication.length} />}
        <StatCard title="Pending Claims" value="2" />
       
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-2">Earnings</h2>
          <EarningsChart />
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-2">Policies Distribution</h2>
          <PoliciesDistribution />
        </div>
      </div>
    </div>
  );
};

export default Overview;

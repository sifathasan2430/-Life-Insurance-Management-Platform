
import React from 'react';
import StatCard from '../../statcard/StatCard';
import EarningsChart from '../../Dashboard/Charts/EarningsChart';
import PoliciesDistribution from '../../Dashboard/Charts/PoliciesDistribution';

const Overview = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Dashboard Overview</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
        <StatCard title="Total Policies" value="12" />
        <StatCard title="Active Policies" value="8" />
        <StatCard title="Pending Claims" value="2" />
        <StatCard title="Total Invested" value="$5,400" />
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

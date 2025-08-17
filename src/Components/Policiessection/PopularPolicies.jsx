import React from 'react';
import { useQuery } from '@tanstack/react-query';
 

import secureAxios from '../../utils/firebaseAxios';
import PolicyCard from './PoliciessCard/PolicyCard';
import Container from '../Container/Container';
import Section from '../Section/Section';
import SectionHeader from '../../SectionHeader/SectionHeader';

const PopularPolicies = () => {
  const { data: policies = [], isLoading, isError } = useQuery({
    queryKey: ['popular-policies'],
    queryFn: async () => {
     const res = await secureAxios.get('/policies/top');
  return res.data;
    }
  });


 

  if (isLoading) return <p className="text-center py-10">Loading...</p>;
  if (isError) return <p className="text-center py-10 text-red-500">Failed to load policies</p>;

  return (
    <Section>
      <SectionHeader title='Popular Policies'/>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {policies.map(policy => (
          <PolicyCard key={policy._id} policy={policy} />
        ))}
      </div>
   </Section>
  );
};

export default PopularPolicies;
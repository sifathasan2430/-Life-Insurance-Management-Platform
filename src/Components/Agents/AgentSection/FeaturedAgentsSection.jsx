import React from 'react';
import AgentCard from '../AgentsCard/AgentCard';
import Container from '../../Container/Container';
import Section from '../../Section/Section';
import SectionHeader from '../../../SectionHeader/SectionHeader';

const agents = [
  {
    _id: '1',
    name: 'John Doe',
    image: 'https://noxiy.nextwpcook.com/wp-content/uploads/2023/07/team-5-1.jpg',
    email: 'john.doe@example.com',
  },
  {
    _id: '2',
    name: 'Jane Smith',
    image: ' https://noxiy.nextwpcook.com/wp-content/uploads/2023/07/team-2-2.jpg',
    email: 'jane.smith@example.com',
  },
 
 


  {
    _id: '3',
    name: 'Peter Jones',
    image: 'https://noxiy.nextwpcook.com/wp-content/uploads/2023/07/team-7-1.jpg',
    email: 'peter.jones@example.com',
  },
  {
    _id: '2',
    name: 'Jane Smith',
    image: ' https://noxiy.nextwpcook.com/wp-content/uploads/2023/07/team-2-2.jpg',
    email: 'jane.smith@example.com',
  },
];

const FeaturedAgentsSection = () => {
  return (
    
      <Section>
       <SectionHeader title={'Our Featured Agents'}/>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {agents.map((agent) => (
            <AgentCard key={agent._id} agent={agent} />
          ))}
        </div>
      </Section>
  
  );
};

export default FeaturedAgentsSection;
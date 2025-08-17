import React from 'react';
import BenefitCard from './BenefitCard/BenefitCard';
import Container from '../Container/Container';
import Section from '../Section/Section';
import SectionHeader from '../../SectionHeader/SectionHeader';

const benefitsData = [
  {
    title: 'Instant Quote Calculation',
    description: 'Get instant and accurate insurance quotes tailored to your needs.',
  },
  {
    title: 'Expert Agent Support',
    description: 'Our experts are here to guide you through every step.',
  },
  {
    title: '100% Online Application',
    description: 'Apply anytime, anywhere with our fully digital process.',
  },
  {
    title: 'Secure Online Payments',
    description: 'Safe and fast payment methods for your convenience.',
  },
];

const BenefitsSection = () => {
  return (
    <Section>
    <SectionHeader title={'Benefits of LifeSure'}/>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {benefitsData.map((benefit, idx) => (
          <BenefitCard key={idx} {...benefit} />
        ))}
      </div>
    </Section>
  );
};

export default BenefitsSection;
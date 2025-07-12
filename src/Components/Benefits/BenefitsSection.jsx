import React from 'react';
import BenefitCard from './BenefitCard/BenefitCard';

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
    <section className="max-w-7xl mx-auto px-4 md:px-6 py-12">
      <h2 className="text-3xl font-bold text-center mb-8">Benefits of LifeSure</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {benefitsData.map((benefit, idx) => (
          <BenefitCard key={idx} {...benefit} />
        ))}
      </div>
    </section>
  );
};

export default BenefitsSection;
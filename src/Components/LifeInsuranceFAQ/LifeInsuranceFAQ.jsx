import { useState } from 'react';
import { Button } from '@/components/ui/button';

const faqs = [
  {
    question: "What is life insurance?",
    answer:
      "Life insurance is a contract where an insurance company provides a lump-sum payment to your beneficiaries in case of your death, in exchange for premium payments.",
  },
  {
    question: "What types of life insurance do you offer?",
    answer:
      "We offer Term Life, Whole Life, and Universal Life insurance options. Each plan is tailored to suit different needs and budgets.",
  },
  {
    question: "How do I apply for a life insurance policy?",
    answer:
      "You can apply through our platform by selecting a plan, submitting your personal information, and completing the required health questionnaire.",
  },
  {
    question: "How are premiums calculated?",
    answer:
      "Premiums are based on factors such as age, health conditions, policy coverage amount, and payment frequency (monthly/yearly).",
  },
  {
    question: "Can I update or cancel my policy?",
    answer:
      "Yes, you can modify your policy details or cancel it anytime through your dashboard. Terms and conditions apply.",
  },
];

const LifeInsuranceFAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="max-w-4xl mx-auto px-4 py-10">
      {/* Header */}
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold text-orange-600">Frequently Asked Questions</h2>
        <p className="text-gray-600 mt-2">Everything you need to know about life insurance on our platform.</p>
      </div>

      {/* Accordion FAQ */}
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="border border-gray-200 rounded-md shadow-sm p-4 cursor-pointer"
            onClick={() => toggle(index)}
          >
            <div className="flex justify-between items-center">
              <h3 className="font-medium text-lg">{faq.question}</h3>
              <span className="text-orange-500">{openIndex === index ? '-' : '+'}</span>
            </div>
            {openIndex === index && (
              <p className="mt-2 text-gray-600">{faq.answer}</p>
            )}
          </div>
        ))}
      </div>

      {/* Contact Section */}
      <div className="mt-12 text-center bg-orange-50 p-6 rounded-lg">
        <h3 className="text-xl font-semibold text-orange-700">Still have questions?</h3>
        <p className="text-gray-600 mb-4">Our support team is here to help you get the answers you need.</p>
        <Button className="bg-orange-600 hover:bg-orange-700 text-white">Contact Support</Button>
      </div>
    </section>
  );
};

export default LifeInsuranceFAQ;
import React from 'react';

// SalesPromotion Component: Displays a promotional offer with a call-to-action.
// It uses Tailwind CSS for a modern and responsive design, now with colors
// related to the primary color #ff9a68 and no blue hues.
const SalesPromotion = () => {
  return (
    <section className="bg-gradient-to-r from-[#e66a3d] to-[#ff9a68] py-16 px-4 sm:px-6 lg:px-8 rounded-lg shadow-xl mx-auto my-12 max-w-6xl">
      <div className="max-w-4xl mx-auto text-center">
        {/* Promotion Title */}
        <h2 className="text-4xl sm:text-5xl font-extrabold text-white mb-6 leading-tight">
          Secure Your Future Today & Get <span className="text-amber-300">20% Off!</span> 🚀
        </h2>

        {/* Promotion Description */}
        <p className="text-xl text-orange-100 mb-8 max-w-3xl mx-auto">
          Don't wait to protect what matters most. For a limited time, get an exclusive 20% discount on all new life insurance policies.
          Peace of mind is just a click away!
        </p>

        {/* Call-to-Action Button */}
        <div className="flex justify-center">
          <button
            onClick={() => console.log('Get Your Free Quote Now! button clicked!')} // Replace with your actual navigation logic
            className="bg-zinc-800 hover:bg-zinc-900 text-white font-bold py-3 px-8 rounded-full shadow-lg transform transition-transform duration-300 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-zinc-400 focus:ring-opacity-75"
          >
            Get Your Free Quote Now!
          </button>
        </div>

        {/* Small print / Disclaimer (optional) */}
        <p className="text-sm text-orange-200 mt-8">
          *Offer valid for new customers only. Terms and conditions apply.
        </p>
      </div>
    </section>
  );
};

export default SalesPromotion;

import React from "react";

export default function About() {
  return (
    <div className="py-20 px-6 max-w-7xl mx-auto text-center">
      <h1 className="text-4xl font-extrabold text-gray-900 mb-6">Welcome to Madhan's Estate</h1>
      <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-8">
        Elevating the art of real estate, Madhan’s Estate is your trusted partner for buying, selling, and investing in premium properties. With a commitment to excellence, we offer expert insights and personalized solutions tailored to your real estate aspirations.
      </p>
      
      <div className="grid md:grid-cols-3 gap-8">
        <div className="p-6 shadow-lg rounded-lg bg-white hover:shadow-xl transition duration-300">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">🏡 Buy Your Dream Home</h2>
          <p className="text-gray-600">Find exclusive listings in top locations, tailored to your needs and lifestyle.</p>
        </div>
        
        <div className="p-6 shadow-lg rounded-lg bg-white hover:shadow-xl transition duration-300">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">📈 Sell With Confidence</h2>
          <p className="text-gray-600">Maximize your property’s value with strategic marketing and expert guidance.</p>
        </div>
        
        <div className="p-6 shadow-lg rounded-lg bg-white hover:shadow-xl transition duration-300">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">🏢 Smart Investments</h2>
          <p className="text-gray-600">Unlock profitable opportunities in real estate with our market expertise.</p>
        </div>
      </div>
      
      <div className="mt-12 max-w-4xl mx-auto">
        <h3 className="text-2xl font-bold text-gray-800 mb-4">Why Choose Madhan’s Estate?</h3>
        <p className="text-lg text-gray-600 leading-relaxed">
          With years of industry experience and a client-first approach, we redefine real estate services by ensuring seamless transactions, transparency, and satisfaction at every step.
        </p>
      </div>
    </div>
  );
}
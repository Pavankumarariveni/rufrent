import React from "react";

import { features } from "./models/packageModel";
import tailwindStyles from "../../utils/tailwindStyles";

const PackageSection = () => {
  return (
    <section id="rr-package" className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-10 lg:px-0">
        {/* Header Section */}
        <h2 className={` text-center text-3xl font-bold mb-8`}>
          Rufrent RR Package
        </h2>
        <p className="text-center text-lg text-gray-700 mb-12">
          Comprehensive services for hassle-free rental management
        </p>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="text-center">
              <img
                src={feature.imgSrc}
                alt={feature.imgAlt}
                className="w-20 h-20 mx-auto object-cover mb-4 rounded-full"
              />
              <h3 className={`${tailwindStyles.heading} text-xl font-semibold`}>
                {feature.title}
              </h3>
              <p className={`${tailwindStyles.paragraph} text-gray-700`}>
                {feature.description}
              </p>
            </div>
          ))}
        </div>
        {/* Additional Benefits Section */}
        <div>
          <h3 className="text-xl mt-10 font-semibold mb-4">
            Additional Benefits
          </h3>
          <ul className="list-disc pl-6 text-gray-700">
            <li>
              Referral bonus of <strong>1,000 points (1 point = 1 INR)</strong>{" "}
              for every successful tenant
            </li>
            <li>
              <strong>25% discount</strong> on RR Package renewal
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default PackageSection;

import React from "react";
import tailwindStyles from "../../utils/tailwindStyles";

const BrokerageSection = () => {
  return (
    <section className="bg-gray-50 py-16 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-gray-800 text-center px-4 mb-8">
          <h2 className="text-3xl font-bold mb-2">Fixed Brokerage</h2>
          <p className="text-lg">
            Transparent and Value-Driven Rental Solutions
          </p>
        </div>

        {/* Content */}
        <div className="space-y-8">
          {/* Intro Text */}
          <div>
            <p className="text-gray-700 text-lg">
              At Rufrent, our brokerage model is straightforward and
              transparent. The brokerage is a one-time payment, applicable only
              after the property is finalized.
            </p>
          </div>

          {/* Package Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
            {/* Package Information */}
            <div>
              <h3
                className={`${tailwindStyles.heading} text-xl font-semibold mb-4`}
              >
                Rufrent RR Package
              </h3>
              <p className={`${tailwindStyles.paragraph} text-gray-700`}>
                Tenants are required to purchase the <strong>RR Package</strong>{" "}
                for <strong>₹19,999</strong>. This package not only covers the
                brokerage but also offers a range of additional services,
                including:
              </p>
              <ul className="list-disc pl-6 mt-4 text-gray-700">
                <li>Drafting and managing rental agreements</li>
                <li>Professional property photo shoots</li>
                <li>AI-driven rental analysis</li>
                <li>
                  Personalized support from dedicated Relationship Managers (RM)
                  and Field Managers (FM)
                </li>
              </ul>
            </div>

            {/* Relevant Image */}
            <div className="flex items-center justify-center">
              <img
                src="https://content.jdmagicbox.com/comp/def_content/property-investment/shutterstock-375747526-property-property-investment-4-5wyto.jpg"
                alt="Fixed Brokerage"
                className="h-48 w-96 object-cover rounded-lg shadow-md"
              />
            </div>
          </div>

          {/* Benefits Section */}
          <div>
            <p className={`${tailwindStyles.paragraph} text-gray-700`}>
              This ensures a hassle-free and value-added rental experience for
              both tenants and property owners.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BrokerageSection;

import tailwindStyles from "../../utils/tailwindStyles";
import { wcuItems } from "./models/wcModel";

const WcuSection = () => {
  // List of items data

  return (
    <div id="wc" className="pt-16">
      <section className="py-8 px-8 bg-gray-50">
        <h2
          className={`${tailwindStyles.heading} text-center text-3xl font-bold mb-8`}
        >
          Why Choose Rufrent
        </h2>
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Map over the wcuItems array and pass data to WcuItem */}
          {wcuItems.map((item, index) => (
            <div key={index} className="text-center">
              <img
                src={item.iconSrc}
                alt={item.title}
                className="w-24 h-24 mx-auto mb-4 rounded-full"
              />
              <h3 className={`${tailwindStyles.heading} text-xl font-semibold`}>
                {item.title}
              </h3>
              <p className={`${tailwindStyles.paragraph}`}>
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default WcuSection;

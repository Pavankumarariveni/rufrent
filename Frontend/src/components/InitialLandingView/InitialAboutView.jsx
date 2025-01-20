import tailwindStyles from "../../utils/tailwindStyles";

const AboutSection = () => (
  <div className="pt-20" id="about">
    <section className=" px-8 bg-white">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center  md:space-y-0 md:space-x-8">
        <img
          src="https://www.modiproperties.com/images/projects/1620391618_C1%20FRONT%20REV.jpg"
          alt="Owner Image"
          className="w-full md:w-1/2 h-auto rounded-lg shadow-lg"
        />
        <div>
          <h2 className={`${tailwindStyles.heading} text-3xl font-bold mb-4`}>
            About Rufrent
          </h2>
          <p className={`${tailwindStyles.paragraph} text-lg text-justify`}>
            &nbsp;&nbsp;&nbsp;&nbsp;At Rufrent, we specialize in premium
            property management and rental experiences tailored exclusively for
            high-end residential communities. Our platform provides a seamless
            solution for renting and leasing properties with verified listings,
            advanced search options, and personalized support to ensure a
            hassle-free experience for property owners and tenants alike. <br />
            <br />
            &nbsp;&nbsp;&nbsp;&nbsp;At Rufrent, our mission is to simplify
            premium property rentals with innovative tools, transparent
            processes, and exceptional customer support. Experience a smarter
            and more rewarding rental journey with Rufrent!
          </p>
        </div>
      </div>
    </section>
  </div>
);

export default AboutSection;

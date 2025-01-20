import tailwindStyles from "../../utils/tailwindStyles";

const TestimonialsSection = () => (
  <section id="testimonials" className="py-16 px-8 bg-white">
    <h2
      className={`${tailwindStyles.heading} text-center text-3xl font-bold mb-8`}
    >
      Testimonials
    </h2>
    <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
      <div className="bg-gray-100 p-6 rounded-lg shadow-md text-center">
        <p className={`italic`}>
          "QTI Property helped me find the perfect rental in no time. Highly
          recommend!"
        </p>
        <div className="flex items-center justify-center mt-4">
          <img
            src="https://www.mydinosaurs.com/wp-content/uploads/2018/07/testimonial-user-1.jpg"
            alt="User 1"
            className="w-12 h-12 rounded-full mr-2"
          />
          <p>John Doe</p>
        </div>
      </div>
      <div className="bg-gray-100 p-6 rounded-lg shadow-md text-center">
        <p className="italic">
          "Professional and efficient services. I couldn't be happier with my
          experience."
        </p>
        <div className="flex items-center justify-center mt-4">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTcH-1O1vJrO7JES9PymGvX2EBW942VbepT8u_KIg9_D4zpyRobQ9O-JYvCy5HjBzfz5xQ&usqp=CAU"
            alt="User 2"
            className="w-12 h-12 rounded-full mr-2"
          />
          <p>Janie Smith</p>
        </div>
      </div>
      <div className="bg-gray-100 p-6 rounded-lg shadow-md text-center">
        <p className="italic">
          "The best rental service provider! Made my property listing easy and
          stress-free."
        </p>
        <div className="flex items-center justify-center mt-4">
          <img
            src="https://images.squarespace-cdn.com/content/v1/5eadd788d91ce47af1ba2e5a/d8a682fc-b2ef-4c09-96b6-6d40127296f7/Testimonial+1.jpg"
            alt="User 3"
            className="w-12 h-12 rounded-full mr-2"
          />
          <p>Sam Wilson</p>
        </div>
      </div>
    </div>
  </section>
);

export default TestimonialsSection;

import tailwindStyles from "../../utils/tailwindStyles";

const FooterSection = () => (
  <footer className="flex justify-around items-start bg-gray-800 text-white py-8">
    <div className="max-w-6xl grid grid-cols-1 md:grid-cols-3 gap-8">
      <div>
        <h3 className="text-xl font-semibold">Use Cases</h3>
        <ul className="mt-4 space-y-2">
          <li>
            <a href="#" className="hover:text-gray-400">
              Property Listings
            </a>
          </li>
          <li>
            <a href="#" className="hover:text-gray-400">
              Rental Management
            </a>
          </li>
          <li>
            <a href="#" className="hover:text-gray-400">
              Tenant Screening
            </a>
          </li>
          <li>
            <a href="#" className="hover:text-gray-400">
              Consulting
            </a>
          </li>
        </ul>
      </div>
      <div>
        <h3 className="text-xl font-semibold">Explore</h3>
        <ul className="mt-4 space-y-2">
          <li>
            <a href="#" className="hover:text-gray-400">
              Property Types
            </a>
          </li>
          <li>
            <a href="#" className="hover:text-gray-400">
              Support
            </a>
          </li>
          <li>
            <a href="#" className="hover:text-gray-400">
              Resources
            </a>
          </li>
          <li>
            <a href="#" className="hover:text-gray-400">
              Blog
            </a>
          </li>
        </ul>
      </div>
      <div>
        <h3 className="text-xl font-semibold">Resources</h3>
        <ul className="mt-4 space-y-2">
          <li>
            <a href="#" className="hover:text-gray-400">
              FAQs
            </a>
          </li>
          <li>
            <a href="#" className="hover:text-gray-400">
              Best Practices
            </a>
          </li>
          <li>
            <a href="#" className="hover:text-gray-400">
              Property Tips
            </a>
          </li>
          <li>
            <a href="#" className="hover:text-gray-400">
              Customer Support
            </a>
          </li>
        </ul>
      </div>
    </div>
    <div className="mt-8 text-center space-x-4">
      <a href="#">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6c/Facebook_Logo_2023.png/768px-Facebook_Logo_2023.png"
          alt="Facebook"
          className="inline-block w-6 rounded-full mb-3"
        />
      </a>
      <a href="#">
        <img
          src="https://png.pngtree.com/png-clipart/20190613/original/pngtree-instagram-logo-icon-png-image_3588821.jpg"
          alt="Instagram"
          className="inline-block w-6 rounded-full mb-3"
        />
      </a>
      <a href="#">
        <img
          src="https://cdn.prod.website-files.com/5d66bdc65e51a0d114d15891/64cebdd90aef8ef8c749e848_X-EverythingApp-Logo-Twitter.jpg"
          alt="Twitter"
          className="inline-block w-6 rounded-full mb-3"
        />
      </a>
    </div>
  </footer>
);

export default FooterSection;

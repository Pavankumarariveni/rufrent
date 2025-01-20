// ContentOverlay.js
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { fetchCityList } from "../../services/newapiservices";
import useFilterStore from "../../store/filterStore";

import tailwindStyles from "../../utils/tailwindStyles";
import { apiUrl } from "../../config/apiRoute";

import Dropdown from "./hooks/dropdown";
import CitySelector from "./hooks/citySelector";

const bhkValues = [
  { id: 1, name: "1 BHK" },
  { id: 2, name: "2 BHK" },
  { id: 3, name: "3 BHK" },
];

const ContentOverlay = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({ cities: [], communities: [] });
  const [city, setCity] = useState("");
  const [community, setCommunityType] = useState("");
  const [hometype, setBhk] = useState("");
  const { setFilterData } = useFilterStore();

  useEffect(() => {
    const getCities = async () => {
      const cities = await fetchCityList();
      setData((prev) => ({ ...prev, cities }));
      setLoading(false);
    };
    getCities();
  }, []);

  useEffect(() => {
    const getCommunities = async () => {
      if (city) {
        const communities = await axios.get(
          `${apiUrl}/getTopCommunities?city_id=${city}`
        );

        setData((prev) => ({ ...prev, communities: communities.data.result }));
      }
    };
    getCommunities();
  }, [city]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setFilterData({ city, community, hometype });
    navigate("/user-landing");
  };

  return (
    <div
      className={`absolute inset-0 flex items-center justify-center bg-gray-700 bg-opacity-30 transition-opacity duration-300`}
      style={{ height: "500px" }}
    >
      <div
        style={{ backgroundColor: "#0908086e", color: "#E9DCC9" }}
        className="relative z-10 backdrop-blur-sm p-6 m-5 rounded-lg shadow-lg w-full max-w-3xl"
      >
        {loading ? (
          <p className="text-white">Loading...</p>
        ) : (
          <>
            <h1 className="text-xl md:text-5xl font-bold text-[#7AB2D3] mb-4">
              Find Your Perfect Rental Property
            </h1>
            <p className="text-base md:text-xl text-gold mb-8">
              Explore a wide range of premium properties tailored just for you.
            </p>

            <form
              className="flex flex-col  items-center gap-4"
              onSubmit={handleSubmit}
            >
              <div>
                <CitySelector
                  cities={data.cities}
                  selectedCity={city}
                  setSelectedCity={setCity}
                />
              </div>
              <div className="flex w-full md:justify-between md:space-x-2 flex-col items-center gap-4 md:flex-row">
                <Dropdown
                  label="Popular Communities"
                  value={community}
                  onChange={(e) => setCommunityType(e.target.value)}
                  options={data.communities}
                />
                <Dropdown
                  label="BHK"
                  value={hometype}
                  onChange={(e) => setBhk(e.target.value)}
                  options={bhkValues}
                />
                <button
                  type="submit"
                  className={`${tailwindStyles.secondaryButton} w-full md:w-auto font-semibold rounded-md transition duration-300 hover:bg-[#035a8e]`}
                >
                  Search
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default ContentOverlay;

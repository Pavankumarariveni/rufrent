import { useEffect } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router";

import { useRoleStore } from "../../store/roleStore";

import InitialHeaderView from "./InitialHeaderView";
import HeroSection from "./InitialHeroView";
import AboutSection from "./InitialAboutView";
import WcuSection from "./InitialWcuView";
import PackageSection from "./PackageView";
import BrokerageSection from "./BrokerageView";
import TestimonialsSection from "./TestimonialsView";
import FooterSection from "./InitialFooterView";

const InitialLandingPage = () => {
  const { userData } = useRoleStore();

  const navigate = useNavigate();

  useEffect(() => {
    const jwtToken = Cookies.get("jwtToken");
    if (jwtToken !== undefined) {
      // Redirect to login if token doesn't exist
      navigate(`/${userData.role}`);
    }
  }, [navigate]);

  return (
    <>
      {/* Initial Header */}
      <InitialHeaderView />
      {/* Hero Search Section*/}
      <HeroSection />
      {/* <!-- About Us Section --> */}
      <AboutSection />
      {/* <!-- Why Choose Us Section --> */}
      <WcuSection />
      {/* <!-- Package Section --> */}
      <PackageSection />
      {/* <!-- Brokerage Section --> */}
      <BrokerageSection />
      {/* <!-- Testimonials Section --> */}
      <TestimonialsSection />
      {/* <!-- Footer Section --> */}
      <FooterSection />
    </>
  );
};

export default InitialLandingPage;

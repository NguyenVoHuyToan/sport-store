import React from "react";
import { Link } from "react-router-dom";
import Banner from "../component/Banner";
import FeaturedProducts from "../component/FeaturedProducts";
import HighlightProducts from "../component/HighlightProducts";
function Home() {
  return (
    <div>
      <Banner/>
      <FeaturedProducts/>
      <HighlightProducts/>
    </div>
  );
}

export default Home;

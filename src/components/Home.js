import React from "react";
import "./Home.css";

function Home({ children }) {
  return <div className="d-flex mt-5 mx-auto home">{children}</div>;
}

export default Home;

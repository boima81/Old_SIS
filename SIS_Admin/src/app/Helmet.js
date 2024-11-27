import React from "react";
import { Helmet } from "react-helmet";
import App from "./App";

const HelmetWrap = () => {
  return (
    <Helmet>
      <App />
    </Helmet>
  );
};

export default HelmetWrap;

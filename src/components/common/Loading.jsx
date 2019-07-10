import React from "react";
import { BarLoader } from "react-spinners";

function Loading() {
  return (
    <div className="mx-auto" style={{
        marginTop: "100px"
    }}>
      <BarLoader />
    </div>
  );
}

export default Loading;

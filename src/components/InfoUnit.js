import React from "react";
import NumberFormat from "react-number-format";
import Web3 from "web3";
import "./InfoUnit.css";

const web3 = new Web3();

function InfoUnit({ title, value, wei }) {
  const sanitize = weiVal => {
    let val = web3.utils.fromWei(weiVal, "ether");
    return val;
  };

  return (
    <div className="d-flex justify-content-between my-2">
      <div className="info-title mr-2">{title}</div>
      <div className="info-value my-auto d-flex">
        <NumberFormat
          displayType="text"
          value={wei ? sanitize(value) : value}
          thousandSeparator={true}
          decimalScale={0}
        />{" "}
        {wei && <div className="ml-1">Ξ</div>}
      </div>
    </div>
  );
}

export default InfoUnit;

import React from "react";
import NumberFormat from "react-number-format";
import Web3 from "web3";
import "./InfoUnit.css";

const web3 = new Web3();

function InfoUnit({ title, value, wei, pct }) {
  const sanitize = weiVal => {
    let val = web3.utils.fromWei(weiVal, "ether");
    return val;
  };

  return (
    <div className="d-flex justify-content-between my-2">
      <div className="info-title mr-2">{title}</div>
      <div className="info-value my-auto d-flex">
        <div className="d-flex">
          <NumberFormat
            displayType="text"
            value={wei ? sanitize(value) : value}
            thousandSeparator={true}
            decimalScale={0}
          />{" "}
          {wei && <div className="ml-1">Ξ</div>}
          {pct && (
              <div className={`${pct === true ? "ml-2" : "ml-3"}`}>{Math.floor(pct * 100) + "%"}</div>
          )}
        </div>
      </div>
    </div>
  );
}

export default InfoUnit;

import React, { useState } from "react";
import { Query } from "react-apollo";
import { GET_MASTERS } from "../../queries/masters";
import SectionHeadline from "../common/SectionHeadline";
import Loading from "../common/Loading";
import Error from "../common/Error";
import EthAddress from "ethereum-address";
import Blockies from "react-blockies";
import Moment from "react-moment";
import Web3 from "web3";
import "./Masters.css";

const web3 = new Web3();

function MyAnalysis() {
  const [showData, toggleShowData] = useState(false);
  const [error, setError] = useState(null);
  const [analysisAddress, setAnalysisAddress] = useState("");

  const exampleAddress = "0x42dfa7e528cc9d9c69a855ef2eabf68a5afa8fbe"

  const sanitize = weiVal => {
    let val = web3.utils.fromWei(weiVal, "ether");
    return val.slice(0, 5);
  };

  const submit = () => {
    if (EthAddress.isAddress(analysisAddress)) {
      toggleShowData(true);
    } else {
      setError("Invalid Ethereum address");
      setTimeout(() => {
        setError(null);
      }, 2000);
    }
  };

  if (!showData) {
    return (
      <div className="d-flex flex-column mx-auto">
        <SectionHeadline text="Address Analysis" />
        <div className="d-flex flex-column">
          <div className="address-label mb-2">Enter an Ethereum address</div>
          <div className="d-flex">
            <input
              value={analysisAddress}
              onChange={evt => setAnalysisAddress(evt.target.value)}
              className="address-input"
            />
            <div
              onClick={submit}
              className="address-button mx-auto align-items-center d-flex justify-content-center"
            >
              Submit
            </div>
          </div>
          <div className="example-address mt-1" onClick={() =>  setAnalysisAddress(exampleAddress)}>Use example address</div>
          <div className="address-error">{error}</div>
        </div>
      </div>
    );
  }

  return (
    <Query
      query={GET_MASTERS}
      variables={{
        id: analysisAddress
      }}
    >
      {({ loading, error, data, fetchMore }) => {
        if (loading) {
          return <Loading />;
        }

        if (error) {
          return <Error />
        }

        const { masters } = data;

        if (!masters || !masters[0] || !masters[0].id) {
          return <div>No results</div>;
        }

        const {
          firstTransacted,
          lastTransacted,
          totalKittiesBought,
          totalKittiesSold,
          valueSpentBuying,
          valueEarnedSelling
        } = masters[0];

        return (
          <div className="d-flex flex-column mx-auto">
            <SectionHeadline text="Address Analysis" />
            <div className="d-flex">
              <Blockies seed={analysisAddress} size={10} />
              <div className="d-flex flex-column mx-2">
                <div className="section-title mx-auto">First Transaction</div>
                <Moment
                  fromNow={true}
                  unix={true}
                  className="mx-auto section-value"
                >
                  {firstTransacted}
                </Moment>
              </div>
              <div className="d-flex flex-column mx-2">
                <div className="section-title mx-auto">Last Transaction</div>
                <Moment
                  fromNow={true}
                  unix={true}
                  className="mx-auto section-value"
                >
                  {lastTransacted}
                </Moment>
              </div>
              <div className="d-flex flex-column mx-2">
                <div className="section-title mx-auto">Kitties Bought</div>
                <div className="mx-auto section-value">
                  {totalKittiesBought}
                </div>
              </div>
              <div className="d-flex flex-column mx-2">
                <div className="section-title mx-auto">Kitties Sold</div>
                <div className="mx-auto section-value">{totalKittiesSold}</div>
              </div>
            </div>

            <div className="d-flex mt-3">
              <div style={{ width: "42px" }} />
              <div className="d-flex flex-column mx-2">
                <div className="section-title mx-auto">Spent on Kitties</div>
                <div className="mx-auto section-value">
                  {sanitize(valueSpentBuying)} Ξ
                </div>
              </div>
              <div className="d-flex flex-column mx-2">
                <div className="section-title mx-auto">Earned on Kitties</div>
                <div className="mx-auto section-value">
                  {sanitize(valueEarnedSelling)} Ξ
                </div>
              </div>
            </div>
          </div>
        );
      }}
    </Query>
  );
}

export default MyAnalysis;

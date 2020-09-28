import React, { useEffect, useState } from "react";

import { API } from "../../services/api-service";
import { useHistory } from "react-router-dom";
import { Card } from "semantic-ui-react";

import "./ExchangeRates.css";

const ExchangeRates = () => {
  const history = useHistory();

  //-------------------------------States-----------------------------------
  const [exchangeRates, setExchangeRates] = useState([]); //To Set List of Exchange Rates
  const [base, setBase] = useState(""); //To Set the Base Value, by default EUR from the End-Point

  //----------------------------------Side Effects--------------------------------
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      return history.replace("/");
    }
    API.get("/latest")
      .then((res) => {
        const { data } = res;
        const keys = Object.keys(data.rates);
        const exchangeRates = keys.map((el) => {
          return {
            currency: el,
            rate: data.rates[el],
          };
        });
        setExchangeRates(exchangeRates);
        setBase(data.base);
      })
      .catch((e) => {
        console.error("error", e);
      });
  }, []);

  /**
   *
   * @param {string} currency
   * @description To Route to Currency Converter Page
   */
  const cardClickHandler = (currency) => {
    history.push(`/home-page/currency-converter/${currency}`);
  };

  return (
    <>
      <div className="exchange-rates-cards">
        <Card.Group centered>
          {exchangeRates.map((exchangeRate) => {
            return (
              <Card onClick={() => cardClickHandler(exchangeRate.currency)}>
                <Card.Content>
                  <Card.Header>{exchangeRate.currency}</Card.Header>
                  <Card.Description>
                    1 {base} = {exchangeRate.rate} {exchangeRate.currency}
                  </Card.Description>
                </Card.Content>
              </Card>
            );
          })}
        </Card.Group>
      </div>
    </>
  );
};

export default ExchangeRates;

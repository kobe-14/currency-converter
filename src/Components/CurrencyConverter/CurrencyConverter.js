import React, { useEffect, useState, Suspense } from "react";
import Converter from "./Converter/Converter";

import "./CurrencyConverter.css";
import { API } from "../../services/api-service";
import { useHistory, useParams } from "react-router-dom";
import { Dropdown, Icon } from "semantic-ui-react";

const CurrencyConverter = () => {
  const history = useHistory();
  const params = useParams();
  //------------------------------States--------------------------------------
  const [currencyOptions, setCurrencyOptions] = useState([]); //List of Currency Options
  const [toConvertCurrency, setToConvertCurrency] = useState(""); //Source Currency
  const [convertedCurrency, setconvertedCurrency] = useState(""); //Target Currency
  const [amount, setAmount] = useState(1); //Default Amount for Source Currency
  const [convertCurrency, setConvertCurrency] = useState(true); //Boolean value to check whether the base to be set is from source
  const [exchangeRates, setExchangeRates] = useState({}); //Object of Currencies
  const [firstAmount, setFirstAmount] = useState(null); //Calculated Source Amount
  const [secondAmount, setSecondAmount] = useState(null); //Calculated Target Amount

  //-------------------------------Side Effects---------------------------------
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      return history.replace("/");
    }
    const { base } = params;
    API.get("/latest/", { base })
      .then((res) => {
        const { data } = res;
        const baseCurrency = {
          text: data.base,
          value: data.base,
          key: data.base,
        };
        const otherCurrency = Object.keys(data.rates).map((el) => ({
          text: el,
          key: el,
          value: el,
        }));
        const firstCurrency = Object.keys(data.rates)[0];
        otherCurrency.unshift(baseCurrency);
        setCurrencyOptions(otherCurrency);
        setToConvertCurrency(data.base);
        setconvertedCurrency(firstCurrency);
        setExchangeRates(data.rates);
        setSecondAmount(data.rates[firstCurrency]);
      })
      .catch((e) => {
        console.error("error", e);
      });
  }, []);

  useEffect(() => {
    if (toConvertCurrency !== "" && convertedCurrency !== "") {
      let exchangeRate = exchangeRates[convertedCurrency];
      if (convertCurrency) {
        setFirstAmount(amount);
        setSecondAmount(amount * exchangeRate);
      } else {
        setSecondAmount(amount);
        setFirstAmount(amount / exchangeRate);
      }
    }
  }, [toConvertCurrency, convertedCurrency]);

  useEffect(() => {
    let exchangeRate = exchangeRates[convertedCurrency];
    if (convertCurrency) {
      setFirstAmount(amount);
      setSecondAmount(amount * exchangeRate);
    } else {
      setSecondAmount(amount);
      setFirstAmount(amount / exchangeRate);
    }
  }, [amount]);

  //-------------------------------Handlers-----------------------------------
  /**
   *
   * @param {React.SyntheticEvent} e
   * @param {import("semantic-ui-react").DropdownProps} ed
   * @param {string } type
   * @description Dropdown Change Handler
   */
  const onCurrencyChangeHandler = (e, ed, type) => {
    switch (type) {
      case "toConvertCurrency":
        return setToConvertCurrency(ed.value);
      case "convertedCurrency":
        return setconvertedCurrency(ed.value);
    }
  };

  /**
   *
   * @param {React.SyntheticEvent} e
   * @param {import("semantic-ui-react").InputProps} ed
   * @param {string} type
   * @description Input Change Handler
   */
  const onChangeAmountHandler = (e, ed, type) => {
    switch (type) {
      case "toConvertCurrency":
        setAmount(ed.value);
        setConvertCurrency(true);
        return;
      case "convertedCurrency":
        setAmount(ed.value);
        setConvertCurrency(false);
        return;
    }
  };

  /**-----------------------------JSX--------------------------------------- */
  return (
    <>
      <div className="home-wrapper">
        <div>
          <h1>Source Currency</h1>
          <Converter
            currencyOptions={currencyOptions}
            selectCurrency={toConvertCurrency}
            onChangeCurrency={onCurrencyChangeHandler}
            type="toConvertCurrency"
            amount={firstAmount}
            onChangeAmount={onChangeAmountHandler}
          />
          <h1 className="equals">Target Currency</h1>
          <Converter
            currencyOptions={currencyOptions}
            selectCurrency={convertedCurrency}
            onChangeCurrency={onCurrencyChangeHandler}
            type="convertedCurrency"
            amount={secondAmount}
            onChangeAmount={onChangeAmountHandler}
          />
        </div>
      </div>
    </>
  );
};

export default CurrencyConverter;

import React from "react";
import { Input, Select } from "semantic-ui-react";

import "./Convereter.css";

const Converter = (props) => {
  const {
    currencyOptions,
    selectCurrency,
    onChangeCurrency,
    type,
    amount,
    onChangeAmount,
  } = props;

  return (
    <div className="input-wrapper">
      <Input
        type="number"
        value={amount}
        onChange={(e, ed) => onChangeAmount(e, ed, type)}
      />
      <Select
        className="select-box"
        options={currencyOptions}
        value={selectCurrency}
        search
        onChange={(e, ed) => onChangeCurrency(e, ed, type)}
        disabled={type === "toConvertCurrency"}
      />
    </div>
  );
};

export default Converter;

import React, { useState } from "react";
import { Input, Button } from "antd";
import "./App.css";

function Form(props) {
  const [inputValue, setInputValue] = useState("");

  const changeValue = (e) => {
    setInputValue(e.target.value);
  };

  const handleClick = (e) => {
    e.preventDefault();

    props.addValue(inputValue);
  };

  return (
    <form onSubmit={(e) => handleClick(e)} className="input-search">
      <Input
        placeholder="input todos"
        onChange={(e) => changeValue(e)}
        size="middle"
      />
      <Button type="primary" htmlType="submit">
        Add
      </Button>
    </form>
  );
}

export default Form;

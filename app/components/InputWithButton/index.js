import React, { useEffect } from "react";

const InputWithButton = (props) => {
  const onClickPlus = () => {
    props.onChange(props.value + 1);
  };

  const onClickMinus = () => {
    if (props.value === 1) props.onChange(1);
    else props.onChange(props.value - 1);
  };
  const onChange = (value) => {
    props.onChange(value);
  };
  useEffect(() => {
    if (Number(props.value) < 1) props.onChange(1);
  }, [props.value]);
  return (
    <div className="multiple">
      <button
        type="button"
        className="minus_button"
        onClick={() => {
          onClickMinus();
        }}
      >
        -
      </button>
      <input
        className="input"
        type="number"
        onChange={(e) => {
          onChange(e.target.value);
        }}
        value={props.value}
      />
      <button
        type="button"
        className="plus_button"
        onClick={() => {
          onClickPlus();
        }}
      >
        +
      </button>
    </div>
  );
};

export default InputWithButton;

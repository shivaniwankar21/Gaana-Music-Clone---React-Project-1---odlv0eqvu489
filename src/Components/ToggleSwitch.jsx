//done
import React, { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import actions from "../action";

const ToggleSwitch = () => {
  const dispatch = useDispatch();
  const checkbox = useRef();
  const darkMode = useSelector((state) => state.users.darkMode);

  const handleDarkMode = () => {
    dispatch(actions.toggledarkmode(!darkMode));
  };

  return (
    <div className="toggler">
      <label className="switch">
        <input
          type="checkbox"
          checked={darkMode}
          onChange={handleDarkMode}
          ref={checkbox}
        />
        <span className="slider round"></span>
      </label>
    </div>
  );
};

export default ToggleSwitch;

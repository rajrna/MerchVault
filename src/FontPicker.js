import React, { useState } from "react";

const FontPicker = ({ onChange }) => {
  const fonts = ["Roboto", "Open Sans", "Lato", "Montserrat", "Poppins"];

  return (
    <label>
      <span>Font Style:</span>
      <select onChange={(e) => onChange(e.target.value)}>
        {fonts.map((font) => (
          <option key={font} value={font}>
            {font}
          </option>
        ))}
      </select>
    </label>
  );
};

export default FontPicker;

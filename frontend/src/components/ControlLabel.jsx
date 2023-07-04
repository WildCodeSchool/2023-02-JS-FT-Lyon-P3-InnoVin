import React from "react";
import { FormControlLabel, Checkbox } from "@mui/material";
import PropTypes from "prop-types";

export default function ControlLabel({ value, label, onChange }) {
  return (
    <FormControlLabel
      value={value}
      onChange={onChange}
      control={
        <Checkbox
          sx={{ "& .MuiSvgIcon-root": { fontSize: 50 } }}
          style={{
            color: "#FFFDCC",
          }}
        />
      }
      label={label}
    />
  );
}
ControlLabel.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

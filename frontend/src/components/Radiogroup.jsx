import * as React from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import PropTypes from "prop-types";

export default function Radiogroup({ value, onChange }) {
  return (
    <FormControl>
      <FormLabel id="demo-controlled-radio-buttons-group">
        Choisissez votre vin
      </FormLabel>
      <RadioGroup name="buttons" value={value} onChange={onChange}>
        <FormControlLabel value="rouge" control={<Radio />} label="rouge" />
        <FormControlLabel value="rosé" control={<Radio />} label="Rosé" />
      </RadioGroup>
    </FormControl>
  );
}
Radiogroup.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

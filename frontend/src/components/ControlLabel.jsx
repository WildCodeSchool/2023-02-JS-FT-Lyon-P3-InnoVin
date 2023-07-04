import React from "react";
import { FormControlLabel, Checkbox } from "@mui/material";
import PropTypes from "prop-types";
import styles from "./ControlLabel.module.css";

export default function ControlLabel({ value, label, onChange }) {
  return (
    <div className={styles.fontSizeLabel}>
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
        label={<span className={styles.fontSizeLabel}>{label}</span>}
        labelPlacement="end"
      />
    </div>
  );
}
ControlLabel.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

import { TextField } from "@mui/material";
import { useState } from "react";

const inputStyle = {
  textField: {
    height: 40,
    minWidth: 150,
    "& input": {
      height: 30,
      color: "#222",
      fontSize: "18px",
      fontWeight: 600,
      fontFamily: "PoiterOne",
      background: "#FFFFFF",
      border: "none",
      padding: "5px 16px",
      borderRadius: "5px",
      "&::placeholder": {
        opacity: 0.6,
      },
    },
    "& fieldset": {
      height: 40,
      top: 0,
      borderRadius: "5px",
      border: "1px solid #7C8993",
      "& legend": {
        display: "none",
      },
      "&:hover": {
        borderColor: "#2F476A !important",
      },
    },
    "& .Mui-focused fieldset": {
      borderColor: "#2F476A !important",
      borderWidth: "1px !important",
    },
    "& .Mui-error fieldset": {
      borderColor: "#FD5B5B !important",
    },
  },
};

export default function CustomInput({
  onChangeValue,
  style,
  placeholder,
  required = false,
}) {
  const [error, setError] = useState(false);

  const verifyValue = (value) => {
    if (required && value.trim() === "") {
      setError(true);
    } else if (error) {
      setError(false);
    }
  };

  return (
    <TextField
      error={error}
      autoComplete="off"
      placeholder={placeholder}
      onBlur={(e) => verifyValue(e.target.value)}
      onChange={(e) => onChangeValue(e.target.value)}
      sx={[inputStyle.textField, style ?? null]}
    />
  );
}

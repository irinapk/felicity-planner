import { TextField } from "@mui/material";
import { useState } from "react";

const inputStyle = {
  textField: {
    minHeight: 40,
    minWidth: 150,
    "& .MuiInputBase-root": {
      minHeight: 30,
      padding: "0px !important",
      background: "#FFFFFF",
    },
    "& input": {
      minHeight: 30,
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
    "& textarea:first-of-type": {
      minHeight: 30,
      height: "110px !important",
      color: "#222",
      fontSize: "18px",
      fontWeight: 600,
      fontFamily: "PoiterOne",
      background: "#FFFFFF",
      padding: "5px 16px",
      border: "none",
      borderRadius: "5px",
      "&::placeholder": {
        opacity: 0.6,
      },
    },
    "& fieldset": {
      minHeight: 40,
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

export default function CustomInput(props) {
  const {
    onChangeValue,
    style,
    placeholder,
    required = false,
    multiline = false,
    minRows,
    maxRows,
  } = props;
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
      minRows
      maxRows
      multiline={multiline}
      error={error}
      autoComplete="off"
      placeholder={placeholder}
      onBlur={(e) => verifyValue(e.target.value)}
      onChange={(e) => onChangeValue(e.target.value)}
      sx={[inputStyle.textField, style ?? null]}
    />
  );
}

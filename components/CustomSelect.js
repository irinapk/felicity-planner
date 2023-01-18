import { FormControl, MenuItem, Select } from "@mui/material";
import { useState } from "react";
import { ArrowIcon } from "./Icons";

const selectStyle = {
  selectField: {
    height: 40,
    minWidth: 150,
    "& .MuiSelect-nativeInput": { display: "none" },
    "& .MuiSelect-select": {
      height: 30,
      color: "#222",
      fontSize: "16px",
      fontWeight: 500,
      fontFamily: "MontserratAlt",
      lineHeight: "30px",
      background: "#FFFFFF",
      border: "none",
      padding: "5px 16px",
      borderRadius: "5px",
      "& span": {
        filter: "opacity(0.6)",
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
    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: "#2F476A !important",
      borderWidth: "1px !important",
    },
    "&.Mui-error .MuiOutlinedInput-notchedOutline": {
      borderColor: "#FD5B5B !important",
    },
    "& > svg": {
      position: "absolute",
      right: "20px",
    },
  },
  menuPaper: {
    "& .MuiPaper-root": {
      background: "#FFFFFF",
      border: "1px solid #7C8993",
      borderRadius: "5px",
      marginTop: "2px",
      boxShadow: "none",
      "& .MuiMenuItem-root": {
        fontFamily: "MontserratAlt",
        fontSize: "16px",
        "&.Mui-selected": {
          backgroundColor: "#FFF",
          fontWeight: 600,
        },
        "&:hover": {
          color: "#E5A7A7",
          backgroundColor: "#FFF",
        },
      },
    },
  },
};

export default function CustomSelect(props) {
  const {
    onSelectValue,
    style,
    value,
    items,
    placeholder,
    multiple = false,
    required = false,
  } = props;

  const [error, setError] = useState(false);

  const verifyValue = (v) => {
    console.log("vefifying", v, value);
    if (
      required &&
      (v === null || v === undefined || v?.length === 0) &&
      (value === null || value === undefined || value?.length === 0)
    ) {
      setError(true);
    } else if (error) {
      setError(false);
    }
  };

  return (
    <FormControl error={error}>
      <Select
        value={value}
        multiple={multiple}
        renderValue={
          value !== null && value !== undefined
            ? undefined
            : () => <span>{placeholder ?? "select"}</span>
        }
        displayEmpty
        IconComponent={() => {
          return <ArrowIcon />;
        }}
        onChange={(e) => onSelectValue(e.target.value)}
        onClose={(e) => verifyValue(e.target.value)}
        sx={[selectStyle.selectField, style ?? null]}
        MenuProps={{ sx: selectStyle.menuPaper }}
      >
        {!required && (
          <MenuItem key="no-value" value={null}>
            none
          </MenuItem>
        )}
        {items &&
          items.length > 0 &&
          items.map((item) => (
            <MenuItem key={item.name} value={item.value}>
              {item.name}
            </MenuItem>
          ))}
      </Select>
    </FormControl>
  );
}
